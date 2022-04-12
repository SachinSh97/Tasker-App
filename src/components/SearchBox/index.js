import React, { useState, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { debouncing } from '../../utils/helper';

const TextField = React.lazy(() => import('../elements/TextField'));

const SearchBox = ({ placeholder, onFetchData }) => {
  const [searchValue, setSearchValue] = useState('');

  const onFetchDataDebounced = useRef(debouncing(onFetchData, 200)).current;

  const handleOnChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
    onFetchDataDebounced(value);
  };

  return (
    <TextField
      name="search-box"
      type="text"
      value={searchValue}
      position="end"
      placeholder={placeholder}
      symbol={<SearchIcon />}
      onChange={handleOnChange}
    />
  );
};

export default SearchBox;
