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
    if ! echo "$file" | grep -Eq '\.html'
    then
      continue
    fi
    echo "Checking $file"
    curl -H "Content-Type: text/html; charset=utf-8" --data-binary "@$file" 'https://validator.w3.org/nu/?out=gnu' 2>/dev/null | grep -I "error"
    echo 
  done
)
