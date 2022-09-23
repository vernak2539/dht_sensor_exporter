package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/vernak2539/dht_sensor_exporter/src/services"
)

func main() {
	var (
		address     = flag.String("listen-address", ":9876", "The address to listen for HTTP requests.")
		metricsPath = flag.String("metrics-path", "/metrics", "The URI path that host Prometheus metrics.")
		sensorType  = flag.String("sensor-type", "DHT11", "The sensor you're interacting with [DHT11, DHT12, DHT22, AM2302]")
		pin         = flag.Int("pin", 4, "GPIO board pin to read sensor info from")
	)
	flag.Parse()

	sensorService := services.CreateSensorInfoService()
	sensorConfig, err := sensorService.GetSensorInfo(*sensorType, *pin)
	if err != nil {
		panic(err)
	}

	registry := prometheus.NewRegistry()

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`<html>
			<head><title>Host Info Exporter</title></head>
			<body>
			<h1>Host Info Exporter</h1>
			<p><a href="` + *metricsPath + `">Metrics</a></p>
			</body>
			</html>`))
	})

	sensorGauge := promauto.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "dht_sensor_reading",
			Help: "reading from dht sensor",
			ConstLabels: prometheus.Labels{
				"sensor": sensorConfig.Name,
			},
		},
		[]string{"measurement"}, // labels
	)

	registry.Register(sensorGauge)

	// Periodically get readings from DHT sensor
	go func() {
		for {
			temperature, humidity, err := sensorService.GetReadings(sensorConfig)
			if err != nil {
				sensorGauge.WithLabelValues("temperature").Set(0)
				sensorGauge.WithLabelValues("humidity").Set(0)
			} else {
				sensorGauge.WithLabelValues("temperature").Set(float64(temperature))
				sensorGauge.WithLabelValues("humidity").Set(float64(humidity))
			}

			time.Sleep(10 * time.Second)
		}
	}()

	http.Handle(*metricsPath, promhttp.HandlerFor(registry, promhttp.HandlerOpts{
		EnableOpenMetrics: true,
	}))

	output := `DHT Sensor Exporter
====================================
Metrics Endpoint: http://localhost:%s/metrics
Sensor: %s
  - Type: %d
  - Pin: %d

It's Alive!!!`

	fmt.Printf(output, *address, sensorConfig.Name, sensorConfig.Type, sensorConfig.Pin)
	log.Fatal(http.ListenAndServe(*address, nil))
}
