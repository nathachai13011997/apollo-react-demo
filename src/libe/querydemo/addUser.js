import { gql } from '@apollo/client'
const ADD_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      email
      phone
      username
    }
  }
`;
export default ADD_USER