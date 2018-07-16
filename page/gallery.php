

				<!-- Header -->
				<div class="template-header template-header-background template-header-background-4">
<?php
		Template::includeTemplateHeaderTop();
		Template::includeTemplateHeaderBottom('Gallery',array(array(Template::getPageURL('home',false),'Home'),array('#','Gallery')));
?>

				</div>

				<!-- Content -->
				<div class="template-content">

					<!-- Section -->
					<div class="template-section template-section-padding-1 template-main template-align-center">
						<?php Template::includeFile('gallery-1'); ?>
					</div>

					<!-- Google Maps -->
					<div class="template-section template-section-padding-reset template-clear-fix">
 <iframe style="border: 0;" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178784.32615658134!2d-73.85161209762602!3d45.560280436405385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C+QC!5e0!3m2!1sen!2sca!4v1459479823208" width="100%" height="450" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
					</div>

				</div>
