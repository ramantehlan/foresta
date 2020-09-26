pwd = $(shell pwd)

.PHONY: help build start stop web api kafka

help: ## Display help screen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

network: ## Create docker network
	docker network create foresta-net --driver bridge

web: ## Build docker image for web
	docker build --tag foresta-web:1.0 ./web

api: ## Build docker image for api
	docker build --tag foresta-api:1.0 ./cmd/foresta-api

kafka: ## Build docker image for kafka
	docker pull bitnami/kafka:latest
	docker pull bitnami/zookeeper:latest

build: web api ## Build docker images for application

start: ## Start the application
	docker run --rm -d \
		--network foresta-net \
		-p 3001:3001 \
		--name fa \
		foresta-api:1.0 
	
	docker run --rm -d \
		--network foresta-net \
		-v ${pwd}/web:/app \
		-v /app/node_modules \
		-p 3000:3000 \
		-e CHOKIDAR_USEPOLLING=true \
		--name fw \
		foresta-web:1.0 
		
	docker run --rm -d \
	  --name zookeeper-server \
		--network foresta-net \
		-e ALLOW_ANONYMOUS_LOGIN=yes \
		bitnami/zookeeper:latest
	
	docker run --rm -d \
		--name kafka-server \
		--network foresta-net \
		-e ALLOW_PLAINTEXT_LISTENER=yes \
		-e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 \
		bitnami/kafka:latest

stop: ## Stop the application
	docker stop fw
	docker stop fa
	docker stop kafka-server
	docker stop zookeeper-server

