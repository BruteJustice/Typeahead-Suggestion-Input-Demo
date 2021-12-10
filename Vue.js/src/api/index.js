import {ApolloClient,
  createHttpLink,
InMemoryCache
} from "@apollo/client/core";


const httpLink = createHttpLink({
  url: 'http://localhost:3000/query'
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export default apolloClient