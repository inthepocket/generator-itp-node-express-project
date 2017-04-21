#!/usr/bin/env bash
# https://github.com/eslint/eslint/issues/7338
export PKG=eslint-config-itp-base;
npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev "$PKG"
