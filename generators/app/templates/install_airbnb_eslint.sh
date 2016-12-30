#!/usr/bin/env bash
export PKG=eslint-config-airbnb-base;
npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev "$PKG"
