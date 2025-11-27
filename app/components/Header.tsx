"use client";

import { useSelector, useDispatch } from "react-redux";
import { setTheme, setLocalTheme } from "../redux/themeSlice";
import type { RootState } from "../redux/store";
import { useEffect } from "react";

export default function Header() {
  const theme = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  useEffect(() => {
    let localTheme = localStorage.getItem("theme");

    if (localTheme !== null) {
      dispatch(setLocalTheme(localTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
    } else {
      document.body.style.backgroundColor = "hsl(0, 0%, 99%)";
    }
  }, [theme]);

  return (
    <header
      className={`${
        theme === "dark" ? "bg-blue-900 *:text-white" : "bg-white text-black"
      } shadow-lg py-7`}
    >
      <div className="flex items-center justify-between max-w-[1440px] m-auto px-7">
        <h1 className="text-3xl font-bold max-md:text-[1.2rem]">
          Where in the world?
        </h1>

        <button
          className="flex items-center gap-2 font-medium hover:cursor-pointer"
          onClick={() => {
            dispatch(setTheme());
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill={`${theme === "dark" ? "white" : "black"}`}
          >
            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
          </svg>
          Dark Mode
        </button>
      </div>
    </header>
  );
}
