IMAGE_NAME = diploma-work
CONTAINER_NAME = diploma-work-container
PORT = 8080

.PHONY: run build stop clean dev

run: build
	@echo "Запуск контейнера..."
	@docker run -d --name $(CONTAINER_NAME) -p $(PORT):8080 $(IMAGE_NAME) || \
	 (echo "Контейнер уже запущен, перезапускаем..." && make restart)
	@echo "Приложение доступно по http://localhost:$(PORT)"

build:
	@if [ -z "$$(docker images -q $(IMAGE_NAME) 2>/dev/null)" ]; then \
		echo "Сборка Docker образа..."; \
		docker build -t $(IMAGE_NAME) .; \
	else \
		echo "Docker образ уже собран"; \
	fi

dev:
	npm run dev

stop:
	@echo "Остановка контейнера..."
	@docker stop $(CONTAINER_NAME) 2>/dev/null || true
	@docker rm $(CONTAINER_NAME) 2>/dev/null || true

clean: stop
	@echo "Удаление Docker образа..."
	@docker rmi $(IMAGE_NAME) 2>/dev/null || true

restart: stop run

logs:
	docker logs -f $(CONTAINER_NAME)

build-local:
	npm run build

install:
	npm install