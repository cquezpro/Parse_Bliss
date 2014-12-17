#!/bin/bash
echo "https://api.parse.com/1/functions/$1"
echo "{\"class\": \"${2}\"}"

curl -X POST \
  -H "X-Parse-Application-Id: Tb43HB8M8fOmzIhhqltgnnlXKF5liWp5vBJEoTKM" \
  -H "X-Parse-REST-API-Key: fP5p0CC25pNlpnTEqNB05H199QtVKDAlfdyD9HkE" \
  -H "Content-Type: application/json" \
  -d  "{\"class\": \"${2}\"}" \
  https://api.parse.com/1/functions/$1

