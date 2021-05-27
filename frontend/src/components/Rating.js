import React from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Rating = ({ value, text, color = '#f8e825' }) => {
  return (
    <div className='rating'>
      <span>
        {value >= 1 ? (
          <BsStarFill color={color} />
        ) : value >= 0.5 ? (
          <BsStarHalf color={color} />
        ) : (
          <BsStar color={color} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <BsStarFill color={color} />
        ) : value >= 1.5 ? (
          <BsStarHalf color={color} />
        ) : (
          <BsStar color={color} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <BsStarFill color={color} />
        ) : value >= 2.5 ? (
          <BsStarHalf color={color} />
        ) : (
          <BsStar color={color} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <BsStarFill color={color} />
        ) : value >= 3.5 ? (
          <BsStarHalf color={color} />
        ) : (
          <BsStar color={color} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <BsStarFill color={color} />
        ) : value >= 4.5 ? (
          <BsStarHalf color={color} />
        ) : (
          <BsStar color={color} />
        )}
      </span>
      <br />
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
