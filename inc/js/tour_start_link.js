(function ($) {
  Backdrop.behaviors.tourClickContext = {
    attach:function (context, settings) {
      $(document).on('click', 'a.tour-start-link', function(event) {
        event.preventDefault();

        //if(!Backdrop.settings.tourContext) return false;
        var settings = Backdrop.settings.tourContext;
        console.log(settings);
        // if(auto_start == 'undefined' ||auto_start == false) return false;

        // var tips_content = Backdrop.settings.tourContext.tips_content || 'undefined';
        // if(tips_content == 'undefined') return false;

        // if ($('ol#tour-tips-content').length > 0) $('ol#tour-tips-content').remove();

        //$('body', context).append(tips_content);
        // tours = Backdrop.settings.tourContext.tours;
        // $.each( tours, function( key, value ) {
          // console.log(tours);
          // if(value["auto_start"]) {
          // tour.startTour(JSON.parse(value["hopper"]));
            
          // }
        // });

        var tourItems = settings._tour_internal;
        var shepherdTour = new Shepherd.Tour(settings.tourShepherdConfig);
        shepherdTour.on('cancel', function () {
          // that.model.set('isActive', false);
        });
        shepherdTour.on('complete', function () {
          //that.model.set('isActive', false);
        });
        var nextButton = function (shepherdTour, tourStepConfig) {
          return {
            classes: 'button button--primary',
            text: tourStepConfig.cancelText ? tourStepConfig.cancelText : Backdrop.t('Next'),
            action: tourStepConfig.cancelText ? shepherdTour.cancel : shepherdTour.next
          };
        };
        Backdrop.theme.tourItemContent = function (tourStepConfig) {
          return "".concat(tourStepConfig.text, "<div class=\"tour-progress\">").concat(tourStepConfig.counter, "</div>");
        };
        tourItems.forEach(function (tourStepConfig, index) {
          var tourItemOptions = {
            title: tourStepConfig.title ? Backdrop.checkPlain(tourStepConfig.title) : null,
            text: function text() {
              return Backdrop.theme('tourItemContent', tourStepConfig);
            },
            attachTo: tourStepConfig.attachTo,
            buttons: [nextButton(shepherdTour, tourStepConfig)],
            classes: tourStepConfig.classes,
            index: index
          };
          tourItemOptions.when = {
            show: function show() {
              var nextButton = shepherdTour.currentStep.el.querySelector('footer button');
              nextButton.focus();

            }
          };
          shepherdTour.addStep(tourItemOptions);
        });
        shepherdTour.start();

        return false;
      });
      
    }
  };
}(jQuery));
