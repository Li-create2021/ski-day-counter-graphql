const { ApolloServer, gql } = require("apollo-server");

//type definitions aka our schema - gql function - takes our schema string and turn it into an abstract syntax (takes the string and turn it into an object for easier parsing)
// 1. create schema type "query" would be the wrapper around all queries available on API
const typeDefs = gql`
    type Query {
        totalDays: Int!
    }
`;

//functions that will return data for our schema
const resolvers = {

};

//Apollo server instance: takes 2 arg: typeDefs and resolvers
const server = new ApolloServer({
    typeDefs,
    mocks: true
});

//call the server to listen
server.listen().then(({ url }) =>
    console.log(`Server running at ${url}`)
);