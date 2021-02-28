import { gql } from '@apollo/client'
const GET_USERID = gql`
  query GeteUserId($id: ID!) {
    user(id: $id) {
      name
      email
      phone
      username
    }
  }
`;
export default GET_USERID