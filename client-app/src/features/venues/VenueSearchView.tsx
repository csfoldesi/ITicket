import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { VenueSearchDto } from "../../app/models/venueModels";
import { SubmitHandler, useForm } from "react-hook-form";
import { VenuesQuery } from "./venuesApi";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  setQuery: React.Dispatch<React.SetStateAction<VenuesQuery>>;
  adminMode?: boolean;
}

const VenueSearchView = ({ children, setQuery, adminMode }: Props) => {
  const { register, handleSubmit } = useForm<VenueSearchDto>();

  const onSubmit: SubmitHandler<VenueSearchDto> = (data, event) => {
    event?.preventDefault();
    setQuery(() => {
      return { pageNumber: 0, name: data.name, isOwnedOnly: adminMode };
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Venues" {...register("name")} />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      {children}
    </Paper>
  );
};

export default VenueSearchView;
