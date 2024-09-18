import {
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  FlatList,
  Alert,
} from 'react-native';

import theme from '../theme';
import Text from './Text';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import { useDeleteReview } from '../hooks/useDeleteReview';
import useReviews from '../hooks/useReviews';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flexContainer: {
    flex: 1,
    paddingTop: 10,
    // justifyContent: 'center',
    paddingBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: 'grey',
  },
  flexItemA: {
    flexDirection: 'row',
  },
  flexItemB: {
    justifyContent: 'center',
    marginLeft: 10,
    flexShrink: 1,
  },
  flexItemC: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  flexItemD: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 85,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
  },
  flexItemE: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  flexItemF: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  roundShape: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'purple',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  circleText: {
    fontWeight: 'bold',
    color: 'purple',
  },
  box: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    alignSelf: 'center',
    borderRadius: 5,
    textColor: 'white',
  },
  deleteButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  textLanguage: {
    fontSize: theme.fontSizes.body,
    color: 'white',
    textAlign: 'center',
  },
  logo: {
    width: 66,
    height: 58,
    marginLeft: 10,
    borderRadius: 5,
  },
});

const ReviewItem = ({ review }) => {
  const navigate = useNavigate();
  const deleteReview = useDeleteReview();

  const handleDelete = (id) => {
    deleteReview(id);
  };

  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemA}>
        <View style={styles.roundShape}>
          <Text style={styles.circleText}>{review.node.rating}</Text>
        </View>
        <View style={styles.flexItemB}>
          <Text fontSize={'subheading'} fontWeight={'bold'}>
            {review.node.repository.fullName}
          </Text>
          <View style={styles.flexItemC}>
            <Text color={'textSecondary'}>
              {format(new Date(review.node.createdAt), 'dd.MM.yyyy')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.flexItemB}>
        <Text>{review.node.text}</Text>
      </View>
      <View style={styles.flexItemF}>
        <Pressable
          onPress={() => navigate(`/repository/${review.node.repository.id}`)}
          style={styles.button}
        >
          <Text style={styles.textLanguage}>View repository</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            Alert.alert(
              'Delete review',
              'Are you sure you want to delete this review?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel pressed'),
                  style: 'cancel',
                },
                { text: 'OK', onPress: () => handleDelete(review.node.id) },
              ]
            )
          }
          style={styles.deleteButton}
        >
          <Text style={styles.textLanguage}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  // ...
  const { reviews, loading, error } = useReviews();

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  if (error)
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  if (!reviews || !reviews.me) {
    return <Text>No reviews available</Text>;
  }

  return (
    <FlatList
      data={reviews.me.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.node.id}

      // ...
    />
  );
};

export default UserReviews;
