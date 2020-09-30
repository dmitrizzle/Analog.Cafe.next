import styled from "styled-components";

const NotificationsWrapper = styled.div`
  background: ${({ theme }) => theme.brand};
  color: ${({ theme }) => theme.bg};
  padding: 0.5em 1em;
  width: calc(100vw - 2em);
  display: block;
  text-align: center;
  line-height: 1.25em;
  overflow: hidden;
  transition: all 250ms;
  /*! transform: scale(1,0.01); */
  /*! transform: scale(0.0025,0.01); */
  /*! transform: scale(0,0); */
  /*! height: 0; */
  /*! padding: 0; */
  height: 1.25em;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Notifications = props => (
  <NotificationsWrapper>
    <em>
      Now shipping: <b>Monochrome zine!</b>
    </em>
  </NotificationsWrapper>
);

export default Notifications;
