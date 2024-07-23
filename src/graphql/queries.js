import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          description
          fullName
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
        }
      }
    }
  }
`;

export const AUTHENTICATE = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const ME = gql`
  {
    me {
      id
      username
    }
  }
`;

// other queries...
// query RepositoryQuery {
//     repositories {
//       edges {
//         node {
//           description,
//           fullName,
//           language,
//           ownerAvatarUrl,
//           ratingAverage,
//           reviewCount,
//           stargazersCount
//         }
//       }
//     }
//   }
