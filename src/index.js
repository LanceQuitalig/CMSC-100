import Fastify from 'fastify';

async function start () {
    try {
        // Initialize fastify
        const fastify = Fastify({ logger: true });

        fastify.get('/api', async (request, reply) => {
            return { success: true };
        });

        const addr = await fastify.listen({
            port: '8080'
        });

        console.log('Listening on %s', addr);
        
    } catch (error) {
        // Error printing
        console.error(error);
        // Exits program with error code
        process.exit(1);
    }
};

start();