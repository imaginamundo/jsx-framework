import { serve } from './deps.js';
import { pageRouter, publicRouter } from './router.js';
import {
  internalServerErrorResponse,
  notFoundResponse,
} from './response/default.js';

const port = 8080;

async function handler(request) {
  try {
    const { pageResponse, parameterizedPageResponse } = await pageRouter(
      request,
    );
    const publicResponse = pageResponse
      ? undefined
      : await publicRouter(request);

    // Return in order of priority
    return (
      pageResponse ||
      publicResponse ||
      parameterizedPageResponse ||
      notFoundResponse()
    );
  } catch (err) {
    return internalServerErrorResponse({ body: err.stack });
  }
}

export default async function server() {
  console.log(`HTTP server running. Access it at: http://localhost:${port}/`);
  await serve(handler, { port });
}
