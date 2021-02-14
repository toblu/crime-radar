import { gql } from '@apollo/client';

export const CURRENT_USER = gql`
  {
    user {
      id
      email
    }
  }
`;
