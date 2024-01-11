import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button.jsx";

export default function App() {
  const [upgrade1Cost, upgrade1CostUpdate] = useState(10);
  const [upgrade2Cost, upgrade2CostUpdate] = useState(30);
  const [upgrade2, upgrade2Bool] = useState(false);
  const [cookieStep, setCookieStep] = useState(1);
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(0);

  useEffect(
    function () {
      if (upgrade2 === true) {
        const cookieInterval = setInterval(function () {
          setCookies(function (currentCookies) {
            return currentCookies + 1;
          });
        }, 1000 / cps);

        return function () {
          clearInterval(cookieInterval);
        };
      }
    },
    [cps]
  );

  function increaseCps() {
    if (cookies >= upgrade2Cost) {
      setCookies(cookies - upgrade2Cost);
      upgrade2CostUpdate(Math.floor(upgrade2Cost * 1.2));
      upgrade2Bool(true);
      setCps(cps + 1);
    }
  }

  function increaseCookie() {
    setCookies(cookies + cookieStep);
  }

  function upgrade1() {
    if (cookies >= upgrade1Cost) {
      setCookies(cookies - upgrade1Cost);
      upgrade1CostUpdate(Math.floor(upgrade1Cost * 1.2));
      setCookieStep(cookieStep + 1);
    }
  }

  return (
    <div>
      <div id="cookie-container">
        <div id="cookie-stats">
          <p>Cookies: {cookies}</p>
          <p>Cookies per second: {cps}</p>
          <p>Cookies per click: {cookieStep}</p>
        </div>
        <img
          onClick={increaseCookie}
          id="cookie"
          src="cookie.png"
          alt="cookie"
        />
      </div>
      <div id="button-container">
        <button onClick={upgrade1}>
          Increase count per click. Cost: {upgrade1Cost}
        </button>
        <button onClick={increaseCps}>
          Increase cookies per second. Cost: {upgrade2Cost}
        </button>
      </div>
    </div>
  );
}
