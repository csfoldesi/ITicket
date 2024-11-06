import { Link, Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink, useMatches } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const BreadcrumbsView = () => {
  const breadcrumbsTitles = useAppSelector((state) => state.breadcrumbs.items);
  const matches = Array.from(
    new Map(useMatches().map((route) => [route.pathname.replace(/\/+$/, ""), route])).values()
  );

  const crumbs = matches.map((match) => {
    if (match.handle) {
      const handle = match.handle as { crumb: string; id?: string };
      const pathParts = match.pathname.replace(/\/+$/, "").split("/");
      const id = pathParts.length > 0 ? pathParts[pathParts.length - 1] : "";
      const crumb = {
        path: match.pathname,
        title: handle.id ? breadcrumbsTitles[handle.id + "" + id] : handle.crumb,
        id: handle.id,
      };
      return crumb;
    }
    return { path: match.pathname };
  }) as { path: string; title?: string; id?: string }[];

  //console.log(breadcrumbsTitles);
  //console.log(crumbs);

  return (
    <Breadcrumbs aria-label="breadcrumb" color="inherit" sx={{ marginLeft: "1em" }}>
      {crumbs.map((crumb, index) =>
        index < crumbs.length - 1 ? (
          <Link component={NavLink} to={crumb.path} key={index} color="inherit" variant="subtitle2">
            {crumb.title}
          </Link>
        ) : (
          <Typography key={index} color="inherit" variant="subtitle2">
            {crumb.title}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

export default BreadcrumbsView;
