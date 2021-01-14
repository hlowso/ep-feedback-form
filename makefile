BROWSERIFY_OPTIONS := -p [ tsify --project tsconfig.json ]

build.js: $(wildcard src/*)
	browserify src/index.ts $(BROWSERIFY_OPTIONS) -o build.js

watch:
	watchify src/index.ts $(BROWSERIFY_OPTIONS) -o build.js -v

.PHONY: watch