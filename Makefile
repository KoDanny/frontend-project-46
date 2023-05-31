#Makefile
install: #Установка зависимостей
	npm ci

publish:
	npm publish --dry-run

lint: #Linter
	npx eslint .