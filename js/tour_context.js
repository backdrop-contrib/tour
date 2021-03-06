(function ($) {
  Backdrop.behaviors.tourContext = {
    attach:function (context, settings) {
      if(!Backdrop.settings.tourContext) return false;
      var tours = Backdrop.settings.tourContext.tours;
      var shepherdTours = [];
      var gotopageURL = '';
      var searchParams = new URLSearchParams(window.location.search);

      $.each( tours, function( key, settings ) {

        var tourItems = settings._tour_internal;
        var shepherdTour = new Shepherd.Tour(settings.tourShepherdConfig);
        shepherdTour.on('cancel', function () {
          // ;
        });
        shepherdTour.on('complete', function () {
          // ;
        });
        var nextButtonAction = function (shepherdTour, tourStepConfig) {
            console.log(tourStepConfig.jump);
          if (tourStepConfig.jump) {
            gotopageURL = tourStepConfig.jump;
            return gotopage;
          }

          return tourStepConfig.cancelText ? shepherdTour.cancel : shepherdTour.next
        };
        var nextButton = function (shepherdTour, tourStepConfig) {
          return {
            classes: 'button button--primary',
            text: tourStepConfig.cancelText ? tourStepConfig.cancelText : Backdrop.t('Next'),
            action: nextButtonAction(shepherdTour, tourStepConfig)
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
            index: index,
            tourID: key,
            tourStepID: index,
            tourStepJump: tourStepConfig.jump
          };
          tourItemOptions.when = {
            show: function show() {
              var nextButton = shepherdTour.currentStep.el.querySelector('footer button');
              nextButton.focus();

            }
          };
          shepherdTour.addStep(tourItemOptions);
        });
        shepherdTours[key] = shepherdTour;
      });
      
      if (searchParams.has('tour-jump')) {
        var tourJump = searchParams.get('tour-jump');
        var tourIndex = searchParams.get('tour-step');
        if (shepherdTours[tourJump]) {
          activeTour = shepherdTours[tourJump];
          var nextIndex = parseInt(tourIndex) + 1;
          activeTour.show(nextIndex, true);
        }
      }
      else if (Backdrop.settings.tourContext.autoStart) {
        $.each( tours, function( key, settings ) {
          if (settings.autoStart) {
            shepherdTours[key].start();
            // Only one auto start tour per page.
            return false;
          }
        });
      }
      
      $(document).on('click', 'a.tour-start-link', function(event) {
        event.preventDefault();
        var tourId = $(this).attr('data-id');
        shepherdTours[tourId].start();

        return false;
      });
      function gotopage() {
            console.log(this.getCurrentStep());
        var currentStep = this.getCurrentStep();
        const params = $.param({
            'tour-jump': currentStep.options.tourID,
            'tour-step': currentStep.options.tourStepID
        });
        window.location.href = currentStep.options.tourStepJump+'?'+params;
      }
      
    }
  };
}(jQuery));