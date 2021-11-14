import routes from './read_routes.js';
import responsePage from './response/page.js';
import responseFile from './response/file.js';

function iterateRoutes(routes, request, type) {
  for (const view of routes) {
    const routeRegEx = `${ view.route }{/}?`;
    const pattern = new URLPattern({ pathname: routeRegEx });

    if (pattern.test(request.url)) {
      const url = pattern.exec(request.url);

      return responsePage({
        request,
        url,
        route: view
      });
    }
  }
}

export function pageRouter(request) {
  const pageResponse = iterateRoutes(routes.pages, request, 'page');
  const parameterizedPageResponse = pageResponse 
    ? undefined
    : iterateRoutes(routes.parameterizedPages, request, 'page');

  return {
    pageResponse,
    parameterizedPageResponse
  };
}

export async function publicRouter(request) {
  for (const file of routes.public) {
    const pattern = new URLPattern({ pathname: file.route });
    if (pattern.test(request.url)) {
      return responseFile(file.path);
    }
  }
}