import { ApolloClient, InMemoryCache } from '@apollo/client'
export default new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache()
});
