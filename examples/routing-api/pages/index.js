export default function ({ url }) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = { parameters: url.search.input };

  const init = {
    status: 200,
    headers,
  };

  return new Response(JSON.stringify(body), init);
}
