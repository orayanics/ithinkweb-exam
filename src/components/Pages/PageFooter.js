import styles from "./PageFooter.module.scss";
import React from "react";

function PageFooter() {
  return (
    <footer className={`${styles["footer"]} border-top`}>IThinkWeb Exam</footer>
  );
}

export default PageFooter;
