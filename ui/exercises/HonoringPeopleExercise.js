HonoringPeopleExercise = BlissExercise.extend({
  name: 'HonoringPeopleExercise',
  display_name: 'Honoring People',
  displayInPopup: 'when_scheduled',
  description: "Build a greater appreciation of the people in your life",
  initialDelayDays: 0,
  daysBetweenDeploy: 7,
  intro: 'honoring-people-intro.tpl.htm',
  templates: ['honoring-people.tpl.htm', 'honoring-people-email.tpl.htm'],
  review_templates: ['honoring-people-review.tpl.htm'],
  fields: {
    honoring_people: {defaultValue: '', dataType: 'string'},
  },
  constants: {
    email_intro: "I'm using an app called Bliss (http://bliss31.com) to integrate positive psychology exercises into my life. In the last exercise, I was asked to write a paragraph about someone I appreciate, and I picked you!\n\nHere's my entry:"
  },
  templateHooks: {
    'honoring-people-email.tpl.htm': {
      PreRender: function() {
        Bliss.message('Your Honoring People exercise has been saved.')
        this.save();
      },
      PostRender: function() {
        var that = this;
        $('a.email').click(function(e){
          that.getModel().set('email_link_clicked', 1);
          that.save();
        });
      }
    }
  }
});


