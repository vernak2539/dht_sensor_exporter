# DHT Sensor Exporter

:rotating_light: **_Still WIP_**

Export temperature and humidity readings to [Prometheus](https://prometheus.io/).

## Usage

Check the latest release on the [release](https://github.com/vernak2539/dht_sensor_exporter/releases) page to get the link
for the architecture you're wanting (limited selection now).

```bash
mkdir -p /opt/dht_sensor_exporter

cd /opt/dht_sensor_exporter

sudo wget https://github.com/vernak2539/dht_sensor_exporter/releases/download/v0.15.0/dht_sensor_exporter-v0.15.0-linux-armv7

sudo mv dht_sensor_exporter-v0.15.0-linux-armv7 dht_sensor_exporter

sudo chmod +x ./dht_sensor_exporter
```

### Flags

| Flag              | Description                                                    | Default    |
| ----------------- | -------------------------------------------------------------- | ---------- |
| `-listen-address` | Port the exporter will listen on                               | `9876`     |
| `-metrics-path`   | URL path where metrics are exported                            | `/metrics` |
| `-sensor-type`    | Sensor type to read from ("DHT11", "DHT12", "DHT22", "AM2302") | `DHT11`    |
| `pin`             | GPIO board pin to read sensor info from                        | `4`        |

### Systemd Setup

I would suggest setting up a systemd service and running it under it's own user

**Create User**

```sh
sudo useradd -M dht_sensor_exporter
sudo chown -R dht_sensor_exporter:root /opt/dht_sensor_exporter
```

**Setup systemd**

```sh
sudo vi /etc/systemd/system/dht_sensor_exporter.service
```

Insert following information into service file:

```
[Unit]
Description=DHT Sensor Exporter
After=network.target

[Service]
User=dht_sensor_exporter
Type=simple
ExecStart=/opt/dht_sensor_exporter/dht_sensor_exporter

[Install]
WantedBy=multi-user.target
```

Run following commands:

```sh
sudo systemctl daemon-reload
sudo systemctl start dht_sensor_exporter
```
