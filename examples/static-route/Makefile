VERSION=v0.0.2

run:
	deno run --allow-read --allow-net  --allow-write --unstable --import-map=import_map.json https://raw.githubusercontent.com/imaginamundo/jsx-framework/$(VERSION)/mod.js
	
reload:
	deno cache --reload --unstable https://raw.githubusercontent.com/imaginamundo/jsx-framework/$(VERSION)/mod.js