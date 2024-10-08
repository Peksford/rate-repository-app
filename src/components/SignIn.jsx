import React, { useState } from 'react';
import { TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

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
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInForm = ({ onSubmit, error }) => {
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

        <Pressable onPress={formik.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      if (data) {
        console.log('SignInData', data);
        navigate('/');
      }
    } catch (e) {
      setError(e.message);
      console.error(e.message);
    }
  };

  return <SignInForm onSubmit={onSubmit} error={error} />;
};

export default SignIn;
