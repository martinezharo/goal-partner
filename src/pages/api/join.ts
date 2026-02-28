export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const data = await request.json();
        const { email, age, sex, comment } = data;

        if (!email) {
            return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
        }

        // @ts-ignore - Cloudflare runtime locals
        const runtime = locals.runtime;

        if (!runtime || !runtime.env || !runtime.env.WAITLIST) {
            console.error('Cloudflare KV WAITLIST not found');
            // En desarrollo o si no está configurado, simulamos éxito para no romper la landing
            return new Response(JSON.stringify({ message: 'Success (simulation mode)' }), { status: 200 });
        }

        const entry = {
            email,
            age,
            sex,
            comment,
            timestamp: new Date().toISOString()
        };

        // Guardamos en KV usando el email como clave
        await runtime.env.WAITLIST.put(email, JSON.stringify(entry));

        return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
    } catch (error) {
        console.error('Error in API route:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
