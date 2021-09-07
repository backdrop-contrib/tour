<?php

function tour_preprocess_tour_start_link(&$vars) {
  if(empty($vars['options'])) $vars['options'] = array();

  if(!isset($vars['options']['attributes']['class'])) $vars['options']['attributes']['class'] = array();
  $vars['options']['attributes']['class'][] = 'tour-start-link';
  $vars['options']['attributes']['data-id'][] = $vars['tour_name'];

  $vars['options']['external'] = TRUE;

  if(empty($vars['link_title'])) $vars['link_title'] = t('Start the tour!');
  
  // $js_settings = array(
    // 'tourManualTrigger' => array(
        // 'tour_name' => $vars['tour_name']
      // ),
  // );
  // backdrop_add_js($js_settings, 'setting');

  // backdrop_add_js(backdrop_get_path('module', 'tour') . '/inc/js/tour_start_link.js');
}