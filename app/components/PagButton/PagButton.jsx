import Link from "next/link";
import Styles from "./PagButton.module.css";

export const PagButton = ({ isPrev, isEnd, ...props }) => {
  return (
    <Link
      className={`${Styles["pag__point"]} ${
        isEnd && Styles["pag__point_disabled"]
      }`}
      {...props}
    >
      {isPrev ? (
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_19_14)">
            <path d="M-2.86102e-05 0H8.61536V16H-2.86102e-05V0Z" fill="white" />
            <path
              d="M7.83352 15.1526L0.844727 8.21694L7.7804 1.22815"
              stroke="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_19_14">
              <rect width="8.61539" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_19_8)">
            <path d="M8.61539 0H0V16H8.61539V0Z" fill="white" />
            <path
              d="M0.78186 15.1526L7.77064 8.21694L0.834975 1.22815"
              stroke="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_19_8">
              <rect width="8.61539" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
    </Link>
  );
};
