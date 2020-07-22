import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`;

const resolvers = {
  Query: {
    title() {
      return "Book";
    },
    price() {
      return 20.99;
    },
    releaseYear() {
      return 1991;
    },
    rating() {
      return 3.5;
    },
    inStock() {
      return true;
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
