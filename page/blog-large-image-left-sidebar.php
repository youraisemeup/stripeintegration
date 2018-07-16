		

				<!-- Header -->
				<div class="template-header template-header-background template-header-background-1">
<?php
		Template::includeTemplateHeaderTop();
		Template::includeTemplateHeaderBottom('Blog large image',array(array(Template::getPageURL('home',false),'Home'),array('#','Blog large image')));
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
								<?php Template::includeFile('sidebar-blog'); ?>
							</div>
							
							<!-- Right column -->
							<div class="template-content-layout-column-right">
								<?php Template::includeFile('blog-large-image'); ?>
							</div>

						</div>
						
					</div>
					
					<!-- Google Maps -->
					<div class="template-section template-section-padding-reset template-clear-fix">
						<?php Template::includeFile('google-map-1'); ?>
					</div>

				</div>