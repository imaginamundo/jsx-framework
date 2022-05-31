import { version } from "../keys.js";

export default `{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  },
  "importMap": "./importmap.json",
  "tasks": {
    "start": "deno run --allow-net --allow-read --allow-write https://raw.githubusercontent.com/imaginamundo/jsx-framework/${version}/mod.js"
  }
}`;
