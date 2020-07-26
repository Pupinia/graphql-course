export default {
  author({ author }, _, { db }) {
    return db.users.find((user) => user.id === author);
  },
  comments({ id }, _, { db }) {
    return db.comments.filter((comment) => comment.postId === id);
  },
};
