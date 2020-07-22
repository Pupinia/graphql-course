import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
  type Query {
    hello(name: String!): String!
    location: String!
    bio: String!
  }
`;

const resolvers = {
  Query: {
    hello(_, { name }) {
      return `Hello ${name || "World"}`;
    },
    location() {
      return "I'am live in Novosibirsk";
    },
    bio() {
      return "I'am 28 year old";
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
