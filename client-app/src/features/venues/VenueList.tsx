import { useCreateVenueMutation, venuesApi, VenuesQuery } from "./venuesApi";
import VenueListItem from "./VenueListItem";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EndlessList from "../core/EndlessList";
import { Venue, VenueModel, VenueSearchDto } from "../../app/models/venueModels";
import { Button, Container, Dialog, DialogContent, DialogTitle, IconButton, InputBase, Paper } from "@mui/material";
import CreateEditVenueForm from "./forms/CreateEditVenueForm";
import { useNavigate } from "react-router-dom";
import Error from "../core/Error";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  adminMode?: boolean;
}

const VenueList = ({ adminMode }: Props) => {
  const [queryParams, setQueryParams] = React.useState<VenuesQuery>({
    pageNumber: 0,
    name: "",
    isOwnedOnly: adminMode,
  });
  const { data: venueList, error, isLoading } = venuesApi.useGetVenuesListQuery(queryParams);
  const [createVenue] = useCreateVenueMutation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<VenueSearchDto>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (venue: VenueModel) => {
    var newVenue = await createVenue(Venue.VenueModel_CreateVenueModel(venue));
    handleClose();
    if (newVenue && newVenue.data && newVenue.data.id) {
      navigate(`/venues/${newVenue.data?.id}`);
    }
  };

  const searchSubmit: SubmitHandler<VenueSearchDto> = (data, event) => {
    event?.preventDefault();
    setQueryParams(() => {
      return { pageNumber: 0, name: data.name, isOwnedOnly: adminMode };
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
      <h1>Venues</h1>
      <Paper
        component="form"
        onSubmit={handleSubmit(searchSubmit)}
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Venues" {...register("name")} />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        {adminMode && (
          <Button variant="contained" onClick={handleOpen} startIcon={<AddIcon />}>
            New Venue
          </Button>
        )}
      </Paper>
      <EndlessList
        dataList={venueList}
        nextPage={nextPage}
        isLoading={isLoading}
        render={(venue, index) => <VenueListItem venue={venue} key={venue.id} />}
      />
      <Dialog open={open} onClose={handleClose} maxWidth={"lg"} fullWidth>
        <DialogTitle>Create new venue</DialogTitle>
        <DialogContent>
          <CreateEditVenueForm onSubmit={onSubmit} onCancel={handleClose} venue={Venue.VenueModel()} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default VenueList;
