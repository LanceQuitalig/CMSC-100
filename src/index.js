import { build } from './app.js';

async function start () {
  try {
    const fastify = await build();

    const addr = await fastify.listen({
      port: '8080'
    });
    console.log(`Listening on ${addr}`);
  } catch (error) {
    // Error printing
    console.error(error);
    // Exits program with error code
    process.exit(1);
  }
}

start();
