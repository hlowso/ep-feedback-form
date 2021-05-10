BROWSERIFY_OPTIONS := -p [ tsify --project tsconfig.json ] -t [ babelify --global --presets [ @babel/preset-env ] ]

build.js: src/songs.json $(wildcard src/client/*)
	npx browserify src/client/index.ts $(BROWSERIFY_OPTIONS) -o build.js

index.html: src/songs.json src/ejs/index.ejs 
	npx ejs src/ejs/index.ejs -f src/songs.json -o index.html

watch:
	npx watchify src/client/index.ts $(BROWSERIFY_OPTIONS) -o build.js -v

build: build.js index.html

rank: data.csv
	@ts-node src/index.ts

test:
	@ts-node ./test.ts

data.csv: feedback.csv
	@cat feedback.csv | tr '\n' ',' | gsed 's/ep-feedback.netlify/\n/g' | awk -f select.awk | sort -u > $@

emails: data.csv
	@awk -F ';' '{ print $$4 }' data.csv | sed '/^$$/d'

improve: data.csv
	@awk -F ';' '{ print $$5 }' data.csv | sed '/^$$/d'

uvu:
	@ts-node src/tests/*.ts

.PHONY: watch build rank test emails improve