#!/bin/bash
./prod.sh fixAcl UserData
sleep 2
./prod.sh fixAcl BestFutureExercise
sleep 2
./prod.sh fixAcl CouldBeWorseExercise
sleep 2
./prod.sh fixAcl ExtendedTracker
sleep 2
./prod.sh fixAcl FeedbackForm
sleep 2
./prod.sh fixAcl GratitudeExercise
sleep 2
./prod.sh fixAcl HonoringPeopleExercise
sleep 2
./prod.sh fixAcl MeaningInWorkExercise
sleep 2
./prod.sh fixAcl Motivation
sleep 2
./prod.sh fixAcl SavoringExercise
sleep 2
./prod.sh fixAcl ThreeGoodThingsExercise
sleep 2
./prod.sh fixAcl TransformingProblemsExercise
echo "DONE"



#./prod.sh fixAcl UserTestGroup
#./prod.sh fixAcl MoodTracker
