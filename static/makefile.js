import { name, version } from '../keys.js';

const makefile = `VERSION=${version}

run:
	deno run --allow-read --allow-net --unstable --import-map=import_map.json https://raw.githubusercontent.com/imaginamundo/${name}/$(VERSION)/mod.js
	
reload:
	deno cache --reload --unstable https://raw.githubusercontent.com/imaginamundo/${name}/$(VERSION) version }/mod.js`;

export default makefile;
