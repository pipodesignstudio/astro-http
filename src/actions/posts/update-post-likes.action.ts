import { defineAction } from 'astro:actions';
import { z } from "astro/zod";
import { BlogPosts, db, eq } from 'astro:db';

export const updatePostsLikes = defineAction({
  accept: 'json',
  input: z.object({
    postId: z.string(),
    likes: z.number(),
  }),
  handler: async ({ postId, likes }) => {
    const posts = await db.select().from(BlogPosts).where(eq(BlogPosts.id, postId));

    if (posts.length === 0) {
      const newPost = {
        id: postId,
        title: 'Post not found',
        likes: 0,
      };

      await db.insert(BlogPosts).values(newPost);
      posts.push(newPost);
    }

    const post = posts.at(0)!;
    post.likes = post.likes + likes;

    await db.update(BlogPosts).set(post).where(eq(BlogPosts.id, postId));

    // throw new Error('No se pudo cargar el post');

    return true;
  },
});