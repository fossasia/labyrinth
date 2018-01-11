#!/bin/bash
#
# Note: You need to have npm installed
#

set -e
cd "`dirname \"$0\"`"

if ! jshint; then
  npm install -g jshint
fi


filesToExclude='^(.*\.min\.js)'
(
  cd "../js"
  allFine="true"
  for jsFile in *.js; do
    if echo "$jsFile" | grep -qE "$filesToExclude"; then
      echo "Excluding $jsFile"
    else
      echo "Checking $jsFile"
      jshint "$jsFile" || allFine="false"
    fi
  done

  if [ "$allFine" != "true" ]; then
    exit 1
  fi
)

