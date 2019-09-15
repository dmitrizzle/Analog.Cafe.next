import { API } from "../../constants/router/defaults";
import puppy from "../puppy";

export default (event, props) => {
  event.preventDefault();

  // error message pop up
  const errorMessage = {
    status: "ok",
    info: {
      title: "Error",
      text: `Could not reject the submission.`,
    },
    id: "error/rejection",
  };

  // reject action
  const reject = id => {
    const request = {
      url: `${API.SUBMISSIONS}/${id}/reject`,
      method: "post",
      headers: {
        Authorization: "JWT " + localStorage.getItem("token"),
      },
    };
    puppy(request)
      .then(r => {
        // reject and show error message if response status isn't success
        if (r.status !== 200) {
          r.reject();
          return props.setModal(errorMessage);
        }
        return r.json();
      })
      .then(() => {
        return props.setModal({
          status: "ok",
          info: {
            title: "Rejected.",
          },
          id: "notification/rejection-success",
        });
      })
      .catch(() => props.setModal(errorMessage));
  };

  props.setModal({
    status: "ok",
    info: {
      title: "Reject?",
      text:
        "Please confirm that you want to reject this submission. You can not undo this action. Author will get email notification.",
      buttons: [
        {
          to: "#confirm-reject",
          onClick: event => {
            event.preventDefault();
            reject(props.article.id);
          },
          text: "Confirm REJECT",
          branded: true,
        },
        {
          to: "#cancel",
          onClick: event => {
            event.preventDefault();
          },
          text: "Cancel",
        },
      ],
    },
  });
};
