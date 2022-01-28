import { Fragment, h } from 'jsx';

export default function Document({ children, head = null }) {
  return (
    <html lang='en'>
      <head>
        <meta charset='UTF-8' />
        {head}
      </head>
      <body>
        <main>
          <p>I'm using a custom document!</p>
          { children }
        </main>
      </body>
    </html>
  );
}
