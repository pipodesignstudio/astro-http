

import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";
export const prerender = false;


export const GET:APIRoute = async({params, request}) => {

    const clientId = params.clientId ?? '';

    const result = await db.select().from(Clients).where(eq(Clients.id, +clientId));

    if (result.length === 0) {
        return new Response(JSON.stringify({msg: 'Not user was found'}), {status: 404, headers: {'Content-Type': 'application/json'}});

    }

    return new Response(JSON.stringify(result.at(0)), {status: 200, headers: {'Content-Type': 'application/json'}});
}


export const PATCH:APIRoute = async({params, request}) => {

    const clientId =  params.clientId ?? '';
        
    try {
        const {id, ...body} = await request.json();

        const results =  await db.update(Clients).set({...body})
            .where(eq(Clients.id, +clientId));
        
        const updatedClient = await db.select().from(Clients).where(eq(Clients.id, +clientId));

        return new Response(JSON.stringify(updatedClient), {status: 201, headers: {'Content-Type': 'application/json'}});

    } catch (error) {
        return new Response(JSON.stringify({msg: 'Not body found'}), {status: 201, headers: {'Content-Type': 'application/json'}});
    }
   

}

export const DELETE:APIRoute = async({params, request}) => {


    const clientId = params.clientId ?? '';   

    const {rowsAffected} = await db.delete(Clients).where(eq(Clients.id, +clientId));

    if (rowsAffected > 0) {
        return new Response(JSON.stringify({msg: 'Deleted'}), {status: 200, headers: {'Content-Type': 'application/json'}});

    }
    return new Response(JSON.stringify({msg: 'Not user was found'}), {status: 404, headers: {'Content-Type': 'application/json'}});

}