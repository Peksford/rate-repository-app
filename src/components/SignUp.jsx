import { TextInput, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Text from './Text';
import { View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { CREATE_USER } from '../graphql/mutations';
import { ME } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  textContainer: {
    width: '80%',
  },
  textStyle: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor: 'grey',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'purple',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
});

const initialValues = {
  username: '',
  password: '',
  confirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const SignUpForm = ({ onSubmit, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <View style={styles.textContainer}>
        <TextInput
          style={
            formik.touched.username && formik.errors.username
              ? { ...styles.textStyle, borderColor: '#d73a4a' }
              : { ...styles.textStyle, borderColor: 'grey' }
          }
          placeholder="username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          onBlur={formik.handleBlur('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
        )}
        <TextInput
          style={
            formik.touched.password && formik.errors.password
              ? { ...styles.textStyle, borderColor: '#d73a4a' }
              : { ...styles.textStyle, borderColor: 'grey' }
          }
          placeholder="password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
        )}
        <TextInput
          style={
            formik.touched.confirmation && formik.errors.confirmation
              ? { ...styles.textStyle, borderColor: '#d73a4a' }
              : { ...styles.textStyle, borderColor: 'grey' }
          }
          placeholder="Password confirmation"
          secureTextEntry
          value={formik.values.confirmation}
          onChangeText={formik.handleChange('confirmation')}
        />
        {formik.touched.confirmation && formik.errors.confirmation && (
          <Text style={{ color: 'red' }}>{formik.errors.confirmation}</Text>
        )}

        <Pressable onPress={formik.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: ME }],
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    try {
      const { data } = await createUser({
        variables: {
          user: {
            username: values.username,
            password: values.password,
          },
        },
      });
      console.log('Sign Up succesful: ', data);
      try {
        const dataSignIn = await signIn({
          username: values.username,
          password: values.password,
        });
        console.log('signing in ..', dataSignIn);
      } catch (e) {
        console.error(e.message);
      }
      navigate('/');
    } catch (e) {
      setError(e.message);
      console.error(e.message);
    }
  };

  return <SignUpForm onSubmit={onSubmit} error={error} />;
};

export default SignUp;
