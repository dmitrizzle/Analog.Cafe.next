export default (event, props) => {
  event.preventDefault();

  // error message pop up
  const errorMessage = {
    status: "ok",
    info: {
      title: "Error",
      text: `Could not archive the article.`,
    },
    id: "error/archive",
  };
};
