import { gql } from '@apollo/client';

export const GET_EVENT = gql`
    query GetEvent($id: String!) {
        event(id: $id) {
            type
            name
            summary
            content
            url
            datetime
            location {
                name
                gps
            }
        }
    }
`;
