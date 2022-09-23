.PHONY: run
run:
	go run cmd/main.go

.PHONY: build_all
build_all: build_pi_zero

.PHONY: build_pi_zero
build_pi_zero:
	env CC=arm-linux-gnueabi-gcc CGO_ENABLED=1 GOOS=linux GOARM=7 GOARCH=arm go build -o build/dht_sensor_exporter-$(VERSION)-linux-armv7 ./cmd/main.go