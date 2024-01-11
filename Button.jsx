import React from "react";

export default function Button(props) {
  //   let color = "";
  //   if (props.colour === true) {
  //     color = "green";
  //   } else {
  //     color = "red";
  //   }
  return (
    <>
      <button
        style={{ backgroundColor: props.colour ? "green" : "red" }}
        onClick={props.func}
      >
        {props.phrase} {props.cost}
      </button>
    </>
  );
}
