import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button.jsx";
import upgrades from "./upgrades.js";

export default function App() {
  // localStorage.clear();
  let obj = JSON.parse(localStorage.getItem("myObj"));

  if (obj === null) {
    obj = {
      upgrade1Cost: 10,
      upgrade2Cost: 30,
      upgrade2: false,
      cookieStep: 1,
      cookies: 0,
      cps: 0,
    };
  }

  const [upgrade1Cost, upgrade1CostUpdate] = useState(obj.upgrade1Cost);
  const [upgrade2Cost, upgrade2CostUpdate] = useState(obj.upgrade2Cost);
  const [upgrade2, upgrade2Bool] = useState(obj.upgrade2);
  const [cookieStep, setCookieStep] = useState(obj.cookieStep);
  const [cookies, setCookies] = useState(obj.cookies);
  const [cps, setCps] = useState(obj.cps);

  const [colour1, colourChange1] = useState(false);
  const [colour2, colourChange2] = useState(false);

  //

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

  useEffect(
    function () {
      if (cookies >= upgrade1Cost) {
        colourChange1(true);
      } else {
        colourChange1(false);
      }

      if (cookies >= upgrade2Cost) {
        colourChange2(true);
      } else {
        colourChange2(false);
      }

      const myObj = {
        cookies: cookies,
        cps: cps,
        cookieStep: cookieStep,
        upgrade1Cost: upgrade1Cost,
        upgrade2Cost: upgrade2Cost,
        upgrade2: upgrade2,
      };
      localStorage.setItem("myObj", JSON.stringify(myObj));
    },
    [cookies]
  );

  // function createButton(button) {
  //   return (
  //     <Button
  //       key={button.id}
  //       func={button.item}
  //       phrase={button.phrase}
  //       cost={button.cost}
  //     />
  //   );
  // }

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
        {/* {upgrades.map(createButton)} */}
        <Button
          func={upgrade1}
          phrase="Increase count per click. Cost: "
          cost={upgrade1Cost}
          colour={colour1}
        />
        <Button
          func={increaseCps}
          phrase="Increase cookies per second. Cost: "
          cost={upgrade2Cost}
          colour={colour2}
        />
      </div>
    </div>
  );
}
