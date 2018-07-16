

				<!-- Content -->
				<div class="template-content">
					
					<!-- Section -->
					<div class="template-component-booking template-section template-main" id="template-booking">
						
						<!-- Booking form -->
						<form>

							<ul>

								<!-- Vehcile list -->
								<?php Template::includeFile('booking-vehicle-list-2'); ?>

								<!-- Package list -->
								<?php Template::includeFile('booking-package-list-1'); ?>

								<!-- Service list -->
								<?php Template::includeFile('booking-service-list-1'); ?>

								<!-- Summary -->
								<?php Template::includeFile('booking-summary-1'); ?>

							</ul>

						</form>
							
					</div>

				</div>

				<script type="text/javascript">
					jQuery(document).ready(function($)
					{
						$('#template-booking').booking();
					});
				</script>