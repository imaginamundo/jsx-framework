import { userPath } from "./keys.js";

const userDocument = `file://${userPath}/pages/_document.jsx`;

const { default: customDocument } = await import(userDocument).catch(
  () => ({}),
);
const { default: fallbackDocument } = await import("./static/document.jsx");

const document = customDocument || fallbackDocument;

export default document;
