#!/usr/bin/env bash

docker-compose build
docker-compose up --scale client=15