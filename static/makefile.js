import { name, version } from '../keys.js';


const makefile = 
`run:
	deno run --allow-read --allow-net --unstable --import-map=import_map.json https://raw.githubusercontent.com/imaginamundo/${ name }/${ version }/mod.js
	
reload:
	deno cache --reload --unstable https://raw.githubusercontent.com/imaginamundo/${ name }/${ version }/mod.js`;

export default makefile;