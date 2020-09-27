import React from "react";

import { CONTACT_EMAIL } from "../../../../constants/messages/system";
import ga from "../../../../utils/data/ga";
import Modal from "../../controls/Modal";

const Index = ({ address, element, branded, children }) => {
  const email = address || CONTACT_EMAIL;
  return (
    <Modal
      element={element || "a"}
      branded={branded}
      with={{
        info: {
          title: "Email",
          text: (
            <>
              The button below should open your email client. If that doesn’t
              work, this is the address: {email}
            </>
          ),
          buttons: [
            {
              to: `mailto:${email}`,
              text: email,
              onClick: () =>
                ga("event", {
                  category: "nav",
                  action: "email",
                }),
            },
          ],
        },
        id: "help/vitessa-l",
      }}
    >
      {children || "email"}
    </Modal>
  );
};

export default Index;
