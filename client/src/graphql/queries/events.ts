import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query GetEvents(
    $limit: Int
    $type: [String]
    $location: [String]
    $from: String
    $to: String
  ) {
    events(
      limit: $limit
      type: $type
      location: $location
      from: $from
      to: $to
    ) {
      remoteId
      type
      summary
      url
      datetime
      location {
        name
        gps
      }
    }
  }
`;
