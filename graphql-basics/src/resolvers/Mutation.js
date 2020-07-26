import { v4 as uuidv4 } from "uuid";

export default {
  createUser(_, args, { db }) {
    const { name, email, age } = args.data;
    const emailTaken = db.users.some((user) => user.email === email);
    if (emailTaken) {
      throw new Error("Email taken");
    }
    const newUser = {
      id: uuidv4(),
      name,
      email,
      age,
    };
    db.users.push(newUser);
    return newUser;
  },
  deleteUser(_, { id }, { db }) {
    const userIndex = db.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const deletedUser = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author === id;

      if (match) {
        db.comments = db.comments.filter(
          (comment) => comment.postId !== post.id
        );
      }

      return !match;
    });
    db.comments = db.comments.filter((comment) => comment.author !== id);

    return deletedUser[0];
  },
  updateUser(_, { id, data }, { db }) {
    const { name, email, age } = data;
    const user = db.users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }

    if (typeof email === "string") {
      const emailTaken = db.users.some((user) => user.email === email);
      if (emailTaken) {
        throw new Error("Email taken");
      }

      user.email = email;
    }

    if (typeof name === "string") {
      user.name = name;
    }

    if (typeof age !== "undefined") {
      user.age = age;
    }

    return user;
  },
  createPost(_, args, { db }) {
    const { author, title, body, published } = args.data;
    const userExists = db.users.some((user) => user.id === author);

    if (!userExists) {
      throw new Error("User not found");
    }

    const post = {
      id: uuidv4(),
      title,
      body,
      published,
      author,
    };

    db.posts.push(post);

    return post;
  },
  deletePost(_, { id }, { db }) {
    const postIndex = db.posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      throw new Error("Post not found");
    }

    const deletedPosts = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter((comment) => comment.postId !== id);

    return deletedPosts[0];
  },
  updatePost(_, { id, data }, { db }) {
    const { title, body, published } = data;

    const post = db.posts.find((post) => post.id === id);

    if (!post) {
      throw new Error("Post not found");
    }

    if (typeof title === "string") {
      post.title = title;
    }

    if (typeof body === "string") {
      post.body = body;
    }

    if (typeof published === "boolean") {
      post.published = published;
    }

    return post;
  },
  createComment(_, args, { db }) {
    const { text, author, postId } = args.data;
    const userExists = db.users.some((user) => user.id === author);
    const postExists = db.posts.some(
      (post) => post.id === postId && post.published
    );

    if (!userExists) {
      throw new Error("User not found");
    }

    if (!postExists) {
      throw new Error("Post not found");
    }

    const comment = {
      id: uuidv4(),
      text,
      author,
      postId,
    };

    db.comments.push(comment);

    return comment;
  },
  deleteComment(_, { id }, { db }) {
    const commentIndex = db.comments.findIndex((comment) => comment.id == id);

    if (commentIndex === -1) {
      throw new Error("Comment not found");
    }

    const deletedComments = db.comments.splice(commentIndex, 1);

    return deletedComments[0];
  },
  updateComment(_, { id, data }, { db }) {
    const { text } = data;

    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) {
      throw new Error("Comment not found!");
    }

    if (typeof text === "string") {
      comment.text = text;
    }

    return comment;
  },
};
