import { GraphQLServer } from "graphql-yoga";

const typeDefs = `
  type Query {
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        id: "213",
        name: "Ivan",
        email: "test@test.com",
      };
    },
    post() {
      return {
        id: '12312',
        title: 'My post',
        body: 'My post body',
        published: true
      }
    }
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
