import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';

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
  return (
    <View style={styles.flexItemA}>
      <Link to="/">
        <Text style={styles.textWhite}>Repositories</Text>
      </Link>
      <Link to="/signin">
        <Text style={styles.textWhite}>Sign In</Text>
      </Link>
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
