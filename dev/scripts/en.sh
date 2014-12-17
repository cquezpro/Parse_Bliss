#!/bin/bash
cd /var/www/bliss
if [ "$1" = 'prod' ]
then
  cp config.js.prod config.js
fi

if [ "$1" = 'dev' ]
then
  cp config.js.dev config.js
fi

