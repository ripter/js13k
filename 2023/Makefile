.PHONY: server lint

server: node_modules/
	npx vite

lint: node_modules/
	npx eslint --fix src/

test: node_modules/
	npx jest

node_modules/: package.json
	npm install
	touch node_modules/