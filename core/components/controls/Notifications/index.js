import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import throttle from "lodash.throttle";

import { API } from "../../../../constants/router/defaults";
import { CARD_ALERTS } from "../../../../constants/messages/system";
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
    // some messages can not be dismissed
    if (selectedMessage.attributes?.presist) return;

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
    process.browser
      ? (parseInt(sessionStorage.getItem("pageviews")) || 0) + 1
      : 0
  );
  const [bufferMet, setBufferMet] = useState(false);
  useEffect(() => {
    setPageviews(pageviews + 1);
    sessionStorage.setItem("pageviews", pageviews);
    if (pageviews < 1) return;
    if (bufferMet) return;
    setBufferMet(true);
  }, [router.asPath]);

  // apply targeting & parse content
  const [selectedMessage, selectMessage] = useState({});
  const user = useSelector(state => state.user);
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
            if (message.target?.user?.status?.indexOf(user.status) === -1)
              match = false;
            return match;
          })(),
        },
      };
    });

    // buffer messages until SECOND PAGEVIEW
    if (computedTargeting.length && pageviews > 1) {
      const targetedMessages = computedTargeting.filter(message => {
        return message.target.match;
      });
      if (!targetedMessages[0])
        return selectMessage({
          targetMatch: false,
          prevTargetMatch: selectedMessage.targetMatch || false,
        });
      selectMessage({
        ...targetedMessages[0],
        targetMatch: targetedMessages[0].target?.match,
        prevTargetMatch: selectedMessage.targetMatch || false,
      });
    }
  }, [router.asPath, user.status, messages]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      addSessionInfo({
        message: {
          active: selectedMessage.targetMatch && !messagesDismissed,
        },
      })
    );
  }, [selectedMessage.targetMatch, messagesDismissed]);

  // change notification size based on scroll position
  const [isNotificationTypeButton, setNotificationTypeButton] = useState(true);
  const windowScrollHandlerNotifications = throttle(() => {
    if (document.documentElement.scrollTop <= 180)
      return setNotificationTypeButton(true);
    return setNotificationTypeButton(false);
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

  const notificationOptionsRef = useRef(null);
  const handleMesscageClick = ({ inModal, event }) => {
    event?.preventDefault();

    ga("event", {
      category: selectedMessage.link.indexOf("http") === 0 ? "out" : "nav",
      action: `message.${inModal ? "modal." : ""}click`,
      label: selectedMessage.link,
    });

    // messages that open their content in modal view instead of link route
    if (selectedMessage.attributes?.defaultToModal)
      return notificationOptionsRef.current.click();

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

  const modalComponent = (() => {
    const componentName = selectedMessage.attributes?.modalComponent;
    if (!componentName) return false;
    if (!CARD_ALERTS[componentName]) return false;

    const component = CARD_ALERTS[componentName]();
    return {
      ...component,
      info: {
        ...component.info,
        image: selectedMessage.poster,
        title: selectedMessage.title,
      },
    };
  })();

  return (
    <NotificationsWrapper
      isNotificationTypeButton={isNotificationTypeButton}
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
          {isNotificationTypeButton ? " " : <br />}
          <span>{selectedMessage.description}</span>
        </div>
        <NotificationsOptions
          innerRef={notificationOptionsRef}
          unmarked
          element="a"
          onClick={() => {
            ga("event", {
              category: "nav",
              action: `message.details`,
              label: selectedMessage.link,
            });
          }}
          with={
            modalComponent || {
              info: {
                image: selectedMessage.poster,
                title: selectedMessage.title,
                text: selectedMessage.descriptionLong,
                buttons: [
                  {
                    text: "Close for Now",
                    to: "#close",
                    onClick: event => {
                      event.preventDefault();
                      handMesssagesDismissed();
                    },
                  },
                  {
                    branded: true,
                    text: selectedMessage.buttonText || "Visit",
                    to: selectedMessage.link,
                    onClick: event =>
                      handleMesscageClick({ inModal: true, event }),
                  },
                ],
              },
              id: "notification/options",
            }
          }
        >
          {selectedMessage.attributes?.defaultToModal ? "" : "…"}
        </NotificationsOptions>
      </div>
    </NotificationsWrapper>
  );
};

export default withRedux(withRouter(Notifications));
