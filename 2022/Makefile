.PHONY: all clean build server.compressed lint server

all: node_modules/
	npm start

lint: node_modules/
	npx eslint --fix src/

build: node_modules/
	npx rollup -c rollup.config.js

server.dist:
	npx http-server dist/

server:
	npx http-server src/ -o

clean:
	-rm -f package-lock.json
	-rm -r ./node_modules
	-npm cache verify


node_modules/: package.json
	npm install
	touch node_modules/
