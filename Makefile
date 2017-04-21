.PHONY: build push

build:
	docker build -t jiramot/gps .

push:
	docker push jiramot/gps

default: build
