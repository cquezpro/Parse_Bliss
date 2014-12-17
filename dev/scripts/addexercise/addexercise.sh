#!/bin/bash
dir="/var/www/bliss/dev/scripts/addexercise"
exercise_dir="/var/www/bliss/ui/exercises"
if [ -n "$1" ]; then
  exercise_name=$1
  cat ${dir}/Exercise.js  | sed "s/_Exercise_Name_/$exercise_name/g" > "$exercise_dir/$exercise_name.js"
  cat ${dir}/Exercise.htm | sed "s/_Exercise_Name_/$exercise_name/g" > "$exercise_dir/$exercise_name.htm"
  cat ${dir}/Exercise.php | sed "s/_Exercise_Name_/$exercise_name/g" > "$exercise_dir/$exercise_name.php"
  cat $exercise_dir/templates/template-intro.tpl.htm | sed "s/_Exercise_Name_/$exercise_name/g" > "$exercise_dir/templates/${exercise_name}Intro.tpl.htm"
  cat $exercise_dir/templates/template.tpl.htm | sed "s/_Exercise_Name_/$exercise_name/g" > "$exercise_dir/templates/${exercise_name}.tpl.htm"
  sudo chown -R :www-data $exercise_dir
  sudo chmod -R g+rx $exercise_dir
  cd $exercise_dir
  /var/www/bliss/dev/scripts/build.sh
else
  echo "Please enter a name for the exercise i.e. 'GratitudeExercise'";
fi

