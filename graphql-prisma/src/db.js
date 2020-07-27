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
  },
];

const posts = [
  {
    id: "10",
    title: "Post 1",
    body: "Body 1",
    published: true,
    author: "1",
  },
  {
    id: "20",
    title: "Post 2",
    body: "Body 2",
    published: true,
    author: "1",
  },
  {
    id: "30",
    title: "Post 3",
    body: "Body 3",
    published: false,
    author: "2",
  },
];

const comments = [
  {
    id: "100",
    text: "comment 1",
    author: "1",
    postId: "10",
  },
  {
    id: "200",
    text: "comment 2",
    author: "2",
    postId: "20",
  },
  {
    id: "300",
    text: "comment 3",
    author: "3",
    postId: "30",
  },
  {
    id: "400",
    text: "comment 4",
    author: "1",
    postId: "10",
  },
];

export default {
  users,
  posts,
  comments,
};
