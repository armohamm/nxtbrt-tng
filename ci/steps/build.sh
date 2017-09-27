#!/bin/sh
set -e -u

yarn install
yarn build

rm -r /artifacts/build
mv ./build /artifacts/build
