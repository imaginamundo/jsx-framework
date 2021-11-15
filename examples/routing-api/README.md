# Example routing API

Start the project running the command:

```
make
```

You can create an API using the `Response Object`.

In this example we get the parameters from the url and send it back to the user.

`localhost:8080/?hello=world` will return to the user `{"parameters": "hello=world"}`

- `index.jsx`: /
- `route-at-root.jsx`: /route-at-root
- `level/route-at-level.jsx`: /level/route-at-level