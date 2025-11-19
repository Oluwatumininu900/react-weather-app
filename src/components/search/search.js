import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [searchMessage, setSearchMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const loadOptions = async (inputVal) => {
    if (!inputVal || inputVal.length < 1) {
      setSearchMessage("");
      return { options: [] };
    }

    try {
      const response = await fetch(
        `${GEO_API_URL}/v1/geo/cities?minPopulation=1000000&namePrefix=${inputVal}`,
        geoApiOptions
      );
      const result = await response.json();

      if (!result.data || !Array.isArray(result.data)) {
        setSearchMessage("Something went wrong. Try again.");
        return { options: [] };
      }

      if (result.data.length === 0) {
        setSearchMessage("Location not found. Try another name.");
        return { options: [] };
      }

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
    setSearchMessage("");
  };

  const handleInputChange = (val) => {
    setInputValue(val);
    return val;
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh"
    }}>
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
      />

      {searchMessage && (
        <p style={{ color: "red", marginTop: "20px", fontSize: "18px", textAlign: "center" }}>
          {searchMessage}
        </p>
      )}
    </div>
  );
};

export default Search;
