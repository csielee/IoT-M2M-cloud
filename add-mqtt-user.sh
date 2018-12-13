#!/bin/sh

sudo docker-compose exec mqtt-broker mosquitto_passwd /mosquitto/config/pwfile $1