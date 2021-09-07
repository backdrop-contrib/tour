<?php

/**
 * @file
 * Displays a tour start link.
 *
 * Available variables:
 * - $link_title: The link title.
 * - $options: An associative array of link options,
 * - $tour_name: The id of the tour which this link will start.
 *
 * @see tour_preprocess_tour_start_link()
 * @see theme_tour_start_link()
 *
 * @ingroup themeable
 */
?>

<div class="tour_start_link">
  <?php print l($link_title, '#', $options); ?>
</div>
