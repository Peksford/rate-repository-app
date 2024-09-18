import { screen, render, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList';

describe('Example', () => {
  it('works', () => {
    expect(1).toBe(1);
  });
});

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here

      render(<RepositoryListContainer data={{ repositories }} />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;
      // screen.debug();

      // First repository item:
      expect(
        within(firstRepositoryItem).getByText('jaredpalmer/formik')
      ).toHaveTextContent('jaredpalmer/formik');

      expect(
        within(firstRepositoryItem).getByText(
          'Build forms in React, without the tears'
        )
      ).toHaveTextContent('Build forms in React, without the tears');

      expect(
        within(firstRepositoryItem).getByText('TypeScript')
      ).toHaveTextContent('TypeScript');

      // Texts and numeric values render correctly:
      const forksCount = within(firstRepositoryItem).getByTestId('forksCount');
      expect(forksCount).toHaveTextContent('1.6k');
      const forksLabel = within(firstRepositoryItem).getByTestId('forksLabel');
      expect(forksLabel).toHaveTextContent('Forks');

      const starCount = within(firstRepositoryItem).getByTestId('starCount');
      expect(starCount).toHaveTextContent('21.9k');
      const starLabel = within(firstRepositoryItem).getByTestId('starLabel');
      expect(starLabel).toHaveTextContent('Stars');

      const ratingAverage =
        within(firstRepositoryItem).getByTestId('ratingAverage');
      expect(ratingAverage).toHaveTextContent('88');
      const averageLabel =
        within(firstRepositoryItem).getByTestId('ratingLabel');
      expect(averageLabel).toHaveTextContent('Rating');

      const reviewCount =
        within(firstRepositoryItem).getByTestId('reviewCount');
      expect(reviewCount).toHaveTextContent('3');
      const reviewLabel =
        within(firstRepositoryItem).getByTestId('reviewLabel');
      expect(reviewLabel).toHaveTextContent('Reviews');

      // second repository item:
      expect(
        within(secondRepositoryItem).getByText('async-library/react-async')
      ).toHaveTextContent('async-library/react-async');

      expect(
        within(secondRepositoryItem).getByText(
          'Flexible promise-based React data loader'
        )
      ).toHaveTextContent('Flexible promise-based React data loader');

      expect(
        within(secondRepositoryItem).getByText('JavaScript')
      ).toHaveTextContent('JavaScript');

      // Texts and numeric values render correctly:
      const forksCount_second =
        within(secondRepositoryItem).getByTestId('forksCount');
      expect(forksCount_second).toHaveTextContent('0.1k');
      const forksLabel_second =
        within(secondRepositoryItem).getByTestId('forksLabel');
      expect(forksLabel_second).toHaveTextContent('Forks');

      const starCount_second =
        within(secondRepositoryItem).getByTestId('starCount');
      expect(starCount_second).toHaveTextContent('1.8k');
      const starLabel_second =
        within(secondRepositoryItem).getByTestId('starLabel');
      expect(starLabel_second).toHaveTextContent('Stars');

      const ratingAverage_second =
        within(secondRepositoryItem).getByTestId('ratingAverage');
      expect(ratingAverage_second).toHaveTextContent('72');
      const averageLabel_second =
        within(secondRepositoryItem).getByTestId('ratingLabel');
      expect(averageLabel_second).toHaveTextContent('Rating');

      const reviewCount_second =
        within(secondRepositoryItem).getByTestId('reviewCount');
      expect(reviewCount_second).toHaveTextContent('3');
      const reviewLabel_second =
        within(secondRepositoryItem).getByTestId('reviewLabel');
      expect(reviewLabel_second).toHaveTextContent('Reviews');

      // expect something from the first and the second repository item
    });
  });
});
