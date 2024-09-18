import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ME } from '../graphql/queries';

export const useDeleteReview = () => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [ME, 'getCurrentUser'],
  });

  const handleDeleteReview = async (id) => {
    try {
      await deleteReview({ variables: { deleteReviewId: id } });
      console.log('Review deleted succesfully');
    } catch (error) {
      console.error('Error deleting: ', error);
    }
  };

  return handleDeleteReview;
};
