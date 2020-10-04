import { withRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { API } from "../../../../constants/router/defaults";
import { c_charcoal, c_white } from "../../../../constants/styles/themes";
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
  width: calc(100% - 0.5em);
  top: 0;
  left: 0;
  padding: 0.25em;
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

    height: 0.9em;
    height: 2.5em;
    transition: height 250ms;
    opacity: 0;
    animation: ${fadeIn} 500ms 500ms ease forwards;

    max-width: 22em;
    margin: 0 auto;

    background: ${({ theme }) => theme.brand};
    box-shadow: 0 0 0 1px ${c_charcoal};
    border-radius: ${m_radius_sm};
    justify-content: center;

    > div {
      color: ${c_white};
      ${title};
      font-size: 0.8em;
      text-align: left;
      margin: 0 0.5em;
    }
    > figure {
      width: 2em;
      height: 2em;
      overflow: hidden;
      border-radius: ${m_radius_sm};
      margin: 0em 0 0 0.5em;
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

  return (
    <>
      <NotificationsWrapper
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
