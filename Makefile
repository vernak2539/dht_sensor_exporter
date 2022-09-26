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

# this will correlate to to the host machine used in the github action. at current, it's ubuntu-latest, which will produce an amd64 compatible file
# Example - ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=f62edcff60f1a79f497b1fc26afe9237b257a084, for GNU/Linux 3.2.0, with debug_info, not stripped
.PHONY: build_host
build_host:
	go build -o build/dht_sensor_exporter-$(VERSION)-linux-amd64 ./cmd/main.go
