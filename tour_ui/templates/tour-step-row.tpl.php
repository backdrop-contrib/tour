<div class="tour-ui-table-row" id="tour-ui-table-row-<?php print $step['id']; ?>">
  <div class="tour-ui-table-title"><a role="button" tabindex="0"><?php print $step_title; ?><a>
  </div>

  <div aria-describedby="step-description" aria-labelledby="step-label" class="tour-ui-table-tooltip shepherd-enabled shepherd-element shepherd-has-cancel-icon shepherd-has-title backdrop-tour" data-shepherd-step-id="step-<?php print $step['id']; ?>" data-popper-placement="top">
    <div class="shepherd-arrow" data-popper-arrow="" ></div> 
    <div class="shepherd-content">
      <header class="shepherd-header">
        <h3 id="step-label" class="shepherd-title"><?php print $step_title; ?></h3> 
        <button aria-label="Close" class="shepherd-cancel-icon" type="button">
        <span aria-hidden="true">×</span></button>
      </header> 
      <div class="shepherd-text" id="step-description"><?php print $step_text; ?></div> 
      <footer class="shepherd-footer"></footer>
    </div>
  </div>
</div>
