import { ensureDir } from './deps.js';

export default async function generateStaticPage(body, route) {
  // Create html path
  let htmlPath = route.path.split('.');
  htmlPath.pop();
  htmlPath = htmlPath.join('.');
  htmlPath = `./.static/${htmlPath}.html`;

  // Ensure html folder
  let htmlDir = htmlPath.split('/');
  htmlDir.pop();
  htmlDir = htmlDir.join('/');
  await ensureDir(htmlDir);

  // Create html
  await Deno.writeTextFile(htmlPath, body);
  console.log(`Static page ${route.path} generated`);

  return htmlPath;
}
