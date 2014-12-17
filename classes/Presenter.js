//Slide Interface
/**
 *  Slides allow different objects to temporarily take control of the DOM
 *  so that we can show a succession of forms or exercises in a series without those objects knowing 
 *  about each other.
 *
 *  Slides should implement the following methods
 *
 *  @deploy: Called when control is passed to the slide.  Used to display it's form
 *  @onComplete: Used to register an callback after slide finishes
 *
 *  After a slide completes it's function, it should call .complete() - Implemented by the parent class
 *  to cede back control of the page
 *
 */
SlideInterface = new Interface('Slide', ['onComplete', 'deploy']);
function Presenter(settings) {
  var that = this;
  $.each(settings.slides, function(key, slide) {
    that.addSlide(slide);
  });
  this.nextSlide = function() {
    var slide = that.slides.shift();
    this.currentSlide = slide;
    if (typeof slide !== 'undefined') {
      slide = new slide.SlideClass();
      settings  = slide.settings ? slide.settings : {}; 
      slide.onComplete(that.nextSlide);
      slide.deploy();
      if (slide.display_name) {
        document.title = slide.display_name;
      }
    }
    else {
      that.complete();
    }
  }
}
Presenter.prototype = {
  slides: [],
  addSlide: function(Slide, settings) {
    Interface.ensureImplements(Slide.SlideClass, SlideInterface);
    settings = Slide.settings ? Slide.settings : {};
    this.slides.push({SlideClass: Slide.SlideClass, settings: settings});
  },
  complete: function() {
  }
}
