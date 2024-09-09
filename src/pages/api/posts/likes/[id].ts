
import type { APIRoute } from "astro";
import { BlogPosts, db, eq, like } from "astro:db";
export const prerender = false;


export const GET:APIRoute = async({params, request}) => {

    const postId = params.id ?? '';

    const posts = await db.select().from(BlogPosts).where(eq(BlogPosts.id, postId));

    if (posts.length === 0) { 
        const post = {
            id: postId,
            title: 'Post not found',
            likes: 0
        } 

        return new Response(JSON.stringify(post), {status: 200, headers: {'Content-Type': 'application/json'}})
    }
    

    return new Response(JSON.stringify(posts.at(0)), {status: 200, headers: {'Content-Type': 'application/json'}})

}


export const PUT:APIRoute = async({params, request}) => {
    const postId = params.id ?? '';

    const posts = await db.select().from(BlogPosts).where(eq(BlogPosts.id, postId));

    const {likes = 0} = await request.json()

    if (posts.length === 0) {
        const newPost = {
            id: postId,
            title: 'Post not found',
            likes: 0
        }

        await db.insert(BlogPosts).values(newPost)
        posts.push(newPost);
    }

    const post = posts.at(0)!;

    post.likes = post.likes +likes;

    await db.update(BlogPosts).set(post).where(eq(BlogPosts.id, postId));


    return new Response('Ok', {status: 200})
}