import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/queries';
// import AuthStorage from '../utils/authStorage';
import useAuthStorage from '../hooks/useAuthStorage';
// import { useContext } from 'react';
// import AuthStorageContext from '../contexts/AuthStorageContext';

// const storageItem = new AuthStorage('tokenA');

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);
  // console.log(result.called);

  // if (result.called !== false && result.loading !== true) {
  //   //console.log('result', result.data.authenticate.accessToken);
  //   authStorage.setAccessToken(result.data.authenticate.accessToken);
  // }

  // authStorage.getAccessToken('tokenA');
  // //setAccessToken(result);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    try {
      const { data } = await mutate({
        variables: { username, password },
      });
      if (data && data.authenticate && data.authenticate.accessToken) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        await apolloClient.resetStore();
      }
      return data;
    } catch (e) {
      console.error('Error during sign in: ', e);
      throw new Error(e.message);
    }
  };

  return [signIn, result];
};

export default useSignIn;
