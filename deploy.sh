#!/usr/bin/env bash
npm i -g surge

export SURGE_LOGIN=test@example.co.in
export SURGE_TOKEN=d1c28a7a75967cc2b4c852cca0d12206

#PUSH
if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    surge --project ./ --domain https://fossasia-labyrinth.surge.sh
    exit 0
fi

# PR
export DEPLOY_DOMAIN=https://pr-${TRAVIS_PULL_REQUEST}-fossasia-labyrinth.surge.sh
surge --project ./ --domain $DEPLOY_DOMAIN

echo "DEPLOYED"
