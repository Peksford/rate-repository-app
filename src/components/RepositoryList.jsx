import {
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import * as React from 'react';
import { useNavigate } from 'react-router-native';
import { RepositoryItem } from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
// import { useQuery } from '@apollo/client';
import {
  Button,
  Menu,
  Divider,
  PaperProvider,
  Searchbar,
} from 'react-native-paper';
// import { GET_REPOSITORIES } from '../graphql/queries';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    flex: 1,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReposityListHeader = React.memo(
  ({
    setOrderBy,
    setOrderDirection,
    menuText,
    setMenuText,
    searchQuery,
    setSearchQuery,
  }) => {
    useEffect(() => {}, [menuText]);

    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
      <View
        style={{
          paddingTop: 50,
        }}
      >
        {/* <SearchbarMemo
          searchQuery={searchText}
          setSearchQuery={setSearchText}
        /> */}
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>{menuText}</Button>}
        >
          <Menu.Item
            onPress={() => {
              setMenuText('Latest repositories');
              setOrderBy('CREATED_AT');
              setOrderDirection('DESC');
              closeMenu();
            }}
            title="Latest repositories"
          />
          <Menu.Item
            onPress={() => {
              setMenuText('Highest rated repositories');
              setOrderBy('RATING_AVERAGE');
              setOrderDirection('DESC');
              closeMenu();
            }}
            title="Highest rated repositories"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setMenuText('Lowest rated repositories');
              setOrderBy('RATING_AVERAGE');
              setOrderDirection('ASC');
              closeMenu();
            }}
            title="Lowest rated repositories"
          />
        </Menu>
      </View>
    );
  }
);

ReposityListHeader.displayName = 'ReposityListHeader';

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <ReposityListHeader
        setOrderBy={props.setOrderBy}
        setOrderDirection={props.setOrderDirection}
        menuText={props.menuText}
        setMenuText={props.setMenuText}
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
        orderDirection={props.orderDirection}
        orderBy={props.orderBy}
      />
    );
  };

  render() {
    const { data } = this.props;

    if (!data || !data.repositories) {
      return null;
    }
    const repositoryNodes = data.repositories
      ? data.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <PaperProvider>
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={this.renderHeader}
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            // other props
            renderItem={({ item }) => (
              <Pressable
                onPress={() => this.props.navigate(`/repository/${item.id}`)}
                style={styles.button}
              >
                <RepositoryItem repository={item} />
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            onEndReached={this.props.onEndReach}
            onEndReachedThreshold={0.5}
          />
        </View>
      </PaperProvider>
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [menuText, setMenuText] = useState('Latest repositories');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);

  const navigate = useNavigate();

  const { repositories, loading, error, fetchMore } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    debouncedQuery,
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <RepositoryListContainer
      setOrderDirection={setOrderDirection}
      setOrderBy={setOrderBy}
      data={repositories}
      menuText={menuText}
      setMenuText={setMenuText}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      navigate={navigate}
      onEndReach={onEndReach}
      direction={orderDirection}
      orderBy={orderBy}
    />
  );
};

export default RepositoryList;
