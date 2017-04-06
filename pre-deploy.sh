#!/bin/bash

# Test for YML errors in data files.
# You can also use this as a pre-commit hook by using the command -
#
# cp pre-deploy.sh ./git/hooks/pre-commit

EMOJI="\xE2\x9A\xA1"

echo "‍‍$EMOJI Testing for YML errors..."
for file in source/_data/*.yml
do
  ./node_modules/.bin/js-yaml "$file" > /dev/null
  rc=$?
  if [ $rc -ne 0 ]; then
    echo "$EMOJI Aborting commit due to YML validation failure!"
    exit $rc
  fi
done
echo "‍‍$EMOJI No YML errors found!"
exit 0
