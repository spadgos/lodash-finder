TYRTLE_DIR=tyrtle
HARNESS=$(TYRTLE_DIR)/node-harness.js

all: test

test: $(HARNESS)
	node $(HARNESS) test/**.js

clean:
	rm -rf node_modules tyrtle

$(HARNESS): $(TYRTLE_DIR)

$(TYRTLE_DIR):
	git submodule update --init
	# TODO: install the submodule's npm modules

.PHONY: test clean
