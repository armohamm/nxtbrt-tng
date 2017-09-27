#!/bin/sh
set -e -u

yarn install
yarn build

rm -rf /artifacts/build
mv ./build /artifacts/build
