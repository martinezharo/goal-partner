// Pages Functions keep the waitlist endpoint on Pages while Astro builds only
// static HTML. Bindings are supplied by Pages, without an Astro server adapter.
type WaitlistContext = {
    request: Request;
    env: { WAITLIST?: { put(key: string, value: string): Promise<void> } };
};

export const onRequestPost = async ({ request, env }: WaitlistContext) => {
    try {
        const data = await request.json();
        const { email, age, sex, comment } = data;

        if (!email) {
            return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
        }

        if (!env.WAITLIST) {
            console.error('Cloudflare KV WAITLIST not found');
            // Preserve the existing local simulation when no KV binding is available.
            return new Response(JSON.stringify({ message: 'Success (simulation mode)' }), { status: 200 });
        }

        const entry = {
            email,
            age,
            sex,
            comment,
            timestamp: new Date().toISOString()
        };

        // Store the entry under its email key.
        await env.WAITLIST.put(email, JSON.stringify(entry));

        return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
    } catch (error) {
        console.error('Error in API route:', error);
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};
