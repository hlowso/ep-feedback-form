build.js: $(wildcard src/*)
	browserify src/index.ts -p [ tsify --project tsconfig.json ] -o build.js