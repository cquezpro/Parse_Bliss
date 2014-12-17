#!/bin/bash
jsduck --output docs --guides=dev/docgen/guides.json Bliss.js ui/BlissView.js models/AbstractCollection.js classes/Trainer.js


#Add welcome page
#jsduck --output docs --welcome=dev/docgen/welcome.htm --guides=dev/docgen/guides.json Bliss.js ui/BlissView.js models/AbstractCollection.js classes/Trainer.js
