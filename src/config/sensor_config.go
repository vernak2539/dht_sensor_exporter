package config

import "github.com/d2r2/go-dht"

type SensorInfo struct {
	Name string
	Type dht.SensorType
	Pin  int
}
