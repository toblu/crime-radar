import { gql } from '@apollo/client';

const LOCATIONS_QUERY = gql`
  query GetLocations {
    locations {
      name
    }
  }
`;

export default LOCATIONS_QUERY;
