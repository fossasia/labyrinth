#!/usr/bin/env bash

npm i -g surge

#login credentials
export SURGE_LOGIN=test@example.co.in
export SURGE_TOKEN=d1c28a7a75967cc2b4c852cca0d12206

# Abort if not a PR
if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
	echo "NOT A PR"
    exit 0
fi

# deploy the site for PR
export DEPLOY_DOMAIN=https://pr-${TRAVIS_PULL_REQUEST}-fossasia-labyrinth.surge.sh
surge --project ./ --domain $DEPLOY_DOMAIN

# update the current live site with current repo
- git clone https://github.com/fossasia/labyrinth temp
surge --project temp --domain http://labyrinth-game.surge.sh

# All done folks
echo "DEPLOYED"

#Notify On Gitter Channel
curl -d '{"text":"Support the Development of the Game. \n\n Review The Pull Request: #'${TRAVIS_PULL_REQUEST}'"}' -H "Accept: application/json" -H "Content-Type: application/json" -X POST https://api.gitter.im/v1/rooms/${ROOM}/chatMessages?access_token=${TOKEN} > /dev/null
