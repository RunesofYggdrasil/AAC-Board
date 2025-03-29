"use client";

import styles from "./BoardButton.module.css";
import React, { MouseEvent } from "react";

interface Props {
  image?: string;
  label?: string;
  text: string;
}

const handleClick = (e: MouseEvent<HTMLInputElement>): void => {
  e.preventDefault();
};

function BoardButton({ image = "", label = "", text }: Props) {
  return (
    <>
      <button
        type="button"
        onClick={() => console.log(text)}
        className={styles.button}
      >
        <div
          className={styles.buttonImage}
          style={{ backgroundImage: "url(" + image + ")" }}
        ></div>
        <div className={styles.buttonLabel}>{label}</div>
      </button>
    </>
  );
}

export default BoardButton;
