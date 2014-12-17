#!/bin/bash
echo "https://api.parse.com/1/functions/$1"
echo "{\"class\": \"${2}\"}"

curl -X POST \
  -H "X-Parse-Application-Id: sx7hsF91DCqPw9M8gydXzG559wwfQIZivUk2Obdg" \
  -H "X-Parse-REST-API-Key: qrqYO7bpg1NgPvT6AXl56JChv2sm9CubmZqmSC53" \
  -H "Content-Type: application/json" \
  -d  "{\"class\": \"${2}\"}" \
  https://api.parse.com/1/functions/$1

