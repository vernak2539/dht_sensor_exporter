.PHONY: run
run:
	go run cmd/main.go

.PHONY: build_all
build_all: build_pi_4

# .PHONY: build_darwin
# build_darwin:
# 	env GOOS=darwin GOARCH=arm64 go build -o build/dht_sensor_exporter-$(VERSION)-darwin-arm46 ./cmd/main.go

.PHONY: build_pi_4
build_pi_4:
	CC=arm-linux-gnueabi-gcc CGO_ENABLED=1 GOOS=linux GOARCH=arm64 go build -o build/dht_sensor_exporter-$(VERSION)-linux-arm64 ./cmd/main.go

# .PHONY: build_pi_zero
# build_pi_zero:
# 	env CC=arm-linux-gnueabi-gcc CGO_ENABLED=1 GOOS=linux GOARM=7 GOARCH=arm go build -o build/dht_sensor_exporter-$(VERSION)-linux-armv7 ./cmd/main.go