import Vue from 'vue'
import App from './App.vue'

import ApolloClient from 'apollo-boost' 
import VueApollo from 'vue-apollo'

Vue.use(VueApollo);
const apolloClient = new ApolloClient({
    uri: '/api/query'
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  el: '#app', 
  apolloProvider, render: h => h(App),
})
