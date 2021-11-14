import { walk } from './deps.js';
import { userPath } from './keys.js';
import { routeFromPath, publicRouteFromPath }  from './route_from_path.js';

const routes = {
  pages: [],
  apis: [],
  public: [],
  parameterizedPages: [],
  parameterizedApis: []
};

function verifyParameter(fullPath) {
  let parameter = false;

  const splittedPath = fullPath.substring(6).split('/');
  for (const path of splittedPath) {
    if (path.startsWith(':')) {
      parameter = true;
      break;
    }
  }

  return parameter;
}

// Generate routes for pages
const pagePath = 'pages';
const pageOptions = { skip: [ 'pages/_document.jsx' ] };
const pageFolder = `${ userPath }/pages`;
const pageFolderExists = await Deno.stat(pageFolder).catch(() => false);

if (pageFolderExists) {
  for await (const entry of walk(pagePath, pageOptions)) {
    if (entry.isDirectory) continue;
  
    const route = {
      path: entry.path,
      name: entry.name,
      route: routeFromPath(entry.path)
    };
  
    const parameter = verifyParameter(entry.path);
    
    if (parameter) {
      routes.parameterizedPages.push(route);
    } else {
      routes.pages.push(route);
    }
  }
}

// Generate routes for Public
const publicFolder = `${ userPath }/public`;
const publicFolderExists = await Deno.stat(publicFolder).catch(() => false);

if (publicFolderExists) {
  for await (const entry of walk('./public')) {
    if (entry.isDirectory) continue;
  
    routes.public.push({
      path: entry.path,
      name: entry.name,
      route: publicRouteFromPath(entry.path)
    });
  }
}

export default routes;