

				<!-- Header -->
				<div class="template-header">
<?php
		Template::includeTemplateHeaderTop();
?>
					<div class="template-header-bottom">
						<?php Template::includeFile('slider'); ?>
					</div>

				</div>

				<!-- Content -->
				<div class="template-content">

					<!-- Section -->
					<div class="template-section template-section-padding-1 template-clear-fix template-main">

						<!-- Header + subheader -->
						<div class="template-component-header-subheader">
							<h2>Who Is Auto Comète</h2>
							<div></div>
							<span>Car wash &amp; detailing service</span>
						</div>

						<!-- Layout 33x66% -->
						<div class="template-layout-33x66 template-clear-fix">

							<!-- Left column -->
							<div class="template-layout-column-left">
								<img src="media/image/sample/460x678/image_01.jpg" alt=""/>
							</div>

							<!-- Right column -->
							<div class="template-layout-column-right">

								<!-- Text -->
								<p class="template-padding-reset">
									We are a washing service company at home or at work. We offer the same services as the conventional car wash but without moving, without queuing and in the comfort of your home or during work. We have our water and electricity in most of our trucks so 100% autonomous. We travel in the greater Montreal area and its surroundings (South Shore, North Shore, Repentigny, Terrebonne and others). We also offer winter service for residential or commercial garages. We also wash bikes, boat, plane, trailer, heavy machinery and others.
	                <br><br>
									See you soon!
									</p>

								<!-- Feature list -->
								<div class="template-component-feature-list template-component-feature-list-position-top template-clear-fix">

									<!-- Layout 50x50% -->
									<ul class="template-layout-50x50 template-clear-fix">

										<!-- Left column -->
										<li class="template-layout-column-left template-margin-bottom-reset">
											<div class="template-component-space template-component-space-2"></div>
											<span class="template-icon-feature-water-drop"></span>
											<h5>The Best Car Wash</h5>
											<ul class="template-component-list">
												<li><span class="template-icon-meta-check"></span>We offer multiple services at a great value</li>
												<li><span class="template-icon-meta-check"></span>Multiple car wash locations throughout Portland</li>
												<li><span class="template-icon-meta-check"></span>Biodegradable and eco-friendly products</li>
												<li><span class="template-icon-meta-check"></span>Trained and skilled car wash crew members</li>
											</ul>
										</li>

										<!-- Right column -->
										<li class="template-layout-column-right template-margin-bottom-reset">
											<div class="template-component-space template-component-space-2"></div>
											<span class="template-icon-feature-user-chat"></span>
											<h5>Contacting Us</h5>
											<ul class="template-component-list">
												<li><span class="template-icon-meta-check"></span>We are very open and easy to reach company</li>
												<li><span class="template-icon-meta-check"></span>Our email is checked hourly during the day</li>
												<li><span class="template-icon-meta-check"></span>Book an appointment online under 3 minutes</li>
												<li><span class="template-icon-meta-check"></span>Our phone number will be answered</li>
											</ul>
										</li>

									</ul>

								</div>

							</div>

						</div>

					</div>

					<!-- Section -->
					<div class="template-section template-section-padding-reset template-clear-fix template-background-color-1">

						<!-- Call to action -->
						<div class="template-component-call-to-action">
							<div class="template-main">
								<h3>No 1. Home Car Wash</h3>
								<a href="<?php Template::getPageURL('book-your-wash'); ?>" class="template-component-button">Book Appointment</a>
							</div>
						</div>

					</div>

					<!-- Section -->
					<div class="template-section template-background-image template-background-image-5 template-background-image-parallax template-color-white template-clear-fix">

						<!-- Mian -->
						<div class="template-main">

							<!-- Header + subheader -->
							<div class="template-component-header-subheader">
								<h2>Our Process</h2>
								<div></div>
								<span>We know your time is valuable</span>
							</div>

							<!-- Space -->
							<div class="template-component-space template-component-space-1"></div>

							<!-- Process list -->
							<div class="template-component-process-list template-clear-fix">

								<!-- Layout 25x25x25x25% -->
								<ul class="template-layout-25x25x25x25 template-clear-fix template-layout-margin-reset">

									<!-- Left column -->
									<li class="template-layout-column-left">
										<span class="template-icon-feature-check"></span>
										<h5>1. Booking</h5>
										<span class="template-icon-meta-arrow-large-rl"></span>
									</li>

									<!-- Center left column -->
									<li class="template-layout-column-center-left">
										<span class="template-icon-feature-car-check"></span>
										<h5>2. Inspection</h5>
										<span class="template-icon-meta-arrow-large-rl"></span>
									</li>

									<!-- Center right column -->
									<li class="template-layout-column-center-right">
										<span class="template-icon-feature-payment"></span>
										<h5>3. Valuation</h5>
										<span class="template-icon-meta-arrow-large-rl"></span>
									</li>

									<!-- Right column -->
									<li class="template-layout-column-right">
										<span class="template-icon-feature-vacuum-cleaner"></span>
										<h5>4. Completion</h5>
									</li>

								</ul>

							</div>

						</div>


					</div>

					<!-- Section -->
					<div class="template-section template-section-padding-1 template-clear-fix template-main">

						<!-- Header + subheader -->
						<div class="template-component-header-subheader">
							<h2>Wash Packages</h2>
							<div></div>
							<span>Which wash is the best for your vehicle?</span>
						</div>

						<!-- Booking -->
						<div class="template-component-booking" id="template-booking">

							<form>

								<ul>

									<?php Template::includeFile('booking-vehicle-list-2'); ?>
									<?php Template::includeFile('booking-package-list-2'); ?>

								</ul>

							</form>

						</div>

						<script type="text/javascript">
							jQuery(document).ready(function($)
							{
								$('#template-booking').booking();
							});
						</script>

					</div>



					<!-- Section -->
					<div class="template-section template-clear-fix template-main">

						<!-- Header + subheader -->
						<div class="template-component-header-subheader">
							<h2>Latest Projects</h2>
							<div></div>
							<span>Car wash gallery</span>
						</div>

						<?php Template::includeFile('gallery-1'); ?>

						<!-- Button -->
						<div class="template-align-center">
							<a href="<?php Template::getPageURL('gallery'); ?>" class="template-component-button">Browse More Pictures</a>
						</div>

					</div>


					<!-- Section -->
					<div class="template-section template-section-padding-1 template-clear-fix template-main">

						<!-- Features list -->
						<div class="template-component-feature-list template-component-feature-list-position-left template-clear-fix">

							<!-- Layout 33x33x33% -->
							<ul class="template-layout-33x33x33 template-clear-fix">

								<!-- Left column -->
								<li class="template-layout-column-left">
									<span class="template-icon-feature-phone-circle"></span>
									<h5>Call Us At</h5>
									<p>
										(514) 709-9274<br/>
									</p>
								</li>

								<!-- Center column -->
								<li class="template-layout-column-center">
									<span class="template-icon-feature-location-map"></span>
									<h5>Our Address</h5>
									<p>
										Montréal
									</p>
								</li>

								<!-- Right column -->
								<li class="template-layout-column-right">
									<span class="template-icon-feature-clock"></span>
									<h5>Working hours</h5>
									<p>
										24/7
										<br/>

									</p>
								</li>

							</ul>
						</div>

					</div>

					<!-- Google Maps -->
					<div class="template-section template-section-padding-reset template-clear-fix">
 <iframe style="border: 0;" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178784.32615658134!2d-73.85161209762602!3d45.560280436405385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C+QC!5e0!3m2!1sen!2sca!4v1459479823208" width="100%" height="450" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
					</div>

				</div>
