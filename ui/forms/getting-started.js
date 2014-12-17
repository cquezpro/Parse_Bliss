GettingStartedForm = BlissForm.extend({
  name: 'GettingStartedForm',
  id: 'getting-started',
  dataClass: 'UserData',
  template: 'getting-started.tpl.htm',
  completionMessage: '',
  fields: {
    birthDate: {defaultValue: '', dataType: 'string'},
    birthMonth: {defaultValue: '', dataType: 'string'},
    birthDay: {defaultValue: 0, dataType: 'number'},
    birthYear: {defaultValue: 0, dataType: 'number'},
    sex: {defaultValue: '', dataType: 'string'},
    computerUse: {defaultValue: '', dataType: 'string'},
    employment: {defaultValue: '', dataType: 'string'},
    income: {defaultValue: 0, dataType: 'number'},
    occupation: {defaultvalue: '', dataType: 'string'},
    exercise: {defaultvalue: '', dataType: 'string'},
    meditation: {defaultvalue: '', dataType: 'string'},
    },
    constants: {
      frequency_options: ['Less than once a month', '1 or 2 times per month', '1 time per week', '2 times per week', '3 times per week', '4 times per week', '5 times per week', '6 times per week', 'Everyday'], 
      occupation_options:
        ['Waiter / Waitress', 'Janitor', 'Teacher', 'Professor', 'Lawyer', 'Accountant', 'Sales Person', 'Cashier', 'QA / Tester', 'Graphic Designer', 'Actor', 'Truck Driver', 'Cab Driver', 'Consultant', 'Doctor', 'Marketing', 'Project Manager', 'Editor', 'Journalist', 'Police Officer', 'Construction', 'Real Estate Agent', 'Secretary', 'Flight Attendant', 'Barista', 'Psychiatrist', 'Graduate Student', 'College Student', 'High-school Student', 'Retail', 'Insurance agent', 'Stockbroker', 'Administrative Assistant', 'Dentist', 'Dental Hygienist', 'Public Relations', 'Personal Trainer', 'Travel agent', 'Scientist', 'Food service', 'Mechanic', 'Plumber', 'Military', 'Engineer', 'Computer Programmer / Developer', 'Nurse', 'Bar tender'].sort()
  },
  PostRender: function() {
    $('.occupation-other').hide();
    $('#occupation').change(function(e){
      if ($(this).val() == 'other') {
        $('.occupation-other').fadeIn(function(){ $('#occupation_other').focus(); });
      }
    });

  }
});

