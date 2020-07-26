export default {
  posts({ id }, _, { db }) {
    return db.posts.filter((post) => post.author === id);
  },
  comments({ id }, _, { db }) {
    return db.comments.filter((comment) => comment.author === id);
  },
};
