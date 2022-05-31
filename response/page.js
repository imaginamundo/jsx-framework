import { renderToString } from "../deps.js";
import { userPath } from "../keys.js";
import document from "../document.js";
import { internalServerErrorResponse, okResponse } from "./default.js";
import responseFile from "./file.js";
import generateStaticPage from "../generate_static_page.js";

export default async function responsePage({ request, url, route }) {
  // Send static HTML before trying to fetch page
  if (route.staticPage) {
    console.log(`Using generated file ${route.staticPage}`);
    return responseFile(request, route.staticPage);
  }

  // Import files
  const {
    default: page,
    staticPage,
    head = () => null,
  } = await import(`file://${userPath}/${route.path}`);

  // Execute exports
  const Head = head();

  // Execute default exports
  let Page;
  let Document;
  try {
    Page = await page({ request, url });
    Document = await document({
      children: Page,
      head: Head,
    });
  } catch (err) {
    return internalServerErrorResponse({ body: err.stack });
  }

  if (Page instanceof Response) return Page;

  // Transform JSX to string
  const body = await renderToString(Document);
  const options = {
    headers: new Headers({ "content-type": "text/html; charset=UTF-8" }),
  };

  // Generate static page
  if (staticPage && !route.staticPage) {
    const htmlPath = await generateStaticPage(body, route);
    route.staticPage = htmlPath;
  }

  // Send dynamic page
  return okResponse({ body, options });
}
