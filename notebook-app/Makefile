
APP_NAME = notebook-app
PORT = 8080

.PHONY: run stop clean dev build


run: docker-build docker-run


docker-build:
	@echo "Building Docker image..."
	docker build -t $(APP_NAME) .


docker-run:
	@echo "Starting container on port $(PORT)..."
	docker run -d -p $(PORT):8080 --name $(APP_NAME)-container $(APP_NAME)


dev:
	npm run dev


build:
	npm run build


stop:
	@echo "Stopping container..."
	docker stop $(APP_NAME)-container || true
	@echo "Removing container..."
	docker rm $(APP_NAME)-container || true


clean: stop
	@echo "Removing Docker image..."
	docker rmi $(APP_NAME) || true
	@echo "Cleaning node modules..."
	rm -rf node_modules dist


logs:
	docker logs -f $(APP_NAME)-container


status:
	docker ps -f name=$(APP_NAME)-container


install:
	npm install