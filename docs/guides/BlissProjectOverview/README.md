#Bliss

Bliss provides writing exercises from Positive Psychology which have been shown to increase happiness, motivation and other desirable mental traits.

Exercises include
  - Gratitude Journal - Entering things you are grateful for in your life
  - Honoring People - Writing what you appreciate about others
  - Three Good Things - Listing good things that happened to you recently

These exercises have been proven to make people happier in rigorous scientific studies.  As user's complete exercises, new mental pathways form in the brain which lead to a deeper sense joy and appreciation.


##Why Bliss is important

  - Depression and suicide affect millions of people worldwide
  - Not everyone has access to therapy and medication
  - Positive Psychology exercises have been shown to increase happiness and life-satisfaction
  - While income has increased dramatically in most western countries, happiness has remained about the same.

With hundreds (and soon thousands!) of users, we can be sure that many people will draw enormous benefit from Bliss.


##Design goals:
  - Portability   - Easily be able to move Bliss to other formats - it should work without being tied to Chrome
  - Extensibility - We should easily be able to create new objects by extending, or configuring existing ones
  - Testability   - Bliss uses Split Testing to allow testing changes of functionality and how they affect user engagement 


##Parse.com

Bliss uses Parse.com for saving Exercise / Form Data. 

**See:**

  - [Parse Javascript Guide](https://parse.com/docs/js_guide) <br>
  - [Parse Javascript API](http://parse.com/docs/js/)


##Chrome Extension

Bliss was first developed as a Chrome Extension.  It uses Chrome's API for various browser related interaction.

**See:**

  - [Chrome Developer's Guide](https://developer.chrome.com/extensions/devguide) 

**Note:** Any reference to the 'chrome' global variable or chrome API functionality should be wrapped with Bliss.getEnvironment, so that it does not break code in other environments

    @example
    if (Bliss.getEnvironment() == 'chrome') {
      chrome.runtime.sendMessage({'action': 'exerciseComplete', 'normal_exercise': this.normal_exercise});
    }

