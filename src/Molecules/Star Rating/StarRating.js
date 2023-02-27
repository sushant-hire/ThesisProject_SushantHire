import React, { useState } from "react";
import styles from "./StarRating.module.css";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isRated, setIsRated] = useState(false);

  const handleMouseOver = (ratingValue) => {
    setHover(ratingValue);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    setIsRated(true);
  };

  return (
    <div>
      <div className={styles.StarCollective}>
        <p>{isRated ? `Your rating is: ${rating}` : "Rate us out of 5?"}</p>
      </div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              style={{ visibility: "hidden" }}
            />
            <FaStar
              className={styles.Stars}
              color={
                ratingValue <= (hover || rating) ? "darkcyan" : "lightgray"
              }
              size={30}
              onMouseOver={() => handleMouseOver(ratingValue)}
              onMouseLeave={() => handleMouseLeave()}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
