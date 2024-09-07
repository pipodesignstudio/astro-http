
import type { APIRoute } from "astro";

export const GET:APIRoute = async({params, request}) => {
    const person = {
        name: 'Javier',
        age: '31'
    }
    return new Response(JSON.stringify(person), {
        status: 200,
        headers: { 'Content-Type': 'application/json'}
    })
}