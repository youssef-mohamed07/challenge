let nextButton = document.getElementById('next')
let prevButton = document.getElementById('prev')
let carousel = document.querySelector('.carousel')
let listHTML = document.querySelector('.carousel .list')
let seeMoreButtons = document.querySelectorAll('.seeMore')
let backButton = document.getElementById('back')

let isTransitioning = false
let autoSlideInterval

if (!nextButton || !prevButton || !carousel || !listHTML || !backButton) {
    // Section is not present on this page.
} else {
    let items = listHTML.children
    const hasEnoughItems = () => items.length > 1

    // Touch vars
    let startX = 0,
        startY = 0,
        endX = 0,
        endY = 0
    let isSwiping = false
    const minSwipeDistance = 50

    function showSlider(type) {
        if (isTransitioning || !hasEnoughItems()) return
        isTransitioning = true

        carousel.classList.remove('next', 'prev')

        if (type === 'next') {
            listHTML.appendChild(items[0])
            carousel.classList.add('next')
        } else if (type === 'prev') {
            listHTML.prepend(items[items.length - 1])
            carousel.classList.add('prev')
        }

        setTimeout(() => {
            isTransitioning = false
        }, 600) // بدل 2000 → نفس زمن الأنيميشن
    }

    function startAutoSlide() {
        stopAutoSlide()
        if (!hasEnoughItems()) return
        autoSlideInterval = setInterval(() => {
            if (!carousel.classList.contains('showDetail')) {
                showSlider('next')
            }
        }, 9000)
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval)
    }

    function handleTouchStart(e) {
        if (carousel.classList.contains('showDetail')) return
        const t = e.touches[0]
        startX = t.clientX
        startY = t.clientY
        isSwiping = false
    }

    function handleTouchMove(e) {
        if (!startX || !startY || !hasEnoughItems()) return
        const t = e.touches[0]
        endX = t.clientX
        endY = t.clientY
        const diffX = startX - endX
        const diffY = startY - endY

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
            isSwiping = true
            carousel.classList.add('swiping')
            e.preventDefault()
        }
    }

    function handleTouchEnd() {
        if (!isSwiping) return
        const diffX = startX - endX
        if (Math.abs(diffX) > minSwipeDistance) {
            diffX > 0 ? showSlider('next') : showSlider('prev')
            startAutoSlide()
        }
        startX = startY = endX = endY = 0
        isSwiping = false
        carousel.classList.remove('swiping')
    }

    if (!hasEnoughItems()) {
        nextButton.style.display = 'none'
        prevButton.style.display = 'none'
    }

    carousel.addEventListener('touchstart', handleTouchStart, { passive: false })
    carousel.addEventListener('touchmove', handleTouchMove, { passive: false })
    carousel.addEventListener('touchend', handleTouchEnd, { passive: false })
    carousel.addEventListener('touchcancel', handleTouchEnd, { passive: false })

    nextButton.onclick = () => {
        showSlider('next')
        startAutoSlide()
    }
    prevButton.onclick = () => {
        showSlider('prev')
        startAutoSlide()
    }

    seeMoreButtons.forEach((btn) => {
        btn.onclick = () => {
            carousel.classList.remove('next', 'prev')
            carousel.classList.add('showDetail')
            stopAutoSlide()
        }
    })

    backButton.onclick = () => {
        carousel.classList.remove('showDetail')
        startAutoSlide()
    }

    startAutoSlide()
}
