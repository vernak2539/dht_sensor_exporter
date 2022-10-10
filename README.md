# dht_sensor_exporter (Node.js)

## Install

* `npm rebuild` to rebuild libraries for architecture

## Environment Variables

If you'd like to use sentry for reporting, add the DSN using the `SENTRY_DSN` environment variable.

## systemd

```shell
sudo cp ./config/dht_sensor_exporter_nodejs.service /etc/systemd/system/
sudo systemctl enable dht_sensor_exporter_nodejs.service
sudo systemctl start dht_sensor_exporter_nodejs.service
```
