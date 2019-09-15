import { API } from "../../constants/router/defaults";
import puppy from "../puppy";

export default (event, props) => {
  event.preventDefault();

  // error message pop up
  const errorMessage = {
    status: "ok",
    info: {
      title: "Error",
      text: `Could not unpublish the article.`,
    },
    id: "hints/unpublish-error",
  };

  // unpublish action
  const unpublish = id => {
    const request = {
      url: `${API.ARTICLES}/${id}`,
      method: "delete",
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
            title: "Unpublished!",
          },
          id: "hints/unpublish-success",
        });
      })
      .catch(() => props.setModal(errorMessage));
  };

  props.setModal({
    status: "ok",
    info: {
      title: "Remove Article From Publication?",
      text:
        "Please confirm that you want to remove this article from publication:",
      buttons: [
        {
          to: "#confirm-unpublish",
          onClick: event => {
            event.preventDefault();
            unpublish(props.article.id);
          },
          text: "Confirm Unpublish",
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
