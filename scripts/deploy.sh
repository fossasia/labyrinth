#!/usr/bin/env bash

# install requirements
npm i -g surge
pip install path.py --user
sudo add-apt-repository -y ppa:mc3man/trusty-media
sudo apt-get update
sudo apt-get install -y ffmpeg
ffmpeg -version

#login credentials
export SURGE_LOGIN=test@example.co.in
export SURGE_TOKEN=d1c28a7a75967cc2b4c852cca0d12206

# Abort if not a PR
if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
	echo "NOT A PR"
    exit 0
fi

# download the current code for updating the current live site
git clone https://github.com/fossasia/labyrinth temp

# clean all the code before deploying
echo "Running Clean-Deploy..."
python scripts/clean-deploy.py
echo "Finished running Clean-Deploy"

# deploy the site for PR
export DEPLOY_DOMAIN=https://pr-${TRAVIS_PULL_REQUEST}-fossasia-labyrinth.surge.sh
surge --project ./ --domain $DEPLOY_DOMAIN

# update the current live site with current repo
surge --project temp --domain http://labyrinth-game.surge.sh

# All done folks
echo "DEPLOYED"

#Notify On Gitter Channel
curl -d '{"text":"Support the Development of the Game. \n\n Review The Pull Request: #'${TRAVIS_PULL_REQUEST}'"}' -H "Accept: application/json" -H "Content-Type: application/json" -X POST https://api.gitter.im/v1/rooms/${ROOM}/chatMessages?access_token=${TOKEN} > /dev/null
