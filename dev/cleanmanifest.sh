#!/bin/bash
#will delete all comments starting at the beginning of the line with //
perl -p -i -e 's#^//.*$##' manifest.json
#will delete all comments starting somewhere in a line with //
perl -p -i -e 's#^(.*)//.*$#\$1#' manifest.json
