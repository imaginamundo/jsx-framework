import { renderToString } from '../deps.js';
import { userPath } from '../keys.js';
import document from '../document.js';
import { internalServerErrorResponse, okResponse } from '../response/default.js';

export default async function responsePage({ request, url, route }) {
  // Import files
  const {
    default: page,
    head   = () => null
  } = await import(`file://${ userPath }/${ route.path }`);

  // Execute exports
  const Head   = head();
  
  // Execute default exports
  let Page;
  let Document;
  try {
    Page = await page({ request, url });
    Document = await document({
      children: Page,
      head: Head
    });
  } catch(err) {
    return internalServerErrorResponse({ body: err.stack })
  }

  if (Page instanceof Response) return Page;

  // Transform JSX to string
  const body = await renderToString(Document);
  const options = {
    headers: new Headers({ 'content-type': 'text/html; charset=UTF-8' })
  };

  return okResponse({ body, options });
}
