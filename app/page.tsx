"use client";

import { useEffect, useRef, useState } from "react";
import Card from "./components/Card";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import type { RootState } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setCountry } from "./redux/countrySlice";

type Countries = {
  flag: string;
  name: string;
  population: string;
  region: string;
  capital: string;
  alpha3Code: string;
};

export default function Home() {
  const [countries, setCountries] = useState<Countries[] | null>(null);
  const [displayCountries, setDisplayCountries] = useState<Countries[] | null>(
    null
  );
  const [cacheCountries, setCacheCountries] = useState<Countries[] | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(16);
  const [displayCountryName, setDisplayCountryName] = useState<string>("");
  const loaderDiv = useRef<HTMLDivElement | null>(null);
  const theme = useSelector((state: RootState) => state.theme.value);
  const country = useSelector((state: RootState) => state.country.value);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch("/data.json");
      const data = await response.json();

      if (data) {
        setCountries(data);
        setCacheCountries(data);
        setDisplayCountries(data.slice(0, page));
        dispatch(setCountry(data));
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entry) => {
      entry.forEach((div) => {
        if (div.isIntersecting) {
          let itemsPerPage = 16;
          setPage((prev) => prev + itemsPerPage);
        }
      });
    });
    if (loaderDiv.current !== null) {
      observer.observe(loaderDiv.current);
    }
  }, [country]);

  useEffect(() => {
    if (cacheCountries !== null) {
      let newItems = cacheCountries.slice(0, page);
      setDisplayCountries(newItems);
    }
  }, [page]);

  useEffect(() => {
    if (countries !== null) {
      setCacheCountries(
        countries.filter((country) => country.region === filter)
      );
      setPage(16);
    }
  }, [filter]);

  useEffect(() => {
    if (cacheCountries !== null) {
      setDisplayCountries(cacheCountries.slice(0, page));
    }
  }, [cacheCountries]);

  function search() {
    if (countries !== null) {
      let firstLetterUpperCase = searchQuery.toUpperCase().slice(0, 1);
      let lowerCaseWordWithoutTheFirstLetter = searchQuery.slice(
        1,
        searchQuery.length
      );
      let upperCaseQuery =
        firstLetterUpperCase + lowerCaseWordWithoutTheFirstLetter;

      setDisplayCountries(
        countries.filter((country) => country.name.includes(upperCaseQuery))
      );
      loaderDiv.current!.style.display = "none";
    }
  }

  return (
    <>
      <Navigation
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        setFilter={setFilter}
        filter={filter}
        search={search}
      />
      <div className="flex flex-wrap gap-20 justify-center max-w-[1440px] m-auto pb-10 relative">
        {displayCountries === null && <Loading />}
        {displayCountries !== null &&
          displayCountries.map((country, index) => (
            <Card
              key={index}
              code={country.alpha3Code}
              flag={country.flag}
              name={country.name}
              population={country.population}
              region={country.region}
              capital={country.capital}
              setDisplayCountryName={setDisplayCountryName}
            />
          ))}
        {displayCountries !== null && (
          <div className="w-full h-2" ref={loaderDiv}></div>
        )}
      </div>
    </>
  );
}
