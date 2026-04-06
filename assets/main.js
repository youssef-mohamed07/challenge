;(function ($) {
    'use strict'

    // ==========================================
    //      Start Document Ready function
    // ==========================================
    $(document).ready(function () {
        // ============== Mobile Menu Sidebar & Offcanvas Js Start ========
        $('.toggle-mobileMenu').on('click', function () {
            $('.mobile-menu').addClass('active')
            $('.side-overlay').addClass('show')
            $('body').addClass('scroll-hide-sm')
        })

        $('.close-button, .side-overlay').on('click', function () {
            $('.mobile-menu').removeClass('active')
            $('.side-overlay').removeClass('show')
            $('body').removeClass('scroll-hide-sm')
        })
        // ============== Mobile Menu Sidebar & Offcanvas Js End ========

        // ============== Mobile Nav Menu Dropdown Js Start =======================
        var windowWidth = $(window).width()

        $('.has-submenu').on('click', function () {
            var thisItem = $(this)

            if (windowWidth < 992) {
                if (thisItem.hasClass('active')) {
                    thisItem.removeClass('active')
                } else {
                    $('.has-submenu').removeClass('active')
                    $(thisItem).addClass('active')
                }

                var submenu = thisItem.find('.nav-submenu')

                $('.nav-submenu').not(submenu).slideUp(300)
                submenu.slideToggle(300)
            }
        })
        // ============== Mobile Nav Menu Dropdown Js End =======================

        // ===================== Scroll Back to Top Js Start ======================
        var progressPath = document.querySelector('.progress-wrap path')
        var pathLength = progressPath.getTotalLength()
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none'
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength
        progressPath.style.strokeDashoffset = pathLength
        progressPath.getBoundingClientRect()
        progressPath.style.transition = progressPath.style.WebkitTransition =
            'stroke-dashoffset 10ms linear'
        var updateProgress = function () {
            var scroll = $(window).scrollTop()
            var height = $(document).height() - $(window).height()
            var progress = pathLength - (scroll * pathLength) / height
            progressPath.style.strokeDashoffset = progress
        }
        updateProgress()
        $(window).scroll(updateProgress)
        var offset = 50
        var duration = 550
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.progress-wrap').addClass('active-progress')
            } else {
                jQuery('.progress-wrap').removeClass('active-progress')
            }
        })
        jQuery('.progress-wrap').on('click', function (event) {
            event.preventDefault()
            jQuery('html, body').animate({ scrollTop: 0 }, duration)
            return false
        })
        // ===================== Scroll Back to Top Js End ======================

        // ========================== add active class to ul>li top Active current page Js Start =====================
        function dynamicActiveMenuClass(selector) {
            const currentPath = window.location.pathname.toLowerCase()

            // Remove activePage class from all items first
            selector.find('li').removeClass('activePage')

            // Helper function to normalize URLs
            function normalizeUrl(url) {
                if (!url) return ''
                return url.toLowerCase().replace(/\/$/, '') || '/'
            }

            // Check for exact path matches first
            let matchFound = false
            selector.find('li').each(function () {
                const anchor = $(this).find('a')
                const linkHref = normalizeUrl(anchor.attr('href'))
                const normalizedCurrentPath = normalizeUrl(currentPath)

                if (linkHref === normalizedCurrentPath) {
                    $(this).addClass('activePage')
                    matchFound = true
                    return false // Break the loop
                }
            })

            // If no exact match found, check for collection pages
            if (!matchFound && currentPath.startsWith('/collections/')) {
                selector.find('li').each(function () {
                    const anchor = $(this).find('a')
                    const linkHref = normalizeUrl(anchor.attr('href'))

                    if (
                        linkHref === '/collections/all' ||
                        linkHref === '/collections' ||
                        anchor.text().toLowerCase().includes('shop') ||
                        anchor.text().toLowerCase().includes('products')
                    ) {
                        $(this).addClass('activePage')
                        matchFound = true
                        return false
                    }
                })
            }

            // If no exact match found, check for product pages (should highlight shop/collections)
            if (!matchFound && currentPath.startsWith('/products/')) {
                selector.find('li').each(function () {
                    const anchor = $(this).find('a')
                    const linkHref = normalizeUrl(anchor.attr('href'))

                    if (
                        linkHref === '/collections/all' ||
                        linkHref === '/collections' ||
                        anchor.text().toLowerCase().includes('shop') ||
                        anchor.text().toLowerCase().includes('products')
                    ) {
                        $(this).addClass('activePage')
                        matchFound = true
                        return false
                    }
                })
            }

            // Special handling for blog pages
            if (!matchFound && currentPath.startsWith('/blogs/')) {
                selector.find('li').each(function () {
                    const anchor = $(this).find('a')
                    const linkHref = normalizeUrl(anchor.attr('href'))

                    if (
                        linkHref.startsWith('/blogs/') ||
                        anchor.text().toLowerCase().includes('blog')
                    ) {
                        $(this).addClass('activePage')
                        matchFound = true
                        return false
                    }
                })
            }

            // Add activePage class to parent li if child has it
            selector.children('li').each(function () {
                if ($(this).find('.activePage').length) {
                    $(this).addClass('activePage')
                }
            })
        }

        // Disabled to prevent conflict with header-based navigation system
        // The navigation active state is now handled directly in the header section

        /*
        if ($('ul').length) {
            dynamicActiveMenuClass($('ul'))
        }

        // Also run on window load to ensure it works after page navigation
        $(window).on('load', function () {
            if ($('ul').length) {
                dynamicActiveMenuClass($('ul'))
            }
        })

        // Force check every 500ms for the first 3 seconds to ensure it applies
        let forceCheckCount = 0
        const forceCheckInterval = setInterval(function () {
            if (forceCheckCount < 6) {
                if ($('ul').length) {
                    dynamicActiveMenuClass($('ul'))
                }
                forceCheckCount++
            } else {
                clearInterval(forceCheckInterval)
            }
        }, 500)
        */
        // ========================== add active class to ul>li top Active current page Js End =====================

        // ========================== Select2 Js Start =================================
        $(document).ready(function () {
            $('.js-example-basic-single').select2()
        })
        // ========================== Select2 Js End =================================

        // ========================== Select2 Js End =================================
        $('.search-icon').on('click', function () {
            $('.search-box').addClass('active')
        })
        $('.search-box__close').on('click', function () {
            $('.search-box').removeClass('active')
        })
        // ========================== Select2 Js End =================================

        // ========================== Category Dropdown Responsive Js Start =================================
        $('.responsive-dropdown .has-submenus-submenu').on('click', function () {
            var windowWidth = $(window).width()
            if (windowWidth < 992) {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active')
                    $(this).children('.submenus-submenu').slideUp()
                } else {
                    $('.responsive-dropdown .has-submenus-submenu').removeClass('active')
                    $('.responsive-dropdown .has-submenus-submenu')
                        .children('.submenus-submenu')
                        .slideUp()

                    $(this).addClass('active')
                    $(this).children('.submenus-submenu').slideDown()
                }
            }
        })
        // ========================== Category Dropdown Responsive Js End =================================

        // ========================== On Click Category menu show Js Start =================================
        $('.category__button').on('click', function () {
            $('.responsive-dropdown').addClass('active')
            $('.side-overlay').addClass('show')
            $('body').addClass('scroll-hide-sm')
        })
        $('.side-overlay, .close-responsive-dropdown').on('click', function () {
            $('.responsive-dropdown').removeClass('active')
            $('.side-overlay').removeClass('show')
            $('body').removeClass('scroll-hide-sm')
        })
        // ========================== On Click Category menu show Js End =================================

        // ========================== Set Language in dropdown Js Start =================================
        $('.selectable-text-list li').each(function () {
            var thisItem = $(this)

            thisItem.on('click', function () {
                const listText = thisItem.text()
                var item = thisItem.parent().parent().find('.selected-text').text(listText)
            })
        })
        // ========================== Set Language in dropdown Js End =================================

        // ========================= Banner Slider Js Start ==============
        $('.banner-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1000,
            dots: false,
            pauseOnHover: true,
            fade: true,
            cssEase: 'linear',
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            infinite: true,
            nextArrow: '#banner-next',
            prevArrow: '#banner-prev',
        })
        // ========================= Banner Slider Js End ===================

        // ========================= Category Js Start ===================
        let categoryButton = document.querySelector('.category-button')
        let categoryDropdown = document.querySelector('.category-dropdown')

        if (categoryButton && categoryDropdown) {
            categoryButton.addEventListener('click', function (event) {
                event.stopPropagation()
                this.classList.toggle('active')
                categoryDropdown.classList.toggle('active')
            })

            categoryDropdown.addEventListener('click', function (event) {
                event.stopPropagation()
                categoryButton.classList.add('active')
                categoryDropdown.classList.add('active')
            })

            document.querySelector('body').addEventListener('click', function () {
                categoryButton.classList.remove('active')
                categoryDropdown.classList.remove('active')
            })
        }
        // ========================= Category Js End ===================

        // ========================= hot deals Slider Js Start ==============
        $('.product-one-slider').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#product-one-next',
            prevArrow: '#product-one-prev',
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 5,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 5,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= Banner Three Slider Js Start ==============
        $('.banner-three-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 4000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            fade: true,
            cssEase: 'linear',
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#banner-three-next',
            prevArrow: '#banner-three-prev',
        })
        // ========================= Banner Three Slider Js End ===================

        // ========================= hot deals Slider Js Start ==============
        $('.feature-item-wrapper').slick({
            slidesToShow: 10,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#feature-item-wrapper-next',
            prevArrow: '#feature-item-wrapper-prev',
            responsive: [
                {
                    breakpoint: 1699,
                    settings: {
                        slidesToShow: 9,
                    },
                },
                {
                    breakpoint: 1599,
                    settings: {
                        slidesToShow: 8,
                    },
                },
                {
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 6,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 5,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 424,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 359,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= hot deals Slider Js Start ==============
        $('.feature-three-item-wrapper').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#feature-item-wrapper-next',
            prevArrow: '#feature-item-wrapper-prev',
            responsive: [
                {
                    breakpoint: 1599,
                    settings: {
                        slidesToShow: 5,
                    },
                },
                {
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 424,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 359,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= Banner Slider Js Start ==============
        $('.banner-item-two__slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1500,
            dots: true,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            fade: true,
            cssEase: 'linear',
            nextArrow: '#banner-next',
            prevArrow: '#banner-prev',
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        })
        // ========================= Banner Slider Js End ===================

        // ========================= flash Sale Four Slider Js Start ==============
        $('.flash-sales__slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#flash-next',
            prevArrow: '#flash-prev',
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= flash Sale Four Slider Js End ==================

        // ========================= hot deals Slider Js Start ==============
        $('.hot-deals-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#deals-next',
            prevArrow: '#deals-prev',
            responsive: [
                {
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= hot deals Slider Js Start ==============
        $('.deals-week-slider').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#deal-week-next',
            prevArrow: '#deal-week-prev',
            responsive: [
                {
                    breakpoint: 1599,
                    settings: {
                        slidesToShow: 5,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= hot deals Slider Js Start ==============
        $('.top-selling-product-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#top-selling-next',
            prevArrow: '#top-selling-prev',
            responsive: [
                {
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= hot deals Slider Js Start ==============
        $('.organic-food__slider').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#organic-next',
            prevArrow: '#organic-prev',
            responsive: [
                {
                    breakpoint: 1599,
                    settings: {
                        slidesToShow: 6,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 4,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 424,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= New arrival Slider Js Start ==============
        $('.new-arrival__slider').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#new-arrival-next',
            prevArrow: '#new-arrival-prev',
            responsive: [
                {
                    breakpoint: 1599,
                    settings: {
                        slidesToShow: 6,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 4,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 424,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= New arrival Slider Js End ===================

        // ========================= hot deals Slider Js Start ==============
        $('.short-product-list').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            prevArrow:
                '<button type="button" class="slick-prev border border-gray-100 w-30 h-30 bg-transparent rounded-pill position-absolute hover-bg-main-600 hover-text-white hover-border-main-600 transition-1"><i class="ph ph-caret-left"></i></button>',
            nextArrow:
                '<button type="button" class="slick-next border border-gray-100 w-30 h-30 bg-transparent rounded-pill position-absolute hover-bg-main-600 hover-text-white hover-border-main-600 transition-1"><i class="ph ph-caret-right"></i></button>',
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= Copy Coupon Code Js Start ===================
        let copyCouponBtn = document.querySelector('.copy-coupon-btn')
        let copyText = document.querySelector('.copy-text')

        if (copyCouponBtn && copyText) {
            copyText.style.display = 'none'

            copyCouponBtn.addEventListener('click', function () {
                let text = this.textContent
                navigator.clipboard.writeText(text)
                this.classList.add('copied')
                copyText.innerHTML = 'Copied'
                copyText.style.display = 'inline-block'

                setTimeout(() => {
                    this.classList.remove('copied')
                    copyText.style.display = 'none'
                }, 2000)
            })
        }
        // ========================= Copy Coupon Code Js End ===================

        // ========================= hot deals Slider Js Start ==============
        $('.brand-slider').slick({
            slidesToShow: 8,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#brand-next',
            prevArrow: '#brand-prev',
            responsive: [
                {
                    breakpoint: 1599,
                    settings: {
                        slidesToShow: 7,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 6,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 5,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 4,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 424,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 359,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= Category Dropdown Two Js Start ===============================
        $('.category-two .category__button').on('click', function () {
            $('.category-two .category__button').toggleClass('active')
            $('.responsive-dropdown.style-two').addClass('active').slideToggle(400)
        })
        // ========================= Category Dropdown Two Js End ===============================

        // ========================= Featured Products Slider Js Start ==============
        $('.featured-product-slider').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#featured-products-next',
            prevArrow: '#featured-products-prev',
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= Featured Products Slider Js End ==================

        // ========================= hot deals Slider Js Start ==============
        $('.recommended-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#recommended-next',
            prevArrow: '#recommended-prev',
            responsive: [
                {
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= hot deals Slider Js Start ==============
        $('.vendor-card__list.style-two').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#vendor-next',
            prevArrow: '#vendor-prev',
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= hot deals Slider Js Start ==============
        $('.top-brand__slider').slick({
            slidesToShow: 8,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#topBrand-next',
            prevArrow: '#topBrand-prev',
            responsive: [
                {
                    breakpoint: 1599,
                    settings: {
                        slidesToShow: 7,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 1399,
                    settings: {
                        slidesToShow: 6,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 5,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 4,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 424,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 359,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================= hot deals Slider Js End ===================

        // ========================= Product Details Thumbs Slider Js Start ===================
        $('.product-details__thumb-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.product-details__images-slider',
        })

        $('.product-details__images-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.product-details__thumb-slider',
            dots: false,
            arrows: false,
            focusOnSelect: true,
            centerMode: false,
            infinite: false,
            rtl: false,
        })
        // ========================= Product Details Thumbs Slider Js End ===================

        // ========================= Increment & Decrement Js Start ===================
        // Quantity handling moved to sections/product.liquid for better control
        // ========================= Increment & Decrement Js End ===================

        // ========================= Color List Js Start ===================
        $('.color-list__button').on('click', function () {
            $('.color-list__button').removeClass('border-gray-900')

            if (!$(this).hasClass('border-gray-900')) {
                $(this).addClass('border-gray-900')
                $(this).removeClass('border-gray-50')
            } else {
                $(this).removeClass('border-gray-900')
                $(this).addClass('border-gray-50')
            }
        })
        // ========================= Color List Js End ===================

        // ========================== List Grid Js Start ================================
        $('.list-btn').on('click', function () {
            $('.grid-btn').addClass('border-gray-100')
            $('.grid-btn').removeClass('border-main-600 text-white bg-main-600')
            $('.list-grid-wrapper').removeClass('list-view')

            $(this).removeClass('border-gray-100')
            $(this).addClass('border-main-600 text-white bg-main-600')
            $('.list-grid-wrapper').addClass('list-view')
        })

        $('.grid-btn').on('click', function () {
            $('.list-btn').addClass('border-gray-100')
            $('.list-btn').removeClass('border-main-600 text-white bg-main-600')
            $('.list-grid-wrapper').removeClass('list-view')

            $(this).removeClass('border-gray-100')
            $(this).addClass('border-main-600 text-white bg-main-600')
        })
        // ========================== List Grid Js End ================================

        // ========================== Shop Sidebar Js Start ================================
        $('.sidebar-btn').on('click', function () {
            $(this).addClass('bg-main-600 text-white')
            $('.shop-sidebar').addClass('active')
            $('.side-overlay').addClass('show')
            $('body').addClass('scroll-hide-sm')
        })

        $('.side-overlay, .shop-sidebar__close').on('click', function () {
            $('.sidebar-btn').removeClass('bg-main-600 text-white')
            $('.shop-sidebar').removeClass('active')
            $('.side-overlay').removeClass('show')
            $('body').removeClass('scroll-hide-sm')
        })
        // ========================== Shop Sidebar Js End ================================

        // ========================== Remove Tr Js Start ================================
        $('.remove-tr-btn').on('click', function () {
            $(this).closest('tr').addClass('d-none')
        })
        // ========================== Remove Tr Js End ================================

        // ========================== Checkout Payment Method Js Start ================================
        $('.payment-item .form-check-input:checked')
            .closest('.payment-item')
            .find('.payment-item__content')
            .show()

        $('.payment-item .form-check-input').on('change', function () {
            $('.payment-item__content').hide()
            $(this).closest('.payment-item').find('.payment-item__content').show()
        })
        // ========================== Checkout Payment Method Js End ================================

        // ================== Password Show Hide Js Start ==========
        $('.toggle-password').on('click', function () {
            $(this).toggleClass('active')
            var input = $($(this).attr('id'))
            if (input.attr('type') == 'password') {
                input.attr('type', 'text')
            } else {
                input.attr('type', 'password')
            }
        })
        // ========================= Password Show Hide Js End ===========================

        // ========================= Background Image Js Start ===================
        $('.bg-img').css('background-image', function () {
            var bg = 'url(' + $(this).data('background-image') + ')'
            return bg
        })
        // ========================= Background Image Js End ===================

        // ========================== Text Slide Js Start =====================
        $('.text-slider').marquee({
            pauseOnHover: true,
            allowCss3Support: true,
            css3easing: 'linear',
            easing: 'linear',
            delayBeforeStart: 0,
            duration: 7000,
            gap: 20,
            pauseOnCycle: false,
            startVisible: true,
        })
        // ========================== Text Slide Js End =====================

        // ========================== Trending Products Js Strt =====================
        $('.expand-btn').on('click', function () {
            $(this).toggleClass('bg-main-two-600 text-white')
            $(this).parent().find('.expand-icons').toggleClass('d-flex')

            if ($(this).children('i').hasClass('ph ph-plus')) {
                $(this).children('i').removeClass('ph ph-plus')
                $(this).children('i').addClass('ph ph-x')
            } else {
                $(this).children('i').removeClass('ph ph-x')
                $(this).children('i').addClass('ph ph-plus')
            }
        })

        $('.wishlist-btn').on('click', function () {
            if ($(this).children('i').hasClass('ph ph-heart')) {
                $(this).children('i').removeClass('ph ph-heart')
                $(this).children('i').addClass('ph-fill ph-heart text-main-two-600')
            } else {
                $(this).children('i').removeClass('ph-fill ph-heart text-main-two-600')
                $(this).children('i').addClass('ph ph-heart')
            }
        })
        // ========================== Trending Products Js End =====================

        // ========================== Wishlist Button Js Start =====================
        let wishlistBtnTwos = document.querySelectorAll('.wishlist-btn-two')

        if (wishlistBtnTwos) {
            wishlistBtnTwos.forEach((wishlistBtnTwo) => {
                wishlistBtnTwo.addEventListener('click', function () {
                    this.classList.toggle('active')
                })
            })
        }
        // ========================== Wishlist Button Js End =====================

        // ========================== Instagram Slider Js Start =====================
        $('.instagram-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#instagram-next',
            prevArrow: '#instagram-prev',
            responsive: [
                {
                    breakpoint: 1299,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 424,
                    settings: {
                        slidesToShow: 1,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================== Instagram Slider Js End =====================

        // ========================== Testimonials Thumbs Slider Js Start =====================
        $('.testimonials-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.testimonials-thumbs-slider',
            dots: true,
            centerMode: true,
            focusOnSelect: true,
            fade: true,
            cssEase: 'linear',
            dots: false,
            arrows: false,
        })

        $('.testimonials-thumbs-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            speed: 1500,
            dots: false,
            pauseOnHover: true,
            arrows: true,
            draggable: true,
            rtl: $('html').attr('dir') === 'rtl' ? true : false,
            speed: 900,
            infinite: true,
            nextArrow: '#testi-next',
            prevArrow: '#testi-prev',
            asNavFor: '.testimonials-slider',
            responsive: [
                {
                    breakpoint: 1299,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                {
                    breakpoint: 424,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
            ],
        })
        // ========================== Testimonials Thumbs Slider Js End =====================

        // ========================= Wow Js Start ===================
        new WOW().init()
        // ========================= Wow Js End ===================

        // ========================= AOS Animation Js Start ===================
        AOS.init({
            offset: 40,
            duration: 1000,
            once: true,
            easing: 'ease',
        })
        // ========================= AOS Animation Js End ===================

        // ========================= Counter Up Js End ===================
        const counterUp = window.counterUp.default

        const callback = (entries) => {
            entries.forEach((entry) => {
                const el = entry.target
                if (entry.isIntersecting && !el.classList.contains('is-visible')) {
                    counterUp(el, {
                        duration: 2000,
                        delay: 16,
                    })
                    el.classList.add('is-visible')
                }
            })
        }

        const IO = new IntersectionObserver(callback, { threshold: 1 })
        const counterNumbers = document.querySelectorAll('.counter')
        if (counterNumbers.length > 0) {
            counterNumbers.forEach((counterNumber) => {
                IO.observe(counterNumber)
            })
        }
        // ========================= Counter Up Js End ===================

        // ========================= Collection Sort By Js Start ===================
        $('#sorting').on('change', function () {
            const sortBy = $(this).val()
            console.log('Sort by changed to:', sortBy)

            try {
                const currentUrl = new URL(window.location.href)
                currentUrl.searchParams.set('sort_by', sortBy)

                console.log('Redirecting to:', currentUrl.toString())

                window.location.href = currentUrl.toString()
            } catch (error) {
                console.error('Error updating URL:', error)
                const separator = window.location.href.includes('?') ? '&' : '?'
                window.location.href = window.location.href + separator + 'sort_by=' + sortBy
            }
        })

        if ($('#sorting').length > 0) {
            console.log('Sorting element found and ready')
            console.log('Current sort value:', $('#sorting').val())
        } else {
            console.log('Sorting element not found')
        }
        // ========================= Collection Sort By Js End ===================
    })
    // ==========================================
    //      End Document Ready function
    // ==========================================

    // ========================= Preloader Js Start =====================
    $(window).on('load', function () {
        $('.preloader').fadeOut()
    })
    // ========================= Preloader Js End=====================

    // ========================= Header Sticky Js Start ==============
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 260) {
            $('.header').addClass('fixed-header')
        } else {
            $('.header').removeClass('fixed-header')
        }
    })
    // ========================= Header Sticky Js End===================
})(jQuery)
