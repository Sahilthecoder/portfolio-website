/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

  // --------------------------
  // Image Preview & Zoom Code
  // --------------------------
  $(function() {
    // Append modal HTML once
    if ($('#imgModal').length === 0) {
      $('body').append(`
        <div id="imgModal" style="display:none;position:fixed;z-index:1000;padding-top:60px;left:0;top:0;width:100%;height:100%;overflow:auto;background-color:rgba(0,0,0,0.9);">
          <span class="close" style="position:absolute;top:30px;right:45px;color:#fff;font-size:40px;font-weight:bold;cursor:pointer;">&times;</span>
          <img id="modalImage" style="margin:auto;display:block;max-width:90%;max-height:80vh;transition:transform 0.25s ease;cursor:zoom-in;" />
          <div id="caption" style="margin:auto;display:block;width:80%;max-width:700px;text-align:center;color:#ccc;padding:10px 0;"></div>
        </div>
      `);
    }

    var $modal = $('#imgModal');
    var $modalImg = $('#modalImage');
    var $caption = $('#caption');
    var $closeBtn = $modal.find('.close');

    // Open modal on clicking images with class 'previewable'
    $('img.previewable').css('cursor', 'pointer').on('click', function() {
      $modal.show();
      $modalImg.attr('src', this.src).removeClass('zoomed').css('transform', 'scale(1)').css('cursor', 'zoom-in');
      $caption.text(this.alt || '');
    });

    // Close modal on clicking close button
    $closeBtn.on('click', function() {
      $modal.hide();
    });

    // Toggle zoom on modal image click
    $modalImg.on('click', function() {
      if ($modalImg.hasClass('zoomed')) {
        $modalImg.removeClass('zoomed').css('transform', 'scale(1)').css('cursor', 'zoom-in');
      } else {
        $modalImg.addClass('zoomed').css('transform', 'scale(2)').css('cursor', 'zoom-out');
      }
    });

    // Close modal if clicked outside the image
    $modal.on('click', function(e) {
      if (e.target === this) {
        $modal.hide();
      }
    });
  });

})(jQuery);
