import React, { useState } from 'react';
import { TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

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
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating between 0-100')
    .max(100, 'Rating between 0-100')
    .required('Rating is required'),
  text: yup.string(),
});

export const ReviewForm = ({ onSubmit, error }) => {
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
            formik.touched.ownerName && formik.errors.ownerName
              ? { ...styles.textStyle, borderColor: '#d73a4a' }
              : { ...styles.textStyle, borderColor: 'grey' }
          }
          placeholder="Owner name"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          onBlur={formik.handleBlur('ownerName')}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
        )}
        <TextInput
          style={
            formik.touched.repositoryName && formik.errors.repositoryName
              ? { ...styles.textStyle, borderColor: '#d73a4a' }
              : { ...styles.textStyle, borderColor: 'grey' }
          }
          placeholder="Repository name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          onBlur={formik.handleBlur('repositoryName')}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
        )}

        <TextInput
          style={
            formik.touched.rating && formik.errors.rating
              ? { ...styles.textStyle, borderColor: '#d73a4a' }
              : { ...styles.textStyle, borderColor: 'grey' }
          }
          placeholder="Rating"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          onBlur={formik.handleBlur('rating')}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
        )}
        <TextInput
          style={
            formik.touched.text && formik.errors.text
              ? { ...styles.textStyle, borderColor: '#d73a4a' }
              : { ...styles.textStyle, borderColor: 'grey' }
          }
          multiline
          placeholder="Review"
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          onBlur={formik.handleBlur('text')}
        />
        {formik.touched.text && formik.errors.text && (
          <Text style={{ color: 'red' }}>{formik.errors.text}</Text>
        )}
        <Pressable onPress={formik.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit a review</Text>
        </Pressable>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const Form = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const [error, setError] = useState(null);

  // if (loading)
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="red" />
  //     </View>
  //   );
  // if (error)
  //   return (
  //     <View style={styles.container}>
  //       <Text>Error: {error.message}</Text>
  //     </View>
  //   );
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log('Form values', values);

    try {
      console.log('Review mutation about to happen');
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            rating: parseInt(values.rating),
            repositoryName: values.repositoryName,
            text: values.text,
          },
        },
      });
      console.log('Review mutation result: ', data);
      navigate('/');
    } catch (e) {
      setError(e.message);
      console.error(e.message);
    }
  };

  return <ReviewForm onSubmit={onSubmit} error={error} />;
};

export default Form;
