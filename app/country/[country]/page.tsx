"use client";

import type { RootState } from "@/app/redux/store";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Loading from "@/app/components/Loading";

export default function Country({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = use(params);
  const theme = useSelector((state: RootState) => state.theme.value);
  const countries = useSelector((state: RootState) => state.country.value);
  const [displayCountry, setDisplayCountry] = useState<any>(null);
  const [countryBorderNames, setCountryBorderNames] = useState<any>(null);

  useEffect(() => {
    let sessionData = sessionStorage.getItem("data");
    let sessionCountryBorders = sessionStorage.getItem("countryBorders");
    if (sessionData !== null) {
      setDisplayCountry(JSON.parse(sessionData));
    }
    if (sessionCountryBorders !== null) {
      setCountryBorderNames(JSON.parse(sessionCountryBorders));
    }

    if (countries !== null) {
      const currentCountry = countries.find((c) => c.alpha3Code === country);
      setDisplayCountry(currentCountry);
      sessionStorage.setItem("data", JSON.stringify(currentCountry));

      let codeAndName = [];
      for (let i = 0; i < countries.length; i++) {
        codeAndName.push({
          code: countries[i].alpha3Code,
          name: countries[i].name,
        });
      }

      if (currentCountry?.borders) {
        let countryBorderCodes = currentCountry.borders;
        let index: string[] = [];
        countryBorderCodes.forEach((borderCode: string) => {
          let nameCache = codeAndName.filter((c) => c.code === borderCode);
          index.push(nameCache[0].name);
        });
        setCountryBorderNames(index);
        sessionStorage.setItem("countryBorders", JSON.stringify(index));
      }
    }
  }, []);

  return (
    <>
      {displayCountry !== null ? (
        <div className="mb-20">
          <div className="max-w-[1440px] m-auto pt-20 max-md:pt-15">
            <Link href="/" className="block w-35">
              <button
                className={`flex items-center gap-2 px-8 py-2 rounded-sm shadow-md cursor-pointer  ${
                  theme === "dark"
                    ? "bg-blue-900 text-white"
                    : "bg-white text-black"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill={`${theme === "dark" ? "white" : "black"}`}
                >
                  <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                </svg>
                Back
              </button>
            </Link>
          </div>
          <div className="max-w-[1440px] m-auto pt-20 grid grid-cols-2 gap-40 max-md:gap-20 max-md:grid-cols-1">
            <div>
              <img
                src={displayCountry && displayCountry.flag}
                alt={displayCountry && displayCountry.name}
                className="shadow-lg w-full"
              />
            </div>

            <div
              className={`${
                theme === "dark" ? "*:text-white" : "*:text-black"
              } flex flex-col justify-center `}
            >
              <h2 className="font-bold text-3xl mb-8 max-md:text-3xl">
                {displayCountry && displayCountry.name}
              </h2>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5 max-md:gap-10">
                <div className="*:pb-3 max-md:*:text-[1.2rem]">
                  <p>
                    <span className="font-bold">Native Name:</span>{" "}
                    <span className="font-extralight">
                      {displayCountry && displayCountry.nativeName}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Population:</span>{" "}
                    <span className="font-extralight">
                      {displayCountry &&
                        displayCountry.population
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Sub Region:</span>{" "}
                    <span className="font-extralight">
                      {displayCountry && displayCountry.subregion}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Capital:</span>{" "}
                    <span className="font-extralight">
                      {displayCountry && displayCountry.capital}
                    </span>
                  </p>
                </div>

                <div className="*:pb-3 max-md:*:text-[1.2rem]">
                  <p>
                    <span className="font-bold">Top Level Domain:</span>{" "}
                    <span className="font-extralight">
                      {displayCountry && displayCountry.topLevelDomain}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Currencies:</span>{" "}
                    {displayCountry?.currencies?.map(
                      (currency: { name: string }, index: number) => (
                        <span key={index} className="font-extralight">
                          {currency.name}
                        </span>
                      )
                    )}
                  </p>
                  <p>
                    <span className="font-bold">Languages:</span>{" "}
                    {displayCountry?.languages?.map(
                      (language: { name: string }, index: number) => (
                        <span key={index} className="font-extralight">
                          {language.name},{" "}
                        </span>
                      )
                    )}
                  </p>
                </div>
              </div>

              {displayCountry && displayCountry.borders && (
                <div className="mt-15 flex items-center gap-2 max-md:flex-col max-md:items-start">
                  <p className="font-bold mr-3 shrink-0 max-md:mb-2 max-md:text-[1.2rem]">
                    Border Countries:{" "}
                  </p>
                  <div className="flex items-center flex-wrap gap-2">
                    {countryBorderNames !== null &&
                      countryBorderNames.map(
                        (borderName: string, index: number) => (
                          <div
                            className={`${
                              theme === "dark" ? "bg-blue-900" : "bg-white"
                            } px-7 py-1 rounded-sm shadow-lg *:font-extralight`}
                            key={index}
                          >
                            <p>{borderName}</p>
                          </div>
                        )
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
