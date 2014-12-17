/**
 *
 *  error 
 *    - filename
 *    - rule
 *    - message
 *    - line
 *    - column
 * */
module.exports = function(error) {
  var exclude_rules = ['requireCamelCaseOrUpperCaseIdentifiers', 'validateJSDoc', 'validateQuoteMarks', 'disallowTrailingWhitespace'];
  if (exclude_rules.indexOf(error.rule) != -1) {
    return false;
  }
  console.log(error.rule);
  return true;
}
