import React, { useState, useRef } from 'react';
import Proptypes from 'prop-types';
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

SearchBox.defaultProps = {
  placeholder: '',
  onFetchData: () => {},
};

SearchBox.propTypes = {
  placeholder: Proptypes.string,
  onFetchData: Proptypes.func,
};

export default SearchBox;
