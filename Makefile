install:
	docker-compose run --rm web yarn install

app-bash:
	docker-compose run --rm --service-ports web /bin/bash

lint:
	docker-compose run --rm web npm run lint

lint-fix:
	docker-compose run --rm web npm run lint-fix
