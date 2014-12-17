#!/bin/bash
dir="/var/www/bliss/dev/scripts/addform"
form_dir="/var/www/bliss/ui/forms"
if [ -n "$1" ]; then
  form_name=$1
  cat ${dir}/Form.js  | sed "s/_Form_Name_/$form_name/g" > "$form_dir/$form_name.js"
  cat ${dir}/Form.htm | sed "s/_Form_Name_/$form_name/g" > "$form_dir/$form_name.htm"
  cat ${dir}/Form.php | sed "s/_Form_Name_/$form_name/g" > "$form_dir/$form_name.php"
  cat ${dir}/Form.tpl.htm | sed "s/_Form_Name_/$form_name/g" > "$form_dir/templates/${form_name}.tpl.htm"
  sudo chown -R :www-data $form_dir
  sudo chmod -R g+rx $form_dir
  /var/www/bliss/dev/scripts/build.sh
else
  echo "Please enter a name for the form i.e. 'LoginForm'";
fi
