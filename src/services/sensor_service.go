package services

import (
	"fmt"
	"strings"

	"github.com/d2r2/go-dht"
	"github.com/vernak2539/dht_sensor_exporter/src/config"
)

type SensorInfoService interface {
	GetSensorInfo(sensorTypeFlag string, pinFlag int) (config.SensorInfo, error)
	GetReadings(sensorConfig config.SensorInfo) (float32, float32, error)
}

type sensorInfoService struct{}

func CreateSensorInfoService() SensorInfoService {
	return &sensorInfoService{}
}

func (s sensorInfoService) GetSensorInfo(sensorTypeFlag string, pinFlag int) (config.SensorInfo, error) {
	config := config.SensorInfo{
		Name: strings.ToUpper(sensorTypeFlag),
		Pin:  pinFlag,
	}

	if !s.sensorParamIsValid(config.Name) {
		return config, fmt.Errorf("GetSensorInfo: invalid sensor argument passed: %s", sensorTypeFlag)
	}

	switch config.Name {
	case "DHT11":
		config.Type = dht.DHT11
	case "DHT12":
		config.Type = dht.DHT12
	case "DHT22":
		config.Type = dht.DHT22
	case "AM2302":
		config.Type = dht.AM2302
	}

	return config, nil
}

func (s sensorInfoService) GetReadings(sensorConfig config.SensorInfo) (float32, float32, error) {
	temperature, humidity, err := dht.ReadDHTxx(sensorConfig.Type, sensorConfig.Pin, false)
	if err != nil {
		return 0, 0, err
	}
	return temperature, humidity, nil

}

func (s sensorInfoService) sensorParamIsValid(sensorParam string) bool {
	var result bool = false
	supportedSensors := []string{"DHT11", "DHT12", "DHT22", "AM2302"}

	for _, x := range supportedSensors {
		if x == sensorParam {
			result = true
			break
		}
	}

	return result
}
