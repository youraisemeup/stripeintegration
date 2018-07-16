		

				<!-- Header -->
				<div class="template-header template-header-background template-header-background-1">
<?php
		Template::includeTemplateHeaderTop();
		Template::includeTemplateHeaderBottom('How to book a car wash online',array(array(Template::getPageURL('home',false),'Home'),array('#','Blog'),array('#','How to book a car wash online')));
?>
				
				</div>

				<!-- Content -->	
				<div class="template-content">

					<!-- Main -->
					<div class="template-section template-main">
					
						<!-- Layout -->
						<div class="template-content-layout template-content-layout-sidebar-right template-clear-fix">

							<!-- Left column -->
							<div class="template-content-layout-column-left">	
								<?php Template::includeFile('single-post'); ?>	
							</div>
							
							<!-- Right column -->
							<div class="template-content-layout-column-right">	
								<?php Template::includeFile('sidebar-blog'); ?>
							</div>		
							
						</div>
					
					</div>
					
				</div>