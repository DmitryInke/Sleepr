#!/bin/bash

echo "Stopping and removing containers, networks, and images created by 'docker-compose up'..."
docker-compose down

echo "Removing all unused volumes except MongoDB volumes..."
docker volume ls -qf dangling=true | grep -v mongo | xargs -r docker volume rm

echo "Removing all unused images except MongoDB images..."
docker images -a | grep -v mongo | awk '{print $3}' | xargs -r docker rmi

echo "Building and starting containers with docker-compose..."
docker-compose up --build
