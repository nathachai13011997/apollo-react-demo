import { gql } from '@apollo/client'
// const GET_USERALL = gql`
//   query GetUserAll ($options: PageQueryOptions){
//       users(options: $options){
//         data{
//           id
//           name
//           email
//           phone
//         }
//       }
//     }
// `;

const GET_USERALL = gql`
  query GetUserAll ($page: Int!, $limit: Int! ){
      users(options: { paginate:{limit: $limit, page: $page}}){
        data{
          id
          name
          email
          phone
        }meta{
          totalCount
        }
      }
    }
`;
export default GET_USERALL