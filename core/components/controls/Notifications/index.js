import { withRouter } from "next/router";
import React, { useState, useEffect } from "react";
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

  // apply targeting
  const [targetedMessages, setTargetedMessages] = useState([]);
  useEffect(() => {
    setTargetedMessages(
      messages.map(message => {
        // not specifying target applies message to everything
        if (!message.target) return { ...message, target: { match: true } };

        // test targeting and mark messages with results
        return {
          ...message,
          target: {
            ...message.target,
            match:
              message.target.contentGroups?.indexOf(
                getContentGroupName(router.asPath)
              ) > -1,
          },
        };
      })
    );
  }, [router.asPath]);

  let title, description, link, poster, targetMatch;
  if (targetedMessages.length) {
    title = targetedMessages[0].title;
    description = targetedMessages[0].description;
    link = targetedMessages[0].link;
    poster = targetedMessages[0].poster;
    targetMatch = targetedMessages[0].target?.match;
  }

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
      hasMessage={title}
      messageDismissed={messageDismissed || !targetMatch}
      onClick={() => {
        ga("event", {
          category: link.indexOf("http") === 0 ? "out" : "nav",
          action: "message.click",
          label: link,
        });
        setTimeout(() => {
          if (link.indexOf("http") === 0) {
            const newTab = window.open(link, "_blank");
            newTab.focus();
            return;
          }
          window.scrollTo && window.scrollTo({ top: 0, behavior: "smooth" });
          router.push(link);
        }, 750);
        setMessageDismissed(true);
      }}
    >
      <div>
        <figure>
          <img src={makeFroth({ src: poster, size: "i", type: "jpg" }).src} />
        </figure>
        <div>
          <em>{title}</em>
          {isMini ? " " : <br />}
          <span>{description}</span>
        </div>
      </div>
    </NotificationsWrapper>
  );
};

export default withRouter(Notifications);
