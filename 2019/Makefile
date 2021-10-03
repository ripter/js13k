.PHONY: all clean build server lint

all: node_modules/
	npm start

lint: node_modules/
	npx eslint --fix src/

build: node_modules/
	npx rollup -c rollup.config.js
	cp src/index.html dist/index.html
	node postbuild.js

server:
	npx http-server dist/

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify

node_modules/: package.json
	npm install
	touch node_modules/
