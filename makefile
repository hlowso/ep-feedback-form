BROWSERIFY_OPTIONS := -p [ tsify --project tsconfig.json ] -t [ babelify --global --presets [ @babel/preset-env ] ]

build.js: src/songs.json $(wildcard src/client/*)
	npx browserify src/client/index.ts $(BROWSERIFY_OPTIONS) -o build.js

index.html: src/songs.json src/ejs/index.ejs src/ejs/partials/_header.ejs src/ejs/partials/_footer.ejs
	npx ejs src/ejs/index.ejs -f src/songs.json -o index.html

thank-you.html: src/ejs/thank-you.ejs src/ejs/partials/_header.ejs src/ejs/partials/_footer.ejs
	npx ejs src/ejs/thank-you.ejs -o thank-you.html

watch:
	npx watchify src/client/index.ts $(BROWSERIFY_OPTIONS) -o build.js -v

build: build.js index.html thank-you.html

rank:
	@ts-node src/index.ts

test:
	@ts-node ./test.ts

.PHONY: watch build rank test