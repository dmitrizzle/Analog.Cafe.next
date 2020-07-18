const ls =
  typeof localStorage !== "undefined"
    ? localStorage
    : {
        getItem: () => null,
        setItem: () => null,
        removeItem: () => null,
      };

export default ls;
