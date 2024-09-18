import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  FlatList,
} from 'react-native';
import { useParams } from 'react-router-native';
import theme from '../theme';
import Text from './Text';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';
import useRepositoryItem from '../hooks/useRepositoryItem';

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

export const RepositoryItem = ({ repository }) => {
  return (
    <View testID="repositoryItem" style={styles.flexContainer}>
      <View style={styles.flexItemA}>
        <Image
          style={styles.logo}
          source={{ uri: `${repository.ownerAvatarUrl}` }}
        />
        <View style={styles.flexItemB}>
          <Text fontSize={'subheading'} fontWeight={'bold'}>
            {repository.fullName}
          </Text>
          <View style={styles.flexItemC}>
            <Text color={'textSecondary'}>{repository.description}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexItemD}>
        <Text style={styles.textLanguage}>{repository.language} </Text>
      </View>
      <View style={styles.flexItemE}>
        <View style={styles.box}>
          <Text testID="starCount" fontWeight={'bold'}>
            {Math.round((repository.stargazersCount / 1000) * 10) / 10}k
          </Text>
          <Text testID="starLabel" color={'textSecondary'}>
            Stars
          </Text>
        </View>
        <View style={styles.box}>
          <Text testID="forksCount" fontWeight={'bold'}>
            {Math.round((repository.forksCount / 1000) * 10) / 10}k
          </Text>
          <Text testID="forksLabel" color={'textSecondary'}>
            Forks
          </Text>
        </View>
        <View style={styles.box}>
          <Text testID="reviewCount" fontWeight={'bold'}>
            {repository.reviewCount}
          </Text>
          <Text testID="reviewLabel" color={'textSecondary'}>
            Reviews
          </Text>
        </View>
        <View style={styles.box}>
          <Text testID="ratingAverage" fontWeight={'bold'}>
            {repository.ratingAverage}
          </Text>
          <Text testID="ratingLabel" color={'textSecondary'}>
            Rating
          </Text>
        </View>
      </View>
      {repository.url ? (
        <View>
          <Pressable
            onPress={() => Linking.openURL(repository.url)}
            style={styles.button}
          >
            <Text style={styles.textLanguage}>Open In Github</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemA}>
        <View style={styles.roundShape}>
          <Text style={styles.circleText}>{review.node.rating}</Text>
        </View>
        <View style={styles.flexItemB}>
          <Text fontSize={'subheading'} fontWeight={'bold'}>
            {review.node.user.username}
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
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { repositoryId } = useParams();

  const { repositoryItem, loading, error, fetchMore } = useRepositoryItem({
    first: 2,
    repositoryId: repositoryId,
  });

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

  const onEndReach = () => {
    console.log('You have reached the end of the list in the repository item');
    fetchMore();
  };

  const repository = repositoryItem.repository;
  // console.log('does the query work', repository.reviews.edges);

  const reviews = repository.reviews.edges;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={() => <RepositoryItem repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.8}
    />
  );
};

export default SingleRepository;
