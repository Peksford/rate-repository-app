import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    // ...
  },
  flexItemA: {
    flexGrow: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textWhite: {
    color: theme.headerProperties.color,
    fontSize: theme.headerProperties.size,
    fontWeight: theme.fontWeights.bold,
    marginHorizontal: 2,
  },
  scrollView: {
    backgroundColor: 'purple',
  },
  // ...
});

const PressableText = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    pollInterval: 2000,
    // Other options
  });
  if (loading) {
    return <Text> Loading </Text>;
  }
  if (error) {
    return <Text> Error </Text>;
  }
  console.log('ME data: ', data.me);

  const user = data.me ? data.me.username : null;

  const handleLogOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.flexItemA}>
      <Link to="/">
        <Text style={styles.textWhite}>Repositories</Text>
      </Link>
      {user ? (
        <Pressable onPress={handleLogOut} style={styles.button}>
          <Text style={styles.textWhite}>Sign out</Text>
        </Pressable>
      ) : (
        <Link to="/signin">
          <Text style={styles.textWhite}>Sign In</Text>
        </Link>
      )}
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        {<PressableText />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
