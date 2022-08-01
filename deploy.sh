#!/bin/bash
docker build --target=prod -t reactle:prod -f docker/Dockerfile .
docker tag reactle:prod us-central1-docker.pkg.dev/polygonle/prod-images/polygonle
docker push us-central1-docker.pkg.dev/polygonle/prod-images/polygonle:latest
