'use client';
import React, { useEffect, useState } from 'react';

interface Props {
  showTooltip?: boolean;
  readonly?: boolean;
  value?: number;
  onChangue?: (value: number) => void;
}
const Rating = ({ showTooltip, readonly, value = 0, onChangue }: Props) => {
  const [rating, setRating] = useState(Math.floor(value));
  const [hoverRating, setHoverRating] = useState(0);
  const status = {
    1: ' Pésimo 😞',
    2: ' Malo 😕',
    3: ' Regular 😐',
    4: ' Bueno 🙂',
    5: ' Excelente 😍',
  };
  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleStarHover = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleHoverLeave = () => {
    setHoverRating(0);
  };

  useEffect(() => {
    if (onChangue) {
      onChangue(rating);
    }
  }, [rating]);

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          onClick={!readonly ? () => handleStarClick(index) : () => null}
          onMouseEnter={!readonly ? () => handleStarHover(index) : () => null}
          onMouseLeave={handleHoverLeave}
          width="21"
          height="21"
          viewBox="0 0 19 19"
          fill={index < hoverRating || index < rating ? '#00DC8C' : '#e4e5e9'}
          xmlns="http://www.w3.org/2000/svg"
          style={{ cursor: 'pointer' }}
        >
          <path d="M9.50002 14.4669L6.2146 16.4461C6.06946 16.5385 5.91772 16.578 5.75939 16.5648C5.60106 16.5516 5.46252 16.4989 5.34377 16.4065C5.22502 16.3141 5.13266 16.1986 5.06668 16.0598C5.00071 15.921 4.98752 15.7661 5.0271 15.5951L5.89793 11.8544L2.98856 9.34089C2.85661 9.22214 2.77428 9.08676 2.74156 8.93476C2.70884 8.78276 2.7186 8.63446 2.77085 8.48984C2.82363 8.34471 2.90279 8.22595 3.00835 8.13359C3.11391 8.04123 3.25904 7.98186 3.44377 7.95547L7.28335 7.61901L8.76772 4.09609C8.8337 3.93776 8.93609 3.81901 9.07489 3.73984C9.2137 3.66068 9.35541 3.62109 9.50002 3.62109C9.64516 3.62109 9.78686 3.66068 9.92514 3.73984C10.0634 3.81901 10.1658 3.93776 10.2323 4.09609L11.7167 7.61901L15.5563 7.95547C15.741 7.98186 15.8861 8.04123 15.9917 8.13359C16.0972 8.22595 16.1764 8.34471 16.2292 8.48984C16.282 8.63498 16.292 8.78355 16.2593 8.93555C16.2265 9.08755 16.1439 9.22266 16.0115 9.34089L13.1021 11.8544L13.9729 15.5951C14.0125 15.7666 13.9993 15.9217 13.9334 16.0606C13.8674 16.1994 13.775 16.3147 13.6563 16.4065C13.5375 16.4989 13.399 16.5516 13.2406 16.5648C13.0823 16.578 12.9306 16.5385 12.7854 16.4461L9.50002 14.4669Z" />
        </svg>
      ))}
      {showTooltip && (
        <p className="text-sm pl-4">
          {
            status[
              rating > hoverRating
                ? (rating as keyof typeof status)
                : (hoverRating as keyof typeof status)
            ]
          }
        </p>
      )}
    </div>
  );
};

export default Rating;
