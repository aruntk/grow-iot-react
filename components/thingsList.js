import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const getThings = gql`{
query getThings() {
  getThings() {
    uuid
    token
    owner
    component
    name
    registeredAt
  }
}
`;
