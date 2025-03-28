"use client";

import React, { MouseEvent, useState } from "react";
import styles from "./ColorButton.module.css";

interface ColorButtonProps {
  color?: string | undefined;
}

const handleClick = (
  e: React.MouseEvent<HTMLButtonElement>,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault();

  switch (value) {
    case "One":
      setValue("Two");
      break;
    case "Two":
      setValue("Three");
      break;
    case "Three":
      setValue("One");
      break;
    default:
      setValue("One");
      break;
  }
};

const handleColor = (colorName: string) => {
  switch (colorName) {
    case "One":
      return styles.classOne;
    case "Two":
      return styles.classTwo;
    case "Three":
      return styles.classThree;
    default:
      return styles.classOne;
  }
};

const ColorButton = ({ color }: ColorButtonProps) => {
  let startingColor: string;
  if (color == undefined) {
    startingColor = "One";
  } else {
    startingColor = color;
  }
  const [buttonColor, setButtonColor] = useState<string>(startingColor);

  return (
    <div>
      <button
        className={handleColor(buttonColor)}
        onClick={(event) => {
          handleClick(event, buttonColor, setButtonColor);
        }}
        type="button"
      >
        blah
      </button>
    </div>
  );
};

export default ColorButton;
