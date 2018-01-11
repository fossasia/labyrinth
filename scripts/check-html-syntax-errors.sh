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
    log="/tmp/error.log"
    curl -H "Content-Type: text/html; charset=utf-8" --data-binary "@$file" 'https://validator.w3.org/nu/?out=gnu' 2>/dev/null | tee "$log" | grep --color=auto -I "error"
    if cat "$log" | grep -qI "error"
    then
      allFine="false"
    fi
    echo
  done

  if [ "$allFine" != "true" ]; then
    exit 1
  fi
)
