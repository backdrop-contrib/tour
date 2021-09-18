(function ($) {

/**
 * Add Popper JS Popups to the steps tables.
 *
 * @todo: revert from new =>{ format to old JS notation.
 */
Backdrop.behaviors.tourPopper = {
  attach: function(context, settings) {

    if (typeof(Popper) === 'undefined') {
      $('.tour-ui-table-tooltip').show();
      $('.tour-ui-table-title').hide();
      return;
    }

    const tooltips = document.querySelectorAll('.tour-ui-table-row');

    tooltips.forEach(tooltip => {
      const button = tooltip.querySelector('.tour-ui-table-title');
      const container = tooltip.querySelector('.tour-ui-table-tooltip');
      
      const popperInstance = Popper.createPopper(button, container, {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8],
            },
          },
        ],
      });
       function show() {
        // Make the tooltip visible
        container.setAttribute('data-show', '');

        // Enable the event listeners
        popperInstance.setOptions((options) => ({
          ...options,
          modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: true },
          ],
        }));

        // Update its position
        popperInstance.update();
      }

      function hide() {
        // Hide the container
        container.removeAttribute('data-show');

        // Disable the event listeners
        popperInstance.setOptions((options) => ({
          ...options,
          modifiers: [
            ...options.modifiers,
            { name: 'eventListeners', enabled: false },
          ],
        }));
      }

      const showEvents = ['mouseenter', 'focus'];
      const hideEvents = ['mouseleave', 'blur'];

      showEvents.forEach((event) => {
        button.addEventListener(event, show);
      });

      hideEvents.forEach((event) => {
        button.addEventListener(event, hide);
      });

    });
  }
};

})(jQuery);
