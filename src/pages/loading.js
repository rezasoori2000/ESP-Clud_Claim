import React from "react";

export default function Loading(props) {
  return (
    <img
      src={`${props.mainRoute}loading.gif`}
      alt="LOADING..."
      style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
    />
  );
}
