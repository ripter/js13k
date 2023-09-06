.PHONY: server server_prod lint test build combine_json

server: node_modules/
	npx vite

server_prod: node_modules/
	python3 -m http.server 9000 --directory dist/  

lint: node_modules/
	npx eslint --fix src/

test: node_modules/
	npx jest

build: node_modules/
	npx rollup -c rollup.config.js
	npx cleancss -o dist/all.css public/css/index.css 
	mkdir -p dist/cards
	cp -r public/cards/* dist/cards
	mkdir -p dist/tribes
	cp -r public/tribes/* dist/tribes

combine_json:
	python3 public/combine_json.py

node_modules/: package.json
	npm install
	touch node_modules/
