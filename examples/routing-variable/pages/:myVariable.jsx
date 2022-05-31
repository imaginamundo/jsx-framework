import { Fragment, h } from "jsx";

export default function ({ url }) {
  const query = url.pathname.groups;
  return <p>Hello {query.myVariable}!</p>;
}
