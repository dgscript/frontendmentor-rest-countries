import Link from "next/link";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Root } from "react-dom/client";

type Card = {
  flag: string;
  name: string;
  population: string;
  region: string;
  code: string;
  capital: string;
  setDisplayCountryName: React.Dispatch<React.SetStateAction<string>>;
};

export default function Card({
  flag,
  code,
  name,
  population,
  region,
  capital,
  setDisplayCountryName,
}: Card) {
  const theme = useSelector((state: RootState) => state.theme.value);

  return (
    <Link href={`/country/${code}`}>
      <div
        className={`w-75 rounded-sm overflow-hidden shadow-lg ${
          theme === "dark" ? "bg-blue-900" : "bg-white"
        }`}
        onClick={() => {
          setDisplayCountryName(name);
        }}
      >
        <img src={flag} alt={name} className="w-full" />
        <div
          className={`px-5 pt-5 pb-10 ${
            theme === "dark" ? "*:text-white" : "*:text-black"
          }`}
        >
          <p className="font-bold text-[1.2rem] pb-3">{name}</p>
          <p className="pb-1">
            <span className="font-semibold">Population:</span>{" "}
            <span className="font-extralight">
              {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </span>
          </p>
          <p className="pb-1">
            <span className="font-semibold">Region:</span>{" "}
            <span className="font-extralight">{region}</span>
          </p>
          <p className="pb-1">
            <span className="font-semibold">Capital:</span>{" "}
            <span className="font-extralight">{capital}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
