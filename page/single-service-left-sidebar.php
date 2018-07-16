		

				<!-- Header -->
				<div class="template-header template-header-background template-header-background-4">
<?php
		Template::includeTemplateHeaderTop();
		Template::includeTemplateHeaderBottom('Single service',array(array(Template::getPageURL('home',false),'Home'),array('#','Single service')));
?>
				
				</div>

				<!-- Content -->
				<div class="template-content">

					<!-- Main -->
					<div class="template-section template-main">
					
						<!-- Layout -->
						<div class="template-content-layout template-content-layout-sidebar-left template-clear-fix">

							<!-- Left column -->
							<div class="template-content-layout-column-left">
								<?php Template::includeFile('sidebar-service'); ?>
							</div>
							
							<!-- Right column -->
							<div class="template-content-layout-column-right">
								<?php Template::includeFile('single-service'); ?>
							</div>
							
						</div>
						
					</div>
					
				</div>