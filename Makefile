install:
	npm install && yarn install

app-bash:
	docker-compose run --rm --service-ports web /bin/bash

lint:
	./node_modules/.bin/eslint app/assets/javascripts/

lint-fix:
	./node_modules/.bin/eslint --fix app/assets/javascripts/
