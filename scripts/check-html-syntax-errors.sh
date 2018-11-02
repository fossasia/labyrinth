#!/bin/bash
#
# Using the W3C markup validator service
#

set -e

cd "`dirname \"$0\"`"

(
  cd ..
  allFine="true"
  for file in `find`; do
    if ! echo "$file" | grep -Eq '\.html' || \
       echo "$file" | grep -Eq '/node_modules/'
    then
      continue
    fi
    echo "Checking $file"
    if curl -H "Content-Type: text/html; charset=utf-8" --data-binary "@$file" 'https://validator.w3.org/nu/?out=gnu' 2>/dev/null | grep --color=auto -I "error"
    then
      allFine="false"
    else
      printf "\033[0;32mOK\e[0m\n"
    fi
    echo
  done

  if [ "$allFine" != "true" ]; then
    exit 1
  fi
)
