//import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
// import RepositoryItem from './RepositoryItem';
import SingleRepository from './RepositoryItem';
import Form from './ReviewForm';
//import Text from './Text';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

// const SimpleNavigation = () => (
//   <Link to="/signin">
//     <Text>Go to Sign in</Text>
//   </Link>
// );

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route
          path="/repository/:repositoryId"
          element={<SingleRepository />}
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/create" element={<Form />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviews" element={<UserReviews />} />
      </Routes>
      {/* <RepositoryList /> */}
      {/* <SimpleNavigation /> */}
    </View>
  );
};

export default Main;
