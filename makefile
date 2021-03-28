BROWSERIFY_OPTIONS := -p [ tsify --project tsconfig.json ]

build.js: src/songs.json $(wildcard src/ts/*)
	npx browserify src/ts/index.ts $(BROWSERIFY_OPTIONS) -o build.js

index.html: src/songs.json src/ejs/index.ejs
	npx ejs src/ejs/index.ejs -f src/songs.json -o index.html

watch:
	npx watchify src/ts/index.ts $(BROWSERIFY_OPTIONS) -o build.js -v

build: build.js index.html

.PHONY: watch build