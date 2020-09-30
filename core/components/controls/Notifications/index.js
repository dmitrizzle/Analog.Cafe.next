import { withRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { API } from "../../../../constants/router/defaults";
import {
  notificationDismiss,
  notificationShow,
} from "../../../../constants/styles/animation";
import { title } from "../../../../constants/styles/typography";
import ga from "../../../../utils/data/ga";
import puppy from "../../../../utils/puppy";

const NotificationsWrapper = styled.aside`
  display: block;
  position: fixed;
  z-index: 30;

  width: 100%;

  top: 0;
  left: 0;
  padding: 0.7em 0;

  overflow: hidden;
  text-align: center;

  background: ${({ theme }) => theme.brand};
  color: ${({ theme }) => theme.bg};
  line-height: 0em;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;

  > span {
    ${title};
    font-size: 0.8em;
    line-height: 0em;
  }

  transform: scale(0, 0);
  animation: ${({ hasMessage, messageDismissed }) => {
      if (hasMessage && !messageDismissed) return notificationShow;
      if (hasMessage && messageDismissed) return notificationDismiss;
      return "none";
    }}
    500ms ease forwards;
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

  let title, description, link;
  if (messages[0]) {
    title = messages[0].title;
    description = messages[0].description;
    link = messages[0].link;
  }

  return (
    <>
      <NotificationsWrapper
        hasMessage={title}
        sticky={false}
        messageDismissed={messageDismissed}
        onClick={() => {
          ga("event", {
            category: "nav",
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
        <span>
          <u>{title}</u> <span>{description}</span>
        </span>
      </NotificationsWrapper>
    </>
  );
};

export default withRouter(Notifications);
