#!/bin/sh
set -e -u

if [ -z ${DEPLOY_TARGET+x} ]; then 
  echo "DEPLOY_TARGET is required"
  exit 1
fi

echo "deploying to $DEPLOY_TARGET..."

echo "TODO: actually deploy!"
