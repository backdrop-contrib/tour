(function ($) {
  Backdrop.behaviors.tour_builder = {
    attach: function (context, settings) {
      var targetElement;
      var targetCSS;
      $(document).on({
          mouseover: function (e) {
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
            targetElement.parents('.tour-edit-dialog').length
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
      });


    }
  };

})(jQuery);
