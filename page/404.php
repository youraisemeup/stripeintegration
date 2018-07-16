				

				<!-- Header -->
				<div class="template-header">
<?php
		Template::includeTemplateHeaderTop();
?>
				
				</div>

				<!-- Content -->
				<div class="template-content">
					
					<!-- Section -->
					<div class="template-section template-section-padding-reset template-clear-fix">
					
						<!-- Flex layout 50x50% -->
						<div class="template-layout-flex template-clear-fix">

							<!-- Left column -->
							<div class="template-align-center">
								
								<h1>404</h1>
								
								<h3 class="template-margin-top-2">OOPS. Page not found.</h3>
								
								<p class="template-padding-reset template-margin-top-2">
									We looked everywhere but the requested page was not found.<br/>
									<a href="<?php Template::getPageURL('home',true); ?>">Click here</a> to return to the homepage or use the search below.
								</p>
							
								<!-- Space -->
								<div class="template-component-space template-component-space-2"></div>
								
								<!-- Form -->
								<div class="template-component-search-form">
									<div></div>
									<form>
										<div>
											<input type="search" name="search"/>
											<span class="template-icon-meta-search"></span>
											<input type="submit" name="submit" value=""/>
										</div>
									</form>
								</div>
								
							</div>

							<!-- Right column -->
							<div class="template-background-image template-background-image-3"></div>
							
						</div>
						
					</div>
					
					<div class="template-section template-section-padding-reset template-clear-fix">
						<?php Template::includeFile('google-map-1'); ?>
					</div>

				</div>