import { Virtuoso } from "react-virtuoso";
import { ListResponse } from "../../app/baseApi";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import React from "react";

interface Prop<T> {
  dataList?: ListResponse<T>;
  render: (item: T, index: number) => JSX.Element;
  nextPage: () => void;
  isLoading: boolean;
}

const EndlessList = <T,>({ dataList, render, nextPage, isLoading }: Prop<T>) => {
  const navigate = useNavigate();
  const location = useLocation();

  const visibleRangeChanged = (endIndex: number) => {
    if (dataList) {
      const currentPage = Math.floor(endIndex / dataList.pageSize) + "";
      const searchParams = new URLSearchParams(location.search);
      const pageFromUrl = searchParams.get("page");
      if (currentPage !== pageFromUrl) {
        searchParams.set("page", currentPage + "");
        navigate(location.pathname + "?" + searchParams.toString(), { replace: false });
      }
    }
  };

  const loadMore = React.useCallback(() => {
    if (isLoading || !dataList?.hasMorePages) {
      return;
    }
    return setTimeout(() => {
      nextPage();
    }, 500);
  }, [isLoading, dataList?.hasMorePages, nextPage]);

  const footer = () => (
    <>
      {dataList?.hasMorePages && (
        <Box sx={{ display: "flex", width: "100%", justifyContent: "center", padding: "10px" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );

  if (!dataList) {
    return <></>;
  }

  return (
    <Virtuoso
      useWindowScroll
      data={dataList.items}
      endReached={loadMore}
      rangeChanged={({ endIndex }) => {
        visibleRangeChanged(endIndex);
      }}
      increaseViewportBy={200}
      itemContent={(index, item: T) => render(item, index)}
      components={{ Footer: footer }}
    />
  );
};

export default EndlessList;
