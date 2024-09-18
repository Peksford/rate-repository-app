import React from 'react';
import { Searchbar } from 'react-native-paper';

export const SearchbarMemo = React.memo(({ searchQuery, setSearchQuery }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
});

SearchbarMemo.displayName = 'SearchBarMemo';
