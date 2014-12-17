#!/bin/bash
cd /var/www/bliss/ui/exercises
for file in *.php
do
  php ${file} > ${file%.php}.htm
done

cd /var/www/bliss/ui/forms
for file in *.php
do
  php ${file} > ${file%.php}.htm
done

cd /var/www/bliss/ui/deploy
for file in *.php
do
  php ${file} > ${file%.php}.htm
done

cd /var/www/bliss/ui/review
for file in *.php
do
  php ${file} > ${file%.php}.htm
done

cd /var/www/bliss/tests
for file in *.php
do
  php ${file} > ${file%.php}.htm
done
