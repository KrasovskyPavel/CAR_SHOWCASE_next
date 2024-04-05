"use client";

import { useState } from "react";
import { SearchManufacturer } from "./";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton = ({ otherStyles }: { otherStyles: string }) => {
  return (
    <button type="submit" className={`-ml-3 z-10 ${otherStyles}`}>
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying glass"
        width={40}
        height={40}
        className="object-contain"
      />
    </button>
  );
};

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === "" && model === "") {
      return alert("Please fill in the search bar");
    }

    updateSearchParams(manufacturer, model);
  };

  const updateSearchParams = (manaufacturer: string, model: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set("model", model.toLowerCase());
    } else {
      searchParams.delete("model");
    }

    if (manaufacturer) {
      searchParams.set("manufacturer", manufacturer.toLowerCase());
    } else {
      searchParams.delete("manufacturer");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathname, { scroll: false });
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
      </div>
      <SearchButton otherStyles="sm:hidden" />

      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherStyles="sm:hidden" />
      </div>
      <SearchButton otherStyles="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
