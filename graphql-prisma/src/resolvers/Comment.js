export default {
  author({ author }, _, { db }) {
    return db.users.find((user) => user.id === author);
  },
  post({ postId }, _, { db }) {
    return db.posts.find((post) => post.id === postId);
  },
};
