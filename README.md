# dht_sensor_exporter (Node.js)

## Install

* `npm rebuild` to rebuild libraries for architecture

## systemd

```shell
sudo cp ./config/dht_sensor_exporter_nodejs.service /etc/systemd/system/
sudo systemctl enable dht_sensor_exporter_nodejs.service
sudo systemctl start dht_sensor_exporter_nodejs.service
```
