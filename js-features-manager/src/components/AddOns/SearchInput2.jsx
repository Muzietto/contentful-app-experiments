import { IconButton, TextInput } from '@contentful/f36-components';
import { CloseIcon, SearchIcon } from '@contentful/f36-icons';
import tokens from '@contentful/f36-tokens';
import React, { useState } from 'react';

const SearchInput2 = ({
  debounce = 500,
  value = '',
  onSearch,
  placeholder = 'Search',
}) => {
  const [innerSearch, setInnerSearch] = useState(value);
  const [timeoutHandler, setTimeoutHandler] = useState();

  const handleChange = search => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    setInnerSearch(search);
    setTimeoutHandler(
      setTimeout(() => {
        onSearch?.(search);
      }, debounce)
    );
  };

  const handleClear = () => {
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
    }
    setInnerSearch('');
    onSearch?.('');
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <TextInput
        style={{ paddingRight: '30px' }}
        value={innerSearch}
        icon={<SearchIcon />}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.currentTarget.value)}
      />
      {innerSearch && (
        <IconButton
          variant='transparent'
          style={{
            position: 'absolute',
            top: '1px',
            right: '1px',
            padding: '0.25rem',
            height: '38px',
            zIndex: 1,
          }}
          onClick={handleClear}
          aria-label='clear'
          icon={<CloseIcon style={{ fill: tokens.gray700 }} />}
          size='small'
        />
      )}
    </div>
  );
};

export default SearchInput2;
