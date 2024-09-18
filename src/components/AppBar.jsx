import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
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
    marginHorizontal: 10,
  },
  scrollView: {
    backgroundColor: 'purple',
  },
  // ...
});

const PressableText = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'network-only',
    pollInterval: 2000,
    // Other options
  });

  if (loading) {
    return <Text> Loading </Text>;
  }
  if (error) {
    return <Text> Error </Text>;
  }

  const user = data.me ? data.me.username : null;

  const handleLogOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();

    navigate('/');
  };

  return (
    <View style={styles.flexItemA}>
      <Link to="/">
        <Text style={styles.textWhite}>Repositories</Text>
      </Link>
      {user ? (
        <Link to="/create">
          <Text style={styles.textWhite}>Create</Text>
        </Link>
      ) : null}
      {user ? (
        <Link to="/reviews">
          <Text style={styles.textWhite}>My Reviews</Text>
        </Link>
      ) : null}
      {user ? (
        <Pressable onPress={handleLogOut}>
          <Text style={styles.textWhite}>Sign out</Text>
        </Pressable>
      ) : (
        <>
          <Link to="/signin">
            <Text style={styles.textWhite}>Sign In</Text>
          </Link>

          <Link to="/signup">
            <Text style={styles.textWhite}>Sign Up</Text>
          </Link>
        </>
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
