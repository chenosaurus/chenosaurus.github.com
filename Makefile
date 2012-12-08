PROJECT = "chenosaurus.com"

build: ;@echo "Building ${PROJECT}...."; \
       export NODE_PATH=.; \
       node test.js

.PHONY: build
