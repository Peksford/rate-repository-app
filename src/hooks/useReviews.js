import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useReviews = () => {
  // ...
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true,
    },
    // Other options
  });

  const reviews = data ? data : null;

  return { reviews, loading, error };
};

export default useReviews;
