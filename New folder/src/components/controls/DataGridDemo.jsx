import * as React from "react";
import { makeStyles } from "@mui/styles";
import Rating from "@mui/material/Rating";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import LineProgressBars from "./BorderLinearProgress";

function renderRating(params) {
  return (
    <LineProgressBars
      variant="determinate"
      value={20}
      height={20}
      backColor="#eeeeee"
      barcolor="green"
    />
  );
  // return <Rating readOnly value={params.value} />;
}

export default function RenderRatingEditCellGrid() {
  return (
    <div style={{ height: 250, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

const columns = [
  {
    field: "places",
    headerName: "Places",
    width: 120,
  },
  {
    field: "rating",
    headerName: "Rating",
    renderCell: renderRating,

    editable: false,
    width: 180,
    type: "number",
  },
];

const rows = [
  { id: 1, places: "Barcelona", rating: 5 },
  { id: 2, places: "Rio de Janeiro", rating: 4 },
  { id: 3, places: "London", rating: 3 },
  { id: 4, places: "New York", rating: 2 },
];
