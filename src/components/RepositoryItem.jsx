import { View, Image, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
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
  box: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // textSubheading: {
  //   fontSize: theme.fontSizes.subheading,
  //   fontWeight: theme.fontWeights.bold,
  // },
  // textSecondary: {
  //   color: theme.colors.textSecondary,
  // },
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

const RepositoryItem = ({ item }) => (
  <View style={styles.flexContainer}>
    <View style={styles.flexItemA}>
      <Image style={styles.logo} source={{ uri: `${item.ownerAvatarUrl}` }} />
      <View style={styles.flexItemB}>
        <Text fontSize={'subheading'} fontWeight={'bold'}>
          {item.fullName}
        </Text>
        <View style={styles.flexItemC}>
          <Text color={'textSecondary'}>{item.description}</Text>
        </View>
      </View>
    </View>
    <View style={styles.flexItemD}>
      <Text style={styles.textLanguage}>{item.language} </Text>
    </View>
    <View style={styles.flexItemE}>
      <View style={styles.box}>
        <Text fontWeight={'bold'}>
          {Math.round((item.stargazersCount / 1000) * 10) / 10}k
        </Text>
        <Text color={'textSecondary'}>Stars</Text>
      </View>
      <View style={styles.box}>
        <Text fontWeight={'bold'}>
          {Math.round((item.forksCount / 1000) * 10) / 10}k
        </Text>
        <Text color={'textSecondary'}>Forks</Text>
      </View>
      <View style={styles.box}>
        <Text fontWeight={'bold'}>{item.reviewCount}</Text>
        <Text color={'textSecondary'}>Reviews</Text>
      </View>
      <View style={styles.box}>
        <Text fontWeight={'bold'}>{item.ratingAverage}</Text>
        <Text color={'textSecondary'}>Rating</Text>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
