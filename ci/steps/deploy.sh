#!/bin/sh
set -e -u

if [ -z ${1+x} ]; then 
  echo "a deploy target must be specified (e.g. \`deploy.sh staging\`)"
  exit 1
fi

DEPLOY_TARGET="$1"


apk add --no-cache tree

echo "************************************"
echo "* "
echo "* deploying to $DEPLOY_TARGET..."
echo "* "
echo "************************************"

cd /artifacts/build
tree

echo "TODO: actually deploy!"
