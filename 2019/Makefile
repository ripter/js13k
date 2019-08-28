.PHONY: all clean build build.webpack build.test lint

all: node_modules/
	npm start

build: node_modules/
	npm run build

lint: node_modules/
	npx eslint --fix src/

build.webpack: build

build.rollup: node_modules/
	npx rollup -c rollup.config.js
	cp src/index.html dist/index.html
	# cp src/sound/* dist/
	npx inline-source dist/index.html dist/index.html
	npx html-minifier --collapse-boolean-attributes --collapse-whitespace --decode-entities --no-html5 --minify-css --minify-js --minify-urls --process-conditional-comments --remove-attribute-quotes --remove-comments --remove-empty-attributes --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-style-link-type-attributes --sort-attributes --use-short-doctype  -o dist/index.html dist/index.html
	node postbuild.js

build.test:
	npx http-server dist/

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify


node_modules/: package.json
	npm install
	touch node_modules/
