(function ($) {
    'use strict';
    var $win = $(window),
        $body_m = $('body'),
        $navbar = $('.navbar');

    // Touch Class
    if (!("ontouchstart" in document.documentElement)) {
        $body_m.addClass("no-touch");
    }

    // Get Window Width
    function winwidth() {
        return $win.width();
    }

    var wwCurrent = winwidth();
    $win.on('resize', function () {
        wwCurrent = winwidth();
    });

    // Sticky
    var $is_sticky = $('.is-sticky');
    if ($is_sticky.length > 0) {
        var $navm = $('#mainnav').offset();
        $win.scroll(function () {
            var $scroll = $win.scrollTop();
            if ($win.width() > 991) {
                if ($scroll > $navm.top) {
                    if (!$is_sticky.hasClass('has-fixed')) {
                        $is_sticky.addClass('has-fixed');
                    }
                } else {
                    if ($is_sticky.hasClass('has-fixed')) {
                        $is_sticky.removeClass('has-fixed');
                    }
                }
            } else {
                if ($is_sticky.hasClass('has-fixed')) {
                    $is_sticky.removeClass('has-fixed');
                }
            }
        });
    }

    // OnePage Scrolling
    $('a.menu-link[href*="#"]:not([href="#"])').on("click", function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var toHash = $(this.hash),
                toHashN = (this.hash.slice(1)) ? $('[name=' + this.hash.slice(1) + ']') : false,
                nbar = (wwCurrent >= 992) ? $navbar.height() - 1 : 0;

            toHash = toHash.length ? toHash : toHashN;
            if (toHash.length) {
                $('html, body').animate({
                    scrollTop: (toHash.offset().top - nbar)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Active page menu when click
    var CurURL = window.location.href,
        urlSplit = CurURL.split("#");
    var $nav_link = $(".nav li a");
    if ($nav_link.length > 0) {
        $nav_link.each(function () {
            if (CurURL === (this.href) && (urlSplit[1] !== "")) {
                $(this).closest("li").addClass("active").parent().closest("li").addClass("active");
            }
        });
    }

    // Bootstrap Dropdown 
    var $dropdown_menu = $('.dropdown');
    if ($dropdown_menu.length > 0) {
        $dropdown_menu.on("mouseover", function () {
            if ($win.width() > 991) {
                $('.dropdown-menu', this).not('.in .dropdown-menu').stop().fadeIn("400");
                $(this).addClass('open');
            }
        });
        $dropdown_menu.on("mouseleave", function () {
            if ($win.width() > 991) {
                $('.dropdown-menu', this).not('.in .dropdown-menu').stop().fadeOut("400");
                $(this).removeClass('open');
            }
        });
        $dropdown_menu.on("click", function () {
            if ($win.width() < 991) {
                $(this).children('.dropdown-menu').fadeToggle(400);
                $(this).toggleClass('open');
                return false;
            }
        });

    }
    $win.on('resize', function () {
        $('.navbar-collapse').removeClass('in');
        $dropdown_menu.children('.dropdown-menu').fadeOut("400");
    });

    // remove ani
    var $navtoggler = $('.navbar-toggler'),
        $trannav = $('.is-transparent');
    if ($navtoggler.length > 0) {
        $navtoggler.on("click", function () {
            $('.remove-animation').removeClass('animated');
            if (!$trannav.hasClass('active')) {
                $trannav.addClass('active');
            } else {
                $trannav.removeClass('active');
            }
        });
    }

    // Select
    var $selectbox = $('select');
    if ($selectbox.length > 0) {
        $selectbox.select2();
    }

    // Nav collapse
    $('.menu-link').on("click", function () {
        $('.navbar-collapse').collapse('hide');
        $trannav.removeClass('active');
    });

    //Carousel
    var $timeline_carousel = $('.timeline-carousel');
    if ($timeline_carousel.length > 0) {
        var c_rtl = ($body_m.hasClass('is-rtl')) ? true : false;
        $timeline_carousel.addClass('owl-carousel').owlCarousel({
            navText: ["<i class='ti ti-angle-left'></i>", "<i class='ti ti-angle-right'></i>"],
            items: 6,
            nav: true,
            margin: 30,
            rtl: c_rtl,
            responsive: {
                0: {
                    items: 1,
                },
                400: {
                    items: 2,
                    center: false,
                },
                599: {
                    items: 3,
                },
                1024: {
                    items: 5,
                },
                1170: {
                    items: 6,
                }
            }
        });
    }

    // Partner logos
    $(".owl-carousel.partners-carousel").owlCarousel({
        animateOut: 'slideOutDown',
        animateIn: 'flipInX',
        autoplay: true,
        loop: true,
        margin: 10,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            599: {
                items: 4
            }
        }
    });

    // Count Down
    var $count_token = $('.token-countdown');
    if ($count_token.length > 0) {
        $count_token.each(function () {
            var $self = $(this),
                datetime = $self.attr("data-date");
            $self.countdown(datetime).on('update.countdown', function (event) {
                $(this).html(event.strftime('' + '<div class="col"><span class="countdown-time countdown-time-first">%D</span><span class="countdown-text">Days</span></div>' + '<div class="col"><span class="countdown-time">%H</span><span class="countdown-text">Hours</span></div>' + '<div class="col"><span class="countdown-time">%M</span><span class="countdown-text">Minutes</span></div>' + '<div class="col"><span class="countdown-time countdown-time-last">%S</span><span class="countdown-text">Seconds</span></div>'));
            });
        });

    }

    //POPUP - Content
    var $content_popup = $('.content-popup');
    if ($content_popup.length > 0) {
        $content_popup.magnificPopup({
            type: 'inline',
            preloader: true,
            removalDelay: 400,
            mainClass: 'mfp-fade bg-team-exp'
        });
    }

    //POPUP - Video
    var $video_play = $('.video-play');
    if ($video_play.length > 0) {
        $video_play.magnificPopup({
            type: 'iframe',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false,
            callbacks: {
                beforeOpen: function () {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
        });
    }

    //ImageBG
    var $imageBG = $('.imagebg');
    if ($imageBG.length > 0) {
        $imageBG.each(function () {
            var $this = $(this),
                $that = $this.parent(),
                overlay = $this.data('overlay'),
                image = $this.children('img').attr('src');
            var olaytyp = (typeof overlay !== 'undefined' && overlay !== '') ? overlay.split('-') : false;

            // If image found
            if (typeof image !== 'undefined' && image !== '') {
                if (!$that.hasClass('has-bg-image')) {
                    $that.addClass('has-bg-image');
                }
                if (olaytyp !== '' && (olaytyp[0] === 'dark')) {
                    if (!$that.hasClass('light')) {
                        $that.addClass('light');
                    }
                }
                $this.css("background-image", 'url("' + image + '")').addClass('bg-image-loaded');
            }
        });
    }
    // Mask Class add
    var $maskOV = $('[class*="mask-ov"]');
    if ($maskOV.length > 0) {
        $maskOV.each(function () {
            var $this = $(this),
                $that = $this.parent();
            if (!$that.hasClass('has-maskbg')) {
                $that.addClass('has-maskbg');
            }
        });
    }
    // Ajax Form Submission
    var contactForm = $('#contact-form'),
        subscribeForm = $('#subscribe-form');
    if (contactForm.length > 0 || subscribeForm.length > 0) {
        if (!$().validate || !$().ajaxSubmit) {
            console.log('contactForm: jQuery Form or Form Validate not Defined.');
            return true;
        }
        // ContactForm
        /* if (contactForm.length > 0) {
            var selectRec = contactForm.find('select.required'),
                qf_results = contactForm.find('.form-results');
            contactForm.validate({
                invalidHandler: function () {
                    qf_results.slideUp(400);
                },
                submitHandler: function (form) {
                    qf_results.slideUp(400);
                    $(form).ajaxSubmit({
                        target: qf_results,
                        dataType: 'json',
                        success: function (data) {
                            var type = (data.result === 'error') ? 'alert-danger' : 'alert-success';
                            qf_results.removeClass('alert-danger alert-success').addClass('alert ' + type).html(data.message).slideDown(400);
                            if (data.result !== 'error') {
                                $(form).clearForm().find('.input-field').removeClass('input-focused');
                            }
                        }
                    });
                }
            });
            selectRec.on('change', function () {
                $(this).valid();
            });
        }*/
        // SubscribeForm
        if (subscribeForm.length > 0) {
            var sf_results = subscribeForm.find('.subscribe-results');
            subscribeForm.validate({
                invalidHandler: function () {
                    sf_results.slideUp(400);
                },
                submitHandler: function (form) {
                    sf_results.slideUp(400);
                    $(form).ajaxSubmit({
                        target: sf_results,
                        dataType: 'json',
                        success: function (data) {
                            var type = (data.result === 'error') ? 'alert-danger' : 'alert-success';
                            sf_results.removeClass('alert-danger alert-success').addClass('alert ' + type).html(data.message).slideDown(400);
                            if (data.result !== 'error') {
                                $(form).clearForm();
                            }
                        }
                    });
                }
            });
        }
    }

    // Input Animation
    var $inputline = $('.input-line');
    if ($inputline.length > 0) {
        $inputline.each(function () {
            var $this = $(this);
            var $thisval = $(this).val();
            if ($thisval.length > 0) {
                $this.parent().addClass('input-focused');
            }
            $this.on('focus', function () {
                $this.parent().addClass('input-focused');
            });
            $this.on('blur', function () {
                $this.parent().removeClass('input-focused');
                var $afterblur = $(this).val();
                if ($afterblur.length > 0) {
                    $this.parent().addClass('input-focused');
                }
            });

        });
    }

    // On Scroll Animation
    var $aniKey = $('.animated');
    if ($().waypoint && $aniKey.length > 0) {
        $win.on('load', function () {
            $aniKey.each(function () {
                var aniWay = $(this),
                    typ = aniWay.data("animate"),
                    dur = aniWay.data("duration"),
                    dly = aniWay.data("delay");
                aniWay.waypoint(function () {
                    aniWay.addClass("animated " + typ).css("visibility", "visible");
                    if (dur) {
                        aniWay.css('animation-duration', dur + 's');
                    }
                    if (dly) {
                        aniWay.css('animation-delay', dly + 's');
                    }
                }, {
                    offset: '93%'
                });
            });
        });
    }

    // Preloader
    var $preload = $('#preloader'),
        $loader = $('#loader');
    if ($preload.length > 0) {
        $win.on('load', function () {
            $loader.fadeOut(300);
            $body_m.addClass("loaded");
            $preload.delay(700).fadeOut(300);
        });
    }

    // particlesJS
    var $particles_js = $('#particles-js');
    if ($particles_js.length > 0) {
        particlesJS('particles-js',
            // Update your personal code.
            {
                "particles": {
                    "number": {
                        "value": 50,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#00c0fa"
                    },
                    "shape": {
                        "type": "circle",
                        "opacity": 0.20,
                        "stroke": {
                            "width": 0,
                            "color": "#2b56f5"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.30,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.12,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 6,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.08,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#2b56f5",
                        "opacity": 0.30,
                        "width": 1.3
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": false,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            }
            // Stop here.
        );
    }

})(jQuery);

// Get the modal
var modal1 = document.getElementById('first-modal');
var modal2 = document.getElementById('second-modal');
var modal3 = document.getElementById('third-modal');
var modal4 = document.getElementById('fourth-modal');
var modal5 = document.getElementById('fifth-modal');
var modal6 = document.getElementById('sixth-modal');
var signup = document.getElementById('signup-modal');
var signin = document.getElementById('signin-modal');
var joinWhitelistModal = document.getElementById('join-whitelist-modal');

// Get the button that opens the modal
var signupBtn = document.getElementById('signupBtn');
var signinBtn = document.getElementById('signinBtn');

// Get the <span> element that closes the modal
var span7 = document.getElementsByClassName("seventh-close")[0];
var span8 = document.getElementsByClassName("eight-close")[0];
var span9 = document.getElementsByClassName("ninth-close")[0];

// When the user clicks the button, open the modal

signupBtn.onclick = function () {
    signup.style.display = "block";
}
signinBtn.onclick = function () {
    signin.style.display = "block";
}

span7.onclick = function () {
    signup.style.display = "none";
}
span8.onclick = function () {
    signin.style.display = "none";
}
span9.onclick = function () {
    joinWhitelistModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
    if (event.target == modal5) {
        modal5.style.display = "none";
    }
    if (event.target == modal6) {
        modal6.style.display = "none";
    }
    if (event.target == signup) {
        signup.style.display = "none";
    }
    if (event.target == signin) {
        signin.style.display = "none";
    }
    if (event.target == joinWhitelistModal) {
        joinWhitelistModal.style.display = "none";
    }
}

