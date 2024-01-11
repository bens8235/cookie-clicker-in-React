import React from "react";

function hello() {
  console.log("Hello");
}
export default function Button() {
  return <button onClick={hello}>Hello</button>;
}
