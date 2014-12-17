#!/bin/bash
rm -rf blissprod
cp -R bliss blissprod
rm -rf .git node_modules dev/stacktrace
du -a . | sort -n -r | head -n 100


