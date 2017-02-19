import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const getThings = gql`{
query getThings() {
  getThings(limit: 5) {
    uuid
    token
    owner
    component
    name
    registeredAt
  }
}
`;
