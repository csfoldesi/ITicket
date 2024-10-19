import React from "react";
import { Container, FormControl, IconButton, InputLabel, Paper, TextField } from "@mui/material";
import { eventsApi, EventsQuery } from "./eventsApi";
import EventListItem from "./EventListItem";
import EndlessList from "../core/EndlessList";
import Error from "../core/Error";
import { EventSearchDto } from "../../app/models/eventModels";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  adminMode?: boolean;
}

const EventList = ({ adminMode }: Props) => {
  const [queryParams, setQueryParams] = React.useState<EventsQuery>({ pageNumber: 0 });
  const { data: eventList, error, isLoading } = eventsApi.useGetEventsListQuery(queryParams);
  const { register, handleSubmit } = useForm<EventSearchDto>();

  const searchSubmit: SubmitHandler<EventSearchDto> = (data, event) => {
    event?.preventDefault();
    setQueryParams(() => {
      return { pageNumber: 0, title: data.title, dateFrom: data.from, dateTo: data.to };
    });
  };

  const nextPage = () => {
    setQueryParams((prev) => {
      return { ...prev, pageNumber: prev.pageNumber! + 1 };
    });
  };

  if (error) {
    return <Error error={error} />;
  }
  if (isLoading) return <p>Loading...</p>;

  return (
    <Container>
      <h1>Events</h1>
      <Paper
        component="form"
        onSubmit={handleSubmit(searchSubmit)}
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel shrink={true} id="title">
            Title
          </InputLabel>
          <TextField id="title" variant="standard" {...register("title")} />
        </FormControl>
        <FormControl>
          <InputLabel shrink={true} id="from-date">
            Start date
          </InputLabel>
          <TextField type="date" sx={{ ml: 1 }} id="from-date" variant="standard" {...register("from")} />
        </FormControl>
        <FormControl>
          <InputLabel shrink={true} id="to-date">
            End date
          </InputLabel>
          <TextField type="date" sx={{ ml: 1 }} id="to-date" variant="standard" {...register("to")} />
        </FormControl>
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <EndlessList
        dataList={eventList}
        nextPage={nextPage}
        isLoading={isLoading}
        render={(event, index) => <EventListItem event={event} key={event.id} />}
      />
    </Container>
  );
};

export default EventList;
