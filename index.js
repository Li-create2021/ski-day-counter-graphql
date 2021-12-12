const {
    ApolloServer,
    gql,
    MockList
} = require("apollo-server");

//type definitions aka our schema - gql function - takes our schema string and turn it into an abstract syntax (takes the string and turn it into an object for easier parsing)
// 1. create schema type "query" would be the wrapper around all queries available on API
//2. define first object type
//scalar types are customized to the type your using
const typeDefs = gql`
    scalar  Date

    """
    An object that describes the characteristics of a ski day
    """

    type SkiDay{
        "A ski day's unique identifier"
        id: ID!
        "The date that a ski day occurred"
        date: Date!
        "The location where the ski day occurred"
        mountain: String!
        "The shape the snow was in when the ski day happened"
        conditions: Conditions
    }

    enum Conditions {
        POWDER
        HEAVY
        ICE
        THIN
    }

    type Query {
        totalDays: Int!
        allDays: [SkiDay!]!
    }

    input AddDayInput {
        date: String!
        mountain: String!
        conditions: Conditions
    }

    type RemoveDayPayload {
        day: SkiDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    type Mutation {
        addDay(input: AddDayInput!): SkiDay
        removeDay(id: ID!): RemoveDayPayload!
    }

    type Subscription {
        newDay: SkiDay!
    }
`;

//functions that will return data for our schema
// const resolvers = {

// };

//definte mocks which will be an object that will define all of these various types 
const mocks = {
    Date: () => "1/2/2025",
    String: () => "Cool Data",
    Query: () => ({
        allDays: () => new MockList([1, 15]) //it will always return 2 as a default 
    })
};

//Apollo server instance: takes 2 arg: typeDefs and resolvers
const server = new ApolloServer({
    typeDefs,
    mocks
});

//call the server to listen
server.listen()
    .then(({ url }) =>
        console.log(`Server running at ${url}`)
    );