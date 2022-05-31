import { bold, ensureDir, green, red } from "./deps.js";
import { userPath } from "./keys.js";

export default async function assertFolders() {
  const pageFolder = `${userPath}/pages`;
  const pageFolderExists = await Deno.stat(pageFolder)
    .catch(() => ({ isDirectory: false }));

  if (pageFolderExists.isDirectory) return;

  console.log(
    "\nTo start the project you will need:",
  );
  console.log(
    "\n - ./pages:           the routes folder",
  );
  console.log(
    '\n - ./pages/index.jsx: the route "/"',
  );
  console.log(
    "\n - ./deno.json:       Deno configuration file",
  );
  const createFolder = confirm(
    bold("\nDo you want to create the base for the project?"),
  );

  if (createFolder) {
    const { default: page } = await import("./static/page.js");
    const { default: importMap } = await import("./static/importmap.js");
    const { default: denoConfig } = await import("./static/deno_config.js");

    await ensureDir("./pages");
    await Deno.writeTextFile("./pages/index.jsx", page);
    await Deno.writeTextFile("./importmap.json", importMap);
    await Deno.writeTextFile("./deno.json", denoConfig);
    console.log(
      bold(
        green('\nFiles created, run the command "make run" to run the project'),
      ),
    );
  } else {
    console.log(
      bold(red("\nNo files created, process ended")),
    );
  }

  Deno.exit();
}
