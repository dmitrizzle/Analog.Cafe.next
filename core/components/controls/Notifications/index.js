import { useSelector } from "react-redux";
import { withRouter } from "next/router";
import React, { useState, useEffect } from "react";
import lscache from "lscache";
import styled, { css } from "styled-components";
import throttle from "lodash.throttle";

import { API } from "../../../../constants/router/defaults";
import { NotificationsWrapper } from "./components/NotificationsWrapper";
import {
  b_mobile,
  m_radius_sm,
} from "../../../../constants/styles/measurements";
import { c_charcoal } from "../../../../constants/styles/themes";
import {
  fadeIn,
  notificationDismiss,
  notificationShow,
} from "../../../../constants/styles/animation";
import { getContentGroupName } from "./utils";
import { makeFroth } from "../../../../utils/froth";
import { title } from "../../../../constants/styles/typography";
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
  const [targetedMessages, setTargetedMessages] = useState([]);
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
    setTargetedMessages(computedTargeting);
    if (computedTargeting.length) {
      const t = computedTargeting[0];
      selectMessage({
        title: t.title,
        description: t.description,
        link: t.link,
        poster: t.poster,
        targetMatch: t.target?.match,
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

  return (
    <NotificationsWrapper
      isMini={isMini}
      targetMatch={selectedMessage.targetMatch}
      prevTargetMatch={selectedMessage.prevTargetMatch}
      messageDismissed={messageDismissed}
      onClick={() => {
        ga("event", {
          category: selectedMessage.link.indexOf("http") === 0 ? "out" : "nav",
          action: "message.click",
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
      }}
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
      </div>
    </NotificationsWrapper>
  );
};

export default withRedux(withRouter(Notifications));
