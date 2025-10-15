IMAGE_NAME = notebook-app
CONTAINER_NAME = notebook-app-container
PORT = 8080

.PHONY: docker-run docker-build docker-stop docker-check run

docker-run: docker-build
	@echo "Starting container..."
	docker run -d -p $(PORT):8080 --name $(CONTAINER_NAME) $(IMAGE_NAME)
	@echo "App available at: http://localhost:$(PORT)"

docker-build:
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME) .

docker-stop:
	@echo "Stopping container..."
	docker stop $(CONTAINER_NAME) 2> nul || echo "Container not running"
	docker rm $(CONTAINER_NAME) 2> nul || echo "Container not exists"

docker-check:
	@echo "Checking Docker..."
	docker --version
	docker ps

run:
	npm run dev