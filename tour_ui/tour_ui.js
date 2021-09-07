(function ($) {

/**
 * Hides the otional settings textarea in tour_ui_edit_tour().
 *
 */
Backdrop.behaviors.moduleFilterByText = {
  attach: function(context, settings) {
    var $form = $('#tour-ui-edit-tour');

    $form.find('.requirements').hide();

    // Toggle the requirements info.
    $('a.requirements-toggle').click(function(e) {
      var $requirements = $(this).closest('td').find('.requirements').toggle();
      if ($requirements.is(':visible')) {
        $(this).text(Backdrop.t('less'));
      }
      else {
        $(this).text(Backdrop.t('more'));
      }
      e.preventDefault();
      e.stopPropagation();
    });

  }
};

})(jQuery);
