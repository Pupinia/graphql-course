import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from 'uuid';

let users = [
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

let posts = [
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

let comments = [
  {
    id: '100',
    text: 'comment 1',
    author: '1',
    postId: '10'
  },
  {
    id: '200',
    text: 'comment 2',
    author: '2',
    postId: '20'
  },
  {
    id: '300',
    text: 'comment 3',
    author: '3',
    postId: '30'
  },
  {
    id: '400',
    text: 'comment 4',
    author: '1',
    postId: '10'
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

  type Mutation {
    createUser(data: CreateUserInput!): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput!): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: String!
    postId: String!
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
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
  Mutation: {
    createUser(_, args) {
      const { name, email, age } = args.data
      const emailTaken = users.some(user => user.email === email)
      if (emailTaken) {
        throw new Error('Email taken')
      }
      const newUser = {
        id: uuidv4(),
        name,
        email,
        age
      }
      users.push(newUser)
      return newUser
    },
    deleteUser(_, { id }) {
      const userIndex = users.findIndex(user => user.id === id)

      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const deletedUser = users.splice(userIndex, 1)

      posts = posts.filter(post => {
        const match = posts.author === id

        if (match) {
          comments = comments.filter(comment => comment.postId !== post.id)
        }

        return !match
      })
      comments = comments.filter(comment => comment.author !== id)

      return deletedUser[0]
    },
    createPost(_, args) {
      const { author, title, body, published, } = args.data
      const userExists = users.some(user => user.id === author)

      if (!userExists) {
        throw new Error('User not found')
      }

      const post = {
        id: uuidv4(),
        title,
        body,
        published,
        author
      }

      posts.push(post)

      return post
    },
    deletePost(_, { id }) {
      const postIndex = posts.findIndex(post => post.id === id)

      if (postIndex === -1) {
        throw new Error('Post not found')
      }

      const deletedPosts = posts.splice(postIndex, 1)
      comments = comments.filter(comment => comment.postId !== id)

      return deletedPosts[0]
    },
    createComment(_, args) {
      const { text, author, postId } = args.data
      const userExists = users.some(user => user.id === author)
      const postExists = posts.some(post => post.id === postId && post.published)

      if (!userExists) {
        throw new Error('User not found')
      }

      if (!postExists) {
        throw new Error('Post not found')
      }

      const comment = {
        id: uuidv4(),
        text,
        author,
        postId
      }

      comments.push(comment)

      return comment;
    },
    deleteComment(_, { id }) {
      const commentIndex = comments.findIndex(comment => comment.id == id)

      if (commentIndex === -1) {
        throw new Error('Comment not found')
      }

      const deletedComments = comments.splice(commentIndex, 1)

      return deletedComments[0]
    }
  },
  Post: {
    author({ author }) {
      return users.find(user => user.id === author)
    },
    comments({ id }) {
      return comments.filter(comment => comment.postId === id)
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
    },
    post({ postId }) {
      return posts.find(post => post.id === postId)
    }
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
