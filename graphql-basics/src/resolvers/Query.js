export default {
  users(_, { query }, { db }) {
    if (!query) {
      return db.users;
    }
    return db.users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
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
      id: "12312",
      title: "My post",
      body: "My post body",
      published: true,
    };
  },
  posts(_, { query }, { db }) {
    if (!query) {
      return db.posts;
    }
    return db.posts.filter(
      (post) => post.title.includes(query) || post.body.includes(query)
    );
  },
  comments(parent, args, { db }) {
    return db.comments;
  },
};
