ThreeGoodThingsExercise = BlissExercise.extend({
  name: 'ThreeGoodThingsExercise',
  display_name: 'Three Good Things',
  description: "Increase happiness and optimism with this quick, easy exercise",
  displayInPopup: 'always',
  intro: 'ThreeGoodThingsExerciseIntro.tpl.htm',
  templates: ['ThreeGoodThingsExercise.tpl.htm'],
  review_templates: ['ThreeGoodThingsExercise-review.tpl.htm'],
  fields: {
    ThreeGoodThings: {defaultValue: '', fieldType: 'multistring', dataType: 'string', maxFields: 3},
  },
  completionMessage: 'Your Three Good Things Exercise has been saved.',
  templateHooks: {
    'ThreeGoodThingsExercise.tpl.htm': {
      PreRender: function() {
        this.constants.strengthsCondition = new SplitTest('ThreeGoodThings-personal-strengths').values(['strengths', 'nostrengths']);
      }
    }
  }
});

