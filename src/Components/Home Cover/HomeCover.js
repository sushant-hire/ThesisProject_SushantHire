import React from "react";
import styles from "./HomeCover.module.css";
import CustomButton from "../../Molecules/Custom Button/CustomButton";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

function HomeCover() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8.5rem",
      }}
    >
      <div className={styles.MainHomeCoverContainer}>
        <h1 className={styles.HomeCoverHeading1}>
          Streamline your daily routine, effortlessly.
        </h1>
        <p className={styles.HomeCoverHeading2}>
          From chaos to clarity with Taskopolis. <br /> Your one-stop shop for
          Streamlined Task <br /> Management & Organization.
        </p>
        <Link to="/register">
          {" "}
          <CustomButton
            className={styles.GetStartedButton}
            buttontext="Get Started"
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default HomeCover;
