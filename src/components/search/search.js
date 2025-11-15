import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

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
        return { options: [] };
      }

      const options = result.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      }));

      return { options };
    } catch (err) {
      console.error("Error fetching cities:", err);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
