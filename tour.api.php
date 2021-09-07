<?php

/**
 * @file
 * Describes API functions for tour module.
 */

/**
 * @addtogroup hooks
 * @{
 */

/**
 * Allow modules to alter tour items before render.
 *
 * @param array $tour
 *   Array representing a single tour.
 */
function hook_tour_tour_alter(array &$tour) {
  if ($tour['name'] == 'test_tour') {
    
    // Prevent the tour from automatically starting
    $tour['auto_start'] = 0;

  }
}

/**
 * @} End of "addtogroup hooks".
 */
