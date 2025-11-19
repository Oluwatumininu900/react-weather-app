import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [searchMessage, setSearchMessage] = useState(""); // NEW

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/v1/geo/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const result = await response.json();
      console.log("Geo API result:", result);

      if (!result.data || !Array.isArray(result.data)) {
        console.warn("Invalid Geo API format:", result);
        setSearchMessage("Something went wrong. Try again.");
        return { options: [] };
      }

      // If API returns empty list (e.g., Ogun)
      if (result.data.length === 0) {
        setSearchMessage("Location not found. Try another name.");
        return { options: [] };
      }

      // Clear message if data exists
      setSearchMessage("");

      const options = result.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));

      return { options };

    } catch (err) {
      console.error("Error fetching cities:", err);
      setSearchMessage("Network error. Please check connection.");
      return { options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />

      {/* SHOW ERROR MESSAGE BELOW SEARCH BAR */}
      {searchMessage && (
        <p style={{ color: "red", marginTop: "8px", fontSize: "14px" }}>
          {searchMessage}
        </p>
      )}
    </div>
  );
};

export default Search;
