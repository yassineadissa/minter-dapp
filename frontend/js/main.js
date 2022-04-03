(function($) {

    var self = this;

    $(document).ready(function () {

        /**
         * Mobile Viewport
         */
        self.mobile_viewport();

        /**
         * Sticky Header Top Bar
         */
        self.header_top_bar_sticky();

        /**
         * Smooth Scrolling to element
         */
        self.smooth_scrolling();

        /**
         * Product Gallery
         */
        self.product_gallery();

        /**
         * Countdown timer
         */
        self.countdown_timer();

        /**
         * Scroll Reveal
         */
        self.scroll_reveal();

        /**
         * Inner page navigation
         */
        self.inner_page_navigation();

    });

    self.mobile_viewport = function() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        window.addEventListener('resize', () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    };

    self.header_top_bar_sticky = function() {

        var scroll_position = $(window).scrollTop();
        sticky_class_handler(scroll_position);
        $(window).scroll(function() {
            var scroll_position = $(window).scrollTop();
            sticky_class_handler(scroll_position);
        });

    };

    function sticky_class_handler(scroll_position) {
        var sticky_header_height = 50;
        if ($('body').hasClass('home'))
            sticky_header_height = 100;

        if (scroll_position > sticky_header_height)
            $('.site-header .site-header__top-bar').addClass('site-header__top-bar--sticky');
        else
            $('.site-header .site-header__top-bar').removeClass('site-header__top-bar--sticky');
    }

    self.smooth_scrolling = function() {
        $(".hero__arrow").click(function() {
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".features.section").offset().top
            }, 1000);
        });

        if($('body').hasClass('home')) {
            $('.primary-navigation__item').on("click", function() {
                var anchor_class = $(this).data('anchor-class');
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("." + anchor_class).offset().top
                }, 1000);
            })
        }
    };

    self.product_gallery = function() {
        const swiper = new Swiper('.products__carousel.swiper-container', {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1.25,
            centeredSlides: true,
            spaceBetween: 15,
            autoplay: {
                delay: 4000,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            breakpoints: {
                2000: {
                    slidesPerView: 5.5,
                },
                1600: {
                    slidesPerView: 3.5,
                },
                992: {
                    slidesPerView: 2.5,
                },
                425: {
                    slidesPerView: 1.25,
                }
            }
        });
    };

    self.countdown_timer = function() {
        $('.countdown-timer').each(function() {
            var current_countdown_timer = this;
            console.log($(current_countdown_timer).data('countdown-timer-date'));
            var countdown = new Date($(current_countdown_timer).data('countdown-timer-date')).getTime();
            console.log(countdown);
            var x = setInterval(function(){
                var now = new Date().getTime();
                var distance = countdown - now;

                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
                var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
                var seconds = Math.floor(distance % (1000 *60) / 1000);

                $(current_countdown_timer).find('.countdown-timer__element.countdown-timer__element--days .countdown-timer__number').text(days);
                $(current_countdown_timer).find('.countdown-timer__element.countdown-timer__element--hours .countdown-timer__number').text(hours);
                $(current_countdown_timer).find('.countdown-timer__element.countdown-timer__element--minutes .countdown-timer__number').text(minutes);
                $(current_countdown_timer).find('.countdown-timer__element.countdown-timer__element--seconds .countdown-timer__number').text(seconds);

            },1000)
        })
    }

    self.scroll_reveal = function() {
        // HERO Section
        ScrollReveal().reveal('.hero__title', {
            delay: 500,
            duration: 750,
        });
        ScrollReveal().reveal('.hero__countdown-timer', {
            delay: 1000,
            duration: 750,
        });
        ScrollReveal().reveal('.hero__button-wrapper', {
            delay: 1500,
            duration: 500,
        });

        // About Section
        ScrollReveal().reveal('.about__title', {
            duration: 750,
        });
        ScrollReveal().reveal('.about__content', {
            delay: 500,
            duration: 750,
        });
        ScrollReveal().reveal('.about__primary-image', {
            delay: 1000,
            duration: 750,
        });
        ScrollReveal().reveal('.about__secondary-image', {
            delay: 1250,
            duration: 750,
        });

        // Products
        ScrollReveal().reveal('.products__carousel', {
            duration: 2000,
        });

        // Roadmap
        ScrollReveal().reveal('.timeline-item', {
            duration: 2000,
        });

        // Products
        ScrollReveal().reveal('.team-member', {
            duration: 2000,
            interval: 150,
        });
    };

    self.inner_page_navigation = function() {
        $('.primary-navigation__item').on("click", function(e) {
            if(!$('body').hasClass('inner-page')) return;

            e.preventDefault();
            var anchor_class = $(this).data('anchor-class');
            console.log(anchor_class);
            window.location.href = SITEAJAX.siteurl + "/#" + anchor_class;
        })

        var current_hash_url = window.location.href.split('#').pop();
        if($('body').hasClass('home') && current_hash_url != "") {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("." + current_hash_url).offset().top
            }, 1000);
        }
    };
})(jQuery);