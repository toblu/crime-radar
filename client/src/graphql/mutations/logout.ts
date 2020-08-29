import { gql } from '@apollo/client';

const LOGOUT = gql`
  mutation {
    logout {
      id
    }
  }
`;

export default LOGOUT;
