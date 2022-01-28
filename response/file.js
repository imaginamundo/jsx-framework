import { serveFile } from '../deps.js';

export default function responseFile(request, path) {
  return serveFile(request, path);
}
