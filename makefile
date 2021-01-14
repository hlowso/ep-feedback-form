BROWSERIFY_OPTIONS := -p [ tsify --project tsconfig.json ]

build.js: $(wildcard src/*)
	npm i
	browserify src/index.ts $(BROWSERIFY_OPTIONS) -o build.js

watch:
	watchify src/index.ts $(BROWSERIFY_OPTIONS) -o build.js -v

.PHONY: watch