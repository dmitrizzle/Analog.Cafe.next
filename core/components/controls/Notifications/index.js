import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import throttle from "lodash.throttle";

import { API } from "../../../../constants/router/defaults";
import { NotificationsOptions } from "./components/NotificationsOptions";
import { NotificationsWrapper } from "./components/NotificationsWrapper";
import { addSessionInfo } from "../../../../user/store/actions-user";
import { getContentGroupName } from "./utils";
import { makeFroth } from "../../../../utils/froth";
import { withRedux } from "../../../../utils/with-redux";
import ga from "../../../../utils/data/ga";
import puppy from "../../../../utils/puppy";

const Notifications = ({ router }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("pending");

  const [messagesDismissed, setMessagesDismissed] = useState(
    process.browser && sessionStorage.getItem("messages-dismissed") === "true"
  );

  // track dismissed messages and ensure there are no adverse artifacts
  const notificationsWrapperRef = useRef(null);
  const handMesssagesDismissed = (isDismissed = true) => {
    sessionStorage.setItem("messages-dismissed", isDismissed);
    setMessagesDismissed(isDismissed);
  };
  useEffect(() => {
    if (!process.browser) return;
    requestAnimationFrame(() => {
      if (!messagesDismissed)
        notificationsWrapperRef.current.style.display = "block";
    });
  });

  // fetch data
  useEffect(() => {
    if (status !== "pending") return;
    puppy({
      url: API.ADS,
      method: "get",
      params: {
        location: "notifications",
      },
    })
      .then(r => r.json())
      .then(response => {
        setMessages(response.items);
        setStatus("ok");
      })
      .catch(() => {
        setStatus("error");
      });
  }, [messages]);

  // buffer messages until SECOND PAGEVIEW
  const [pageviews, setPageviews] = useState(
    process.browser ? parseInt(sessionStorage.getItem("pageviews") || 0) : 0
  );
  const [bufferMet, setBufferMet] = useState(false);
  useEffect(() => {
    setPageviews(pageviews + 1);
    sessionStorage.setItem("pageviews", pageviews + 1);

    if (pageviews < 1) return;

    if (bufferMet) return;
    selectMessage(bufferedMessage);
    setBufferedMessage({});
    setBufferMet(true);
  }, [router.asPath]);

  // apply targeting & parse content
  const [selectedMessage, selectMessage] = useState({});
  const [bufferedMessage, setBufferedMessage] = useState({});
  const userStatus = useSelector(state => state.user).status;
  useEffect(() => {
    const computedTargeting = messages.map(message => {
      // not specifying target applies message to everything
      if (!message.target) return { ...message, target: { match: true } };

      // test targeting and mark messages with results
      return {
        ...message,
        target: {
          ...message.target,
          match: (() => {
            let match = true;

            // match target groups
            if (message.target?.contentGroups)
              match =
                message.target.contentGroups?.indexOf(
                  getContentGroupName(router.asPath)
                ) > -1;

            // match user status last
            if (message.target?.user?.status?.indexOf(userStatus) === -1)
              match = false;
            return match;
          })(),
        },
      };
    });

    if (computedTargeting.length) {
      const action = bufferMet ? selectMessage : setBufferedMessage;
      const targetedMessages = computedTargeting.filter(message => {
        return message.target.match;
      });
      if (!targetedMessages[0])
        return action({
          targetMatch: false,
          prevTargetMatch: selectedMessage.targetMatch || false,
        });
      action({
        ...targetedMessages[0],
        targetMatch: targetedMessages[0].target?.match,
        prevTargetMatch: selectedMessage.targetMatch || false,
      });
    }
  }, [router.asPath, userStatus, messages]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addSessionInfo({
        messageActive: selectedMessage.targetMatch && !messagesDismissed,
      })
    );
  }, [selectedMessage.targetMatch, messagesDismissed]);

  // change notification size based on scroll position
  const [isMini, setNotificationSizeMini] = useState(true);
  const windowScrollHandlerNotifications = throttle(() => {
    if (document.documentElement.scrollTop > 180)
      return setNotificationSizeMini(false);
    else return setNotificationSizeMini(true);
  }, 100);

  // scroll design transition
  useEffect(() => {
    window.addEventListener("scroll", windowScrollHandlerNotifications, true);
    return () => {
      window.removeEventListener(
        "scroll",
        windowScrollHandlerNotifications,
        true
      );
    };
  }, []);

  const handleMesscageClick = ({ inModal, event }) => {
    event?.preventDefault();
    ga("event", {
      category: selectedMessage.link.indexOf("http") === 0 ? "out" : "nav",
      action: `message.${inModal ? "modal." : ""}click`,
      label: selectedMessage.link,
    });
    setTimeout(() => {
      if (selectedMessage.link.indexOf("http") === 0) {
        const newTab = window.open(selectedMessage.link, "_blank");
        newTab.focus();
        return;
      }
      window.scrollTo && window.scrollTo({ top: 0, behavior: "smooth" });
      router.push(selectedMessage.link);
    }, 750);
    handMesssagesDismissed();
  };

  return (
    <NotificationsWrapper
      isMini={isMini}
      targetMatch={selectedMessage.targetMatch}
      prevTargetMatch={selectedMessage.prevTargetMatch}
      messagesDismissed={messagesDismissed}
      onClick={handleMesscageClick}
      style={{ display: "none" }}
      ref={notificationsWrapperRef}
    >
      <div>
        <figure>
          <img
            src={
              makeFroth({ src: selectedMessage.poster, size: "i", type: "jpg" })
                .src
            }
          />
        </figure>
        <div>
          <em>{selectedMessage.title}</em>
          {isMini ? " " : <br />}
          <span>{selectedMessage.description}</span>
        </div>
        <NotificationsOptions
          unmarked
          element="a"
          onClick={() => {
            ga("event", {
              category: "nav",
              action: `message.details`,
              label: selectedMessage.link,
            });
          }}
          with={{
            info: {
              image: selectedMessage.poster,
              title: selectedMessage.title,
              text: selectedMessage.descriptionLong,
              buttons: [
                {
                  branded: true,
                  text: selectedMessage.buttonText || "Visit",
                  to: selectedMessage.link,
                  onClick: event =>
                    handleMesscageClick({ inModal: true, event }),
                },
                {
                  text: "Close for Now",
                  to: "#close-message",
                  onClick: event => {
                    event.preventDefault();
                    handMesssagesDismissed();
                  },
                },
              ],
            },
            id: "notification/options",
          }}
        >
          …
        </NotificationsOptions>
      </div>
    </NotificationsWrapper>
  );
};

export default withRedux(withRouter(Notifications));
