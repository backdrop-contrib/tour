Tour
=======

Description
-----------

Tour is a framework to make it easy for developers to add product tours to 
their pages. tour accepts a tour JSON object as input and provides an API 
for the developer to control rendering the tour display and managing the tour 
progress.

Tour module uses the Shepherd library. Shepherd is a JavaScript library for
guiding users through your app. It uses Popper.js, another open source library,
to render dialogs for each tour "step".

See more info at https://shepherdjs.dev/

Backdrop Installation
---------------------

1. Download the current, stable version from https://github.com/backdrop-contrib/tour
2. Optionally enable the tour UI module to view the demos and edit/add/delete tours 
if needed
6. Check that module is working by viewing the demo pages here: admin/config/user-interface/tour/demo.

Usage
-----

A full description of Shepherd features can be found at https://shepherdjs.dev/

The tour module reads tours stored as Backdrop config files and loads the 
necessary JQuery and CSS needed to provide guided tours. See the included config
for an example to the storage format.

The main tour module will detect all existing tour config files if they are
named in the format `tour.<module>.<any_id>`. 

- Tours with `auto_start = 1` set will start on navigating to the tour path.
- Otherwise tours can be launched by providing a link created in the format
`<?php print theme('tour_start_link', array('tour_name' => $tour['name'], 'link_title' => $tour['title'])); ?>`

Tour config files may have the following settings:
- title: A human readable title.
- description: A description of the tour.
- paths The paths at which the tour is active.
- module: The module providing the tour.
- name: A unique machine name.
- editable: (values 0 or 1) Whether the tour is editable in Tour UI.
- auto_start: (values 0 or 1) Whether the tour will start automatically on 
navigating to the 
  tour path.
- play_once: (values 0 or 1) For auto_start tours, whether the tour plays once,
  or every time you navigate to the path.
- steps: (An array of tour steps)

Tour content(steps) may have the following values:
- id: The unique ID for the step.
- tour_stop_css: The CSS ID target for the step.
- title: The header for the popup tip.
- text: The body of the popup tip. 
- placement: where the bubble should appear in relation to the target.
- weight: The weight of the tip. (Determines the step order.)

Tour UI
-------
- View all tours at admin/config/user-interface/tour to edit or delete.
- New tours are saved in a tour.tour.<machine_name> file in the site config 
folder (in files//active).
- If providing a tour with your module, this config file should be copied to 
the /config folder of the providing module then renamed to 
tour.<your_module>.<machine_name> (also rename the "_config_name" key in the 
config file).
This is useful if your wish your module to provide a guided tour of its 
features. tour will automatically pick up your tour config.
- Exported tours can be set to be editable or not.
- Tours being created just for the use of the current site will be saved in 
tour module's config folder. Careful not to mark them as not editable. If 
this happens, the module should be disabled and the config file manually edited 
to set editable to "1".
- Tour UI is not required for having site tours. Tours can be also written 
manually following standard Backdrop config file rules.

LICENSE
---------------    

This project is GPL v2 software. See the LICENSE.txt file in this directory 
for complete text.

CURRENT MAINTAINERS
---------------    

- Andy Shillingford (https://github.com/docwilmot/)

CREDITS   
--------------- 

This module was based on [Joyride JQuery for Drupal Site Tours](https://www.drupal.org/project/joyride) created for Drupal by Mark Koester 
("Drupal user markwk":http://drupal.org/user/1094790/) 
at "Int3c.com":http://int3c.com and 
sponsored by "MicroEntrepreneur.me":http://microentrepreneur.me and the 
Drupal 8 core Tour module.
