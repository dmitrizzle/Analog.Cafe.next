import lscache from "lscache";

import { API } from "../../constants/router/defaults";
import puppy from "../puppy";

const archive = props => {
  // error message pop up
  const errorMessage = {
    status: "ok",
    info: {
      title: "Error",
      text: `Could not archive the article.`,
    },
    id: "error/archive",
  };

  // archive action
  const archive = id => {
    const request = {
      url: `${API.SUBMISSIONS}/${id}`,
      method: "delete",
      headers: {
        Authorization: "JWT " + lscache.get("token"),
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
            title: "Archived!",
          },
          id: "notification/archive-success",
        });
      })
      .catch(() => props.setModal(errorMessage));
  };

  props.setModal({
    status: "ok",
    info: {
      title: "Archive?",
      text: "Please confirm that you want to archive this submission. You can not undo this action without admin access.",
      buttons: [
        {
          to: "#confirm-archive",
          onClick: event => {
            event.preventDefault();
            archive(props.article.id);
          },
          text: "Confirm Archive",
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
export default archive;
