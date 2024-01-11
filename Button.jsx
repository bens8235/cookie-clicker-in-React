import React from "react";

export default function Button(props) {
  return (
    <>
      <button onClick={props.func}>
        {props.phrase} {props.cost}
      </button>
    </>
  );
}
