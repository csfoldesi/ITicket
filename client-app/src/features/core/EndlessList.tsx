import React from "react";

const EndlessList = <T,>() => {
  const [page, setPage] = React.useState(0);
  const [items, setItems] = React.useState<T[]>(() => []);

  return <></>;
};

export default EndlessList;
