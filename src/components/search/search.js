import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");

  const loadOptions = async (inputValue) => {
    // Clear previous message immediately when user types
    setSearchMessage("");

    if (!inputValue || inputValue.length < 1) {
      return { options: [] };
    }

    try {
      const response = await fetch(
        `${GEO_API_URL}/v1/geo/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json();

      // Invalid API response
      if (!result.data || !Array.isArray(result.data)) {
        setSearchMessage("Something went wrong. Try again.");
        return { options: [] };
      }

      // No city found (like Ogun)
      if (result.data.length === 0) {
        setSearchMessage("Location not found. Try another name.");
        return { options: [] };
      }

      // Valid results → clear message
      setSearchMessage("");

      const options = result.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));

      return { options };
    } catch (err) {
      setSearchMessage("Network error. Please try again.");
      return { options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    // Clear message when user selects a city
    setSearchMessage("");
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        // Add key here to force re-render when input changes
        key={search ? search.value : "search-input"}
      />

      {/* SHOW ERROR MESSAGE BELOW SEARCH BAR */}
      {searchMessage && <p>{searchMessage}</p>}
    </div>
  );
};

export default Search;
