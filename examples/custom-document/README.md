# Example custom document

You can have a custom document by creating a file named `_document.jsx` inside the folder `pages`.

The default structure for the document is:

``` javascript
/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from 'jsx';

export default function Document({ children, head = null }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        { head }
      </head>
      <body>
        { children }
      </body>
    </html>
  );
}
```
