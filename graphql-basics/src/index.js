import { GraphQLServer } from "graphql-yoga";

const users = [
  {
    id: "1",
    name: "Ivan",
    email: "test@test.com",
  },
  {
    id: "2",
    name: "Alina",
    email: "test@test.com",
  },
  {
    id: "3",
    name: "Lena",
    email: "test@test.com",
  }
]

const posts = [
  {
    id: '10',
    title: 'Post 1',
    body: 'Body 1',
    published: false,
    author: '1'
  },
  {
    id: '20',
    title: 'Post 2',
    body: 'Body 2',
    published: true,
    author: '1'
  },
  {
    id: '30',
    title: 'Post 3',
    body: 'Body 3',
    published: false,
    author: '2'
  }
]

const comments = [
  {
    id: '100',
    text: 'comment 1',
    author: '1'
  },
  {
    id: '200',
    text: 'comment 2',
    author: '2'
  },
  {
    id: '300',
    text: 'comment 3',
    author: '3'
  },
  {
    id: '400',
    text: 'comment 4',
    author: '1'
  },
]

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
  }
`;

const resolvers = {
  Query: {
    users(_, { query }) {
      if (!query) {
        return users
      }
      return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
    },
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
    },
    posts(_, { query }) {
      if (!query) {
        return posts
      }
      return posts.filter(post => post.title.includes(query) || post.body.includes(query))
    },
    comments() {
      return comments
    }
  },
  Post: {
    author({ author }) {
      return users.find(user => user.id === author)
    }
  },
  User: {
    posts({ id }) {
      return posts.filter(post => post.author === id)
    },
    comments({ id }) {
      return comments.filter(comment => comment.author === id)
    }
  },
  Comment: {
    author({ author }) {
      return users.find(user => user.id === author)
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
