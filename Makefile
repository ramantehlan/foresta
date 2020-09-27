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

start: start@redis ## Start the application
	docker run -d --rm \
		--network foresta-net \
		-v ${pwd}/web:/app \
		-v /app/node_modules \
		-p 3000:3000 \
		-e CHOKIDAR_USEPOLLING=true \
		--name fw \
		foresta-web:1.0  
	
		./cmd/foresta-api/foresta-api

	
start@api: ## Start the Api
	docker run --rm \
		--network foresta-net \
		-p 3001:3001 \
		--link redis-server:redis \
		--name fa \
		foresta-api:1.0 


start@redis: ## Start redis
	docker run --rm -d --name redis-server \
		  -e ALLOW_EMPTY_PASSWORD=yes \
			-p 6379:6379 \
			--network foresta-net \
			redis

cli@redis: ## Enter redis cli
	docker exec -it redis-server redis-cli

start@kafka: ## Start kafka
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
	docker stop redis-server
	#docker stop fa
	#docker stop kafka-server
	#docker stop zookeeper-server

