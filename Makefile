.PHONY: run
run:
	go run cmd/main.go

.PHONY: build_all
build_all: build_arm6 build_arm7 build_host

.PHONY: build_arm7
build_arm7:
	env CC=arm-linux-gnueabihf-gcc CGO_ENABLED=1 GOOS=linux GOARM=7 GOARCH=arm go build -o build/dht_sensor_exporter-$(VERSION)-linux-armv7 ./cmd/main.go

.PHONY: build_arm6
build_arm6:
	env CC=arm-linux-gnueabihf-gcc CGO_ENABLED=1 GOOS=linux GOARM=6 GOARCH=arm go build -o build/dht_sensor_exporter-$(VERSION)-linux-armv6 ./cmd/main.go
	
.PHONY: build_host
build_host:
	go build -o build/dht_sensor_exporter-$(VERSION)-linux-ubuntu-host ./cmd/main.go
