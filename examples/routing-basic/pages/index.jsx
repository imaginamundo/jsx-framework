import { Fragment, h } from 'jsx';

export default function () {
  return (
    <>
      <p>Hello world!</p>
      <nav>
        <ul>
          <li>
            <a href='/route-at-root'>
              <pre>/route-at-root</pre>
            </a>
          </li>
          <li>
            <a href='/level/route-at-level'>
              <pre>/level/route-at-level</pre>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
