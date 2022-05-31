# JSX Framework

A project to make easy to create a server side rendering (SSR) with only one
command and a few files.

## Features

- Built on **Deno 1.22.1** and above!
- Folder based routes (a là [Next.js](https://nextjs.org))
- API Routes

## Simple installation

To create the folders and files automatically, you can run the command on the
folder that you want the project to be:

```shell
deno run --allow-read --allow-net --allow-write --unstable https://raw.githubusercontent.com/imaginamundo/jsx-framework/v0.0.4/mod.js
```

After running, this command you create a Makefile for you, you can execute it by
typping:

```
deno task start
```

## Manual Installation

Create the folders to the directory:

```
project
 ┣ pages
 ┃ ┗ index.jsx
 ┣ deno.json
 ┗ importmap.json
```

The `importmap.json` will be where we will put our dependencies:

```json
{
  "imports": {
    "jsx": "https://deno.land/x/jsx@v0.1.5/mod.ts"
  }
}
```

The `index.jsx` file will be an functional JSX component:

```javascript
import { Fragment, h } from "jsx";

export default function () {
  return <p>Hello world!</p>;
}
```

`deno.json` will set the default configurations to the project work as intended


```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  },
  "importMap": "./importmap.json",
  "tasks": {
    "start": "deno run --allow-net --allow-read --allow-write https://raw.githubusercontent.com/imaginamundo/jsx-framework/v0.4.0/mod.js"
  }
}
```

After we create our folders and files, we just need to run the following
command:

```
deno task start
```

Whe are running the main file of this repository to walk the folders and see
which page to render. It will render on http://localhost:8080.

## Documentation

### Routing

#### Basics

We use the folder `page` to create ou routing system.

If you create an file `index.jsx` on the folder `pages`, it will create a route
`/`.

You can put inside a folder to create the route, if you create the file
`world.jsx` inside the folder `pages/hello`, it will give the route
`/hello/world`.

#### URL Parameters

If you create a file inside `pages` starting with the character `:`, you will
receive the name of the file as an variable.

The system uses
[URL Pattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) to
generate his routes, so anything that you would use on URL Pattern will work on
the filename.

Creating the file `:pokemon.jsx` inside the folder `pages`, you will receive the
`pokemon` variable inside.

You can get the variable with the parameter from the exported page:

```javascript
import { Fragment, h } from "jsx";

export default function ({ url }) {
  const { pokemon } = url.pathname.groups;

  return <p>Pokemon name: {pokemon}</p>;
}
```

So if you enter on the page `http://localhost:8080/bulbasaur`, it will return a
paragraph with the text **Pokemon name: bulbasaur**.

The url parameter on the page function will return the result from URL Pattern
exec, that is:

```javascript
{
  inputs: [ "http://localhost:8080/bulbasaur" ],
  protocol: { input: "http", groups: { "0": "http" } },
  username: { input: "", groups: { "0": "" } },
  password: { input: "", groups: { "0": "" } },
  hostname: { input: "localhost", groups: { "0": "localhost" } },
  port: { input: "8080", groups: { "0": "8080" } },
  pathname: { input: "/bulbasaur", groups: { pokemon: "bulbasaur" } },
  search: { input: "", groups: { "0": "" } },
  hash: { input: "", groups: { "0": "" } }
}
```

### Static files

You can create static files by creating a folder called `public` at the root of
your project. Every file on this folder will be a route for your server. If you
create an file `readme.txt` inside that folder `public`, you can access this on
your server via `/readme.txt`.

You can also create folders and the routing system will respect your route to
serve your files. The file `public/test/naruto.jpg` can be seen at the route
`/test/naruto.jpg`.

### Custom html inside `head` tag

To add a custom tag on `head` html, you can export a function called `head`
inside your page.

```javascript
import { Fragment, h } from "jsx";

export default function () {
  return <p>Hello world!</p>;
}

export function head() {
  return <title>🌎</title>;
}
```

### Request Object

Despite the `url` parameter that you have access inside the page function, you
will also have access to the `request` object.

To see what the `request` object can give you, here is an example:

```javascript
import { Fragment, h } from "jsx";

export default function ({ request, url }) {
  const { pokemon } = url.pathname.groups;

  console.log(request);

  return <p>Pokemon name: {pokemon}</p>;
}
```

On the console it will print (or something similar, depending from where you are
doing the request):

```
Request {
  bodyUsed: false,
  headers: Headers {
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-encoding": "gzip, deflate",
  "accept-language": "en-CA,en-US;q=0.9,en;q=0.8",
  connection: "keep-alive",
  host: "localhost:8080",
  "upgrade-insecure-requests": "1",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15...."
},
  method: "GET",
  redirect: "follow",
  url: "http://localhost:8080/bulbasaur"
}
```

**IMPORTANT: The request object is the same as document on
[MDN Request](https://developer.mozilla.org/en-US/docs/Web/API/Request), you can
request the same information as documented there.**

### Fetching data on the server

You can fetch data on the simples way, just use fetch to get your resources an
await it before responding the JSX:

```javascript
import { Fragment, h } from "jsx";

export default async function () {
  const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/1")
    .then((res) => res.json());

  return <p>{pokemon.name}!</p>;
}
```

We have to use an `async function` and `await` the promise respond. This will
retrieve the data from PokeApi, and use it inside the JSX.

### Static pages

Static pages its a mode that will generate a HTML of that page. If you page make
an request, it will only get that request at the first time the page loads, and
after that will stream the html saved.

To create an static page you need to export a variable
`const staticPage = true;` on the page you want that to happen.

```javascript
import { Fragment, h } from "jsx";

export default function () {
  return <p>Hello Static!</p>;
}

export const staticPage = true;
```

This will generate an HTML of that page.

### Creating an API (or responding something else than HTML)

We can respond anything else that we want. To do this, intead of returning JSX
on the page function, we just return a `new Request`.

You can see how it works:

```javascript
export default function () {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = { hello: "world!" };
  const init = {
    status: 200,
    headers,
  };

  return new Response(JSON.stringify(body), init);
}
```

As you see in the code above, it will return a JSON with the content
`{ hello: 'world!' }`.

You can see
[the documentation to the Response object on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response).

### Custom document

A custom document is the HTML where the pages will be located inside, by default
we use a document like this:

```javascript
import { Fragment, h } from "jsx";

export default function Document({ children, head = null }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {head}
        {script}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

#### Variables:

**child:** It will render each route create inside the `pages` folder on this
variable.

**head:** It will render the function `head` inside pages that are used to
populate the `head` tag.

If you create a file `_document.jsx` inside the folder `pages` you can overwrite
the default document that we use to render the pages.

## Future

- [ ] Tests, please 🥺;
- [ ] Custom error page;
- [ ] Explicit routes;

## Acknowledgements

- [Deno.land](https://deno.land)
- [Deno JSX](https://github.com/dyedgreen/deno-jsx)

## Authors

- [@imaginamundo](https://www.github.com/imaginamundo)
