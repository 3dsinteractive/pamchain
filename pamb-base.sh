#!/bin/bash

function build() {
    local IMAGE=pamchain-index-web
    docker login -u $DOCKER_USER -p $DOCKER_PASS
    docker build \
    -t 3dsinteractive/$IMAGE:$NAMESPACE-$APP_VERSION.$TIMESTAMP .
    docker push 3dsinteractive/$IMAGE:$NAMESPACE-$APP_VERSION.$TIMESTAMP
}
