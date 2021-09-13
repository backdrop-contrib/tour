(function ($) {
  Backdrop.behaviors.tour_builder = {
    attach: function (context, settings) {
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
            targetElement.removeClass( "elborder" );
          },
          click: function (e) {
            if (validElement()) {
              e.preventDefault();
              targetElement.removeClass( "elborder" );
              $('input[name="title"]').val(getElementTitle()); 
              $('textarea[name="selector"]').val(targetCSS); 
              $('textarea[name="text"]').val(getElementTitle()); 
            }
          }
      });

      function validElement () {
        if (
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


    }
  };

})(jQuery);
