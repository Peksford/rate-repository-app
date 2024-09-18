import { GET_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositoryItem = (variables) => {
  const { data, loading, fetchMore, error, refetch } = useQuery(
    GET_REPOSITORY,
    {
      variables,
      fetchPolicy: 'cache-and-network',
      pollInterval: 2000,
      // Other options
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositoryItem = data ? data : null;

  return {
    repositoryItem,
    fetchMore: handleFetchMore,
    loading,
    error,
    refetch,
  };
};

export default useRepositoryItem;
