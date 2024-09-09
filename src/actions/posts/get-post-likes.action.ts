import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { BlogPosts, db, eq } from "astro:db";

export const getPostLikes = defineAction({
    accept: 'json',
    input: z.string(),
    handler: async (postId) => {
      const posts = await db.select().from(BlogPosts).where(eq(BlogPosts.id, postId));
  
      return {
        likes: posts.at(0)?.likes ?? 0,
      };
    },
  });