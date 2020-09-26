pwd = $(shell pwd)

.PHONY: help web start stop

help: ## Display help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

web: ## Build docker image for web
	docker build --tag foresta-web:1.0 ./web

start: ## Start the application
	docker run --rm \
		--detach \
		-v ${pwd}/web:/app \
		-v /app/node_modules \
		-p 3000:3000 \
		-e CHOKIDAR_USEPOLLING=true \
		--name fw \
		foresta-web:1.0 

stop: ## Stop the application
	docker stop fw

