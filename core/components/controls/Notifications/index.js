import { withRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import throttle from "lodash.throttle";

import { API } from "../../../../constants/router/defaults";
import { c_charcoal } from "../../../../constants/styles/themes";
import {
  fadeIn,
  notificationDismiss,
  notificationShow,
} from "../../../../constants/styles/animation";
import { m_radius_sm } from "../../../../constants/styles/measurements";
import { makeFroth } from "../../../../utils/froth";
import { title } from "../../../../constants/styles/typography";
import ga from "../../../../utils/data/ga";
import puppy from "../../../../utils/puppy";

const NotificationsWrapper = styled.aside`
  display: block;
  position: fixed;
  z-index: 31;
  width: 100%;
  top: 0;
  left: 0;
  padding: ${({ isMini }) => (isMini ? 0 : 0.25)}em 0 0;
  cursor: pointer;
  transform: scale(0, 0);
  animation: ${({ hasMessage, messageDismissed }) => {
      if (hasMessage && !messageDismissed) return notificationShow;
      if (hasMessage && messageDismissed) return notificationDismiss;
      return "none";
    }}
    500ms ease forwards;

  > div {
    display: flex;
    align-items: center;
    justify-content: start;
    margin: 0 auto;

    background: ${({ theme }) => theme.brand};
    border-radius: ${m_radius_sm};
    justify-content: center;

    ${({ isMini }) => {
      if (isMini)
        return css`
          height: 1.33em;
          border-radius: 0;
          max-width: 100%;
          box-shadow: 0 0 0 0 ${c_charcoal};
        `;
      return css`
        height: 2.75em;
        border-radius: ${m_radius_sm};
        max-width: 17.75em;
        box-shadow: 0 0 0 1px ${c_charcoal};
      `;
    }}
    transition: all 250ms;

    > div {
      opacity: 0;
      animation: ${fadeIn} 500ms 500ms ease forwards;

      color: ${({ theme }) => theme.bg};
      ${title};
      font-size: 0.8em;
      text-align: left;
      margin: 0 ${({ isMini }) => (isMini ? 0 : 0.5)}em;
    }
    > figure {
      ${({ isMini }) => {
        if (isMini)
          return css`
            width: 0;
            height: 0;
            margin: 0;
          `;
        return css`
          width: 2em;
          height: 2em;
          margin: 0em 0 0 0.35em;
        `;
      }}
      transition: all 150ms;

      overflow: hidden;
      border-radius: ${m_radius_sm};

      img {
        width: 100%;
      }
    }
  }
`;

const Notifications = ({ router }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("pending");
  const [messageDismissed, setMessageDismissed] = useState(false);
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

  let title, description, link, poster;
  if (messages[0]) {
    title = messages[0].title;
    description = messages[0].description;
    link = messages[0].link;
    poster = messages[0].poster;
  }

  // change notification size based on scroll position
  const [isMini, setNotificationSizeMini] = useState(true);
  const windowScrollHandlerNotifications = () => {
    if (window.scrollY > 10) return setNotificationSizeMini(false);
    return setNotificationSizeMini(true);
  };

  useEffect(() => {
    window.addEventListener(
      "scroll",
      throttle(windowScrollHandlerNotifications, 100),
      true
    );
    return () => {
      window.removeEventListener(
        "scroll",
        throttle(windowScrollHandlerNotifications, 100),
        true
      );
    };
  }, []);

  return (
    <>
      <NotificationsWrapper
        isMini={isMini}
        hasMessage={title}
        sticky={false}
        messageDismissed={messageDismissed}
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
            window.scrollTo && window.scrollTo({ top: 0, behaviour: "smooth" });
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
            <u>{title}</u> <span>{description}</span>
          </div>
        </div>
      </NotificationsWrapper>
    </>
  );
};

export default withRouter(Notifications);
