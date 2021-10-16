(function ($) {
  Backdrop.behaviors.tour_builder = {
    attach: function (context, settings) {
      var targetElement;
      var targetCSS;
      $(document).on({
          mouseover: function (e) {
        console.log('targetElement.parents()');
            if(!Backdrop.settings.tourBuilding) return false;
            e.stopImmediatePropagation();
            targetElement = $(e.target);
              if (targetElement.attr('id')) {
                targetCSS = targetElement.attr('id');
              }
              else {
                targetCSS = targetElement.getPath();
                // Somehow some selectors end up with a dot on the end, and
                // that totally kills the Shepherd tour JS.
                if (targetCSS.endsWith('.')) {
                  targetCSS = targetCSS.slice(0, -1); 
                }
              }
            if (validElement()) {
              targetElement.addClass( "elborder" );
            }
            else {
              targetElement = null;
            }
          },
          mouseout: function (e) {
            if (validElement()) {
              e.stopImmediatePropagation();
              targetElement.removeClass( "elborder" );
            }
          },
          click: function (e) {
            if (validElement()) {
              e.preventDefault();
              e.stopImmediatePropagation();
              targetElement.removeClass( "elborder" );
              $('input[name="title"]').val(getElementTitle()); 
              $('textarea[name="selector"]').val(targetCSS); 
              $('textarea[name="text"]').val(getElementTitle()); 
            }
          }
      });

      function validElement () {
        if (
            !targetElement ||
            targetElement.parents('#admin-bar').length ||
            targetElement.parents('.ui-dialog').length
        ) {
          return false;
        }
        return true;
      }

      function getElementTitle () {
        if (targetElement.attr('aria-label')) {
              console.log('hit');
          return targetElement.attr('aria-label');
        }
        if (targetElement.is(':header')) {
          return targetElement.text();
        }
        if (targetElement.is('a, a *')) {
          return targetElement.text().trim() + ' ' + Backdrop.t('link');
        }
        if (targetElement.prop('class')) {
          return targetElement.prop('class');
        }
        return false;
      }

      $('#tour-edit-dialog').on('dialogclose', function (e, dialog, $element) {
        Backdrop.settings.tourBuilding = false;
        Backdrop.settings.builderJump = false;
        console.log(this);
      });

      // Open a dialog if editing a particular block.
      var builderJump = Backdrop.settings.builderJump;
      if (builderJump) {
        window.setTimeout(function() {
        var $click_link = $('#builder-link-hidden a').once('builder-link-hidden');
          $click_link.triggerHandler('click');
          // Clear out the hash. Use history if available, preventing another
          // entry (which would require two back button clicks). Fallback to
          // directly updating the URL in the location bar.
          // if (window.history && window.history.replaceState) {
            // window.history.replaceState({}, '', '#');
          // }
          // else {
            // window.location.hash = '';
          // }
        }, 100);
        builderJump = null;
      }

    }
  };

})(jQuery);
