import { SetStateAction, useState } from "react";

type Navigation = {
  theme: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  search: () => void;
};

export default function SearchBar({
  theme,
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  search,
}: Navigation) {
  const [isFilterDropdownActive, setIsFilterDropdownActive] =
    useState<boolean>(false);

  return (
    <nav className="max-w-[1440px] m-auto flex justify-between my-13 max-md:flex-col max-md:gap-13">
      {/* search bar */}
      <div
        className={`${
          theme === "dark"
            ? "bg-blue-900 *:text-white"
            : "bg-white *:text-black"
        } rounded-md flex align-center py-1 px-7 shadow-lg w-[40%] max-md:w-full`}
      >
        <button
          className={`p-3 cursor-pointer`}
          onClick={() => {
            search();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
            className={`${theme === "light" && "fill-black"}`}
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search for a country..."
          className={`text-white w-full px-4 focus:outline-0`}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }
          }}
        />
      </div>

      {/* filter */}
      <div
        className={`${
          theme === "dark" ? "bg-blue-900 text-white" : "bg-white text-black"
        } rounded-md flex items-center pl-6 pr-4 relative w-60 justify-between hover:cursor-pointer select-none shadow-lg py-4`}
        tabIndex={0}
        onClick={() => {
          setIsFilterDropdownActive(!isFilterDropdownActive);
        }}
        onBlur={() => {
          setIsFilterDropdownActive(false);
        }}
      >
        <p>{filter === "" ? "Filter by Region" : filter}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#FFFFFF"
          className={`${isFilterDropdownActive && "rotate-180"} ${
            theme === "light" && "fill-black"
          }`}
        >
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>

        <div
          className={`${
            theme === "dark" ? "bg-blue-900 text-white" : "bg-white text-black"
          } rounded-md absolute w-full left-0 top-full px-7 py-4 mt-1 *:py-1 *:hover:opacity-50 *:hover:cursor-pointer *:select-none ${
            isFilterDropdownActive ? "block" : "hidden"
          } z-10`}
        >
          <p
            onClick={() => {
              setFilter("Africa");
            }}
          >
            Africa
          </p>
          <p
            onClick={() => {
              setFilter("Americas");
            }}
          >
            Americas
          </p>
          <p
            onClick={() => {
              setFilter("Asia");
            }}
          >
            Asia
          </p>
          <p
            onClick={() => {
              setFilter("Europe");
            }}
          >
            Europe
          </p>
          <p
            onClick={() => {
              setFilter("Oceania");
            }}
          >
            Oceania
          </p>
        </div>
      </div>
    </nav>
  );
}
