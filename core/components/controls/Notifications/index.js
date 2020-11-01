import { useSelector } from "react-redux";
import { withRouter } from "next/router";
import React, { useState, useEffect } from "react";
import throttle from "lodash.throttle";

import { API } from "../../../../constants/router/defaults";
import { NotificationsOptions } from "./components/NotificationsOptions";
import { NotificationsWrapper } from "./components/NotificationsWrapper";
import { getContentGroupName } from "./utils";
import { makeFroth } from "../../../../utils/froth";
import { withRedux } from "../../../../utils/with-redux";
import ga from "../../../../utils/data/ga";
import puppy from "../../../../utils/puppy";

const Notifications = ({ router }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("pending");
  const [messageDismissed, setMessageDismissed] = useState(false);

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

  // apply targeting & parse content
  const [selectedMessage, selectMessage] = useState({});
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
            if (message.target?.contentGroups)
              match =
                message.target.contentGroups?.indexOf(
                  getContentGroupName(router.asPath)
                ) > -1;
            if (message.target?.user?.status !== userStatus) match = false;
            return match;
          })(),
        },
      };
    });
    if (computedTargeting.length) {
      selectMessage({
        ...computedTargeting[0],
        targetMatch: computedTargeting[0].target?.match,
        prevTargetMatch: selectedMessage.targetMatch || false,
      });
    }
  }, [router.asPath, userStatus, messages]);

  // change notification size based on scroll position
  const [isMini, setNotificationSizeMini] = useState(true);
  const windowScrollHandlerNotifications = throttle(() => {
    if (window.scrollY > 180) return setNotificationSizeMini(false);
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
    setMessageDismissed(true);
  };

  return (
    <NotificationsWrapper
      isMini={isMini}
      targetMatch={selectedMessage.targetMatch}
      prevTargetMatch={selectedMessage.prevTargetMatch}
      messageDismissed={messageDismissed}
      onClick={handleMesscageClick}
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
                    setMessageDismissed(true);
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
