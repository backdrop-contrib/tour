/* global Backdrop */
(function ($) { // Avoid leaking variables
  Backdrop.behaviors.tour_builder = {
    attach: function (context, settings) {
      // $(document).on('mouseover', function(e) {
        // targetElement = $(e.target);
          // if (targetElement.attr('id')) {
            // var targetCSS = targetElement.attr('id');
          // }
          // else {
            // var targetCSS = targetElement.getPath();
          // }
          // console.log(targetCSS);
        // targetElement.addClass( "elborder" ).on('click', function() {
          // console.log(targetElement.getPath());
        // });
      // });
      // $(document).on('mouseout', function(e) {
        // targetElement = $(e.target);
        // targetElement.removeClass( "elborder" );
      // });
      var targetElement;
      var targetCSS;
      $(document).on({
          mouseover: function (e) {
            targetElement = $(e.target);
              if (targetElement.attr('id')) {
                targetCSS = targetElement.attr('id');
              }
              else {
                targetCSS = targetElement.getPath();
              }
            if (validElement()) {
              console.log(getElementTitle());
            targetElement.addClass( "elborder" );
            }
          },
          mouseout: function (e) {
            //targetElement = $(e.target);
            targetElement.removeClass( "elborder" );
          },
          click: function (e) {
            if (validElement()) {
              e.preventDefault();
              targetElement.removeClass( "elborder" );
              //targetElement = $(e.target);
              $('input[name="tour_stop_title"]').val(getElementTitle()); 
              $('textarea[name="tour_stop_css"]').val(targetCSS); 
              //$('#edit-tour-stop-css').val(targetCSS); 
            }

              //stuff to do on mouse leave
          }
      });

      function validElement () {
        if (
            // targetElement.hasClass('tour-edit-link') && 
            targetElement.parents('#admin-bar').length &&
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


    }
  };

})(jQuery);
