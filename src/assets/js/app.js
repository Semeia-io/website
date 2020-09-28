class Dropdown {
    constructor(el, targetID, closeID) {
        this._el = el;
        this._closeEl = document.getElementById(closeID);
        this._target = document.getElementById(targetID);
        this._targetChildren = document.querySelectorAll(`#${targetID} a`);
        this._isOpen = false;
        this._el.addEventListener("click", this.toggleState);
        if (this._closeEl) {
            this._closeEl.addEventListener("click", this.toggleState);
        }
        this.setTabIndex("-1");
    }

    setTabIndex = (stringValue) => {
        for (let anchor of this._targetChildren) {
            anchor.tabIndex = stringValue;
        }
    };

    toggleState = (e) => {
        e.stopPropagation();
        if (!this._isOpen) {
            // we need to open
            this.setTabIndex("0");
            this._isOpen = true;

            // listen for click outside
            // this would have caused issues because dropdowns are nested
            // document.addEventListener("click", this.toggleState);
        } else {
            this.setTabIndex("-1");
            this._isOpen = false;
            // document.removeEventListener("click", this.toggleState);
        }

        this._el.classList.toggle("open");
        this._target.classList.toggle("open");
    };
}

(function () {
    window.addEventListener("load", () => {
        const dropdowns = document.querySelectorAll('[data-type="dropdown"]');
        for (let dropdown of dropdowns) {
            const targetID = dropdown.dataset.target;
            const closeEl = dropdown.dataset.close;
            new Dropdown(dropdown, targetID, closeEl);
        }
    });
})();

class Carousel {
    constructor(carousel) {
        this._carousel = carousel;
        this._slides = carousel.children[0].children;
        this._buttons = carousel.children[1].children;
        this._currentSlide = 0;
        this._slideWidth = 0;
        this._carouselHeight = 0;
        this._lastSlide = this._slides.length - 1;
        this._isDown = false;
        this._initialXPosition = 0;
        this._currentSlidesWrapperTransform = 0;
        this._resistance = 100; // the amount of pixel drag to witch slide

        this.calculateSlideWidth();
        this.addCurrentActive();
        this.addListeners();
    }

    addListeners = () => {
        // ensure slide widy
        window.addEventListener("resize", () => {
            this.calculateSlideWidth();
            this.goToSlide(this._currentSlide);
        });
        for (let item of this._buttons) {
            item.addEventListener("click", this.decideSlideToShow);
        }

        // Listeners for dragging
        this._carousel.addEventListener("mousedown", this.handleDragStart);
        this._carousel.addEventListener("touchstart", this.handleDragStart, {
            passive: true,
        });
        this._carousel.addEventListener("mousemove", this.handleDragMove);
        this._carousel.addEventListener("touchmove", this.handleDragMove, {
            passive: true,
        });
        this._carousel.addEventListener("mouseup", this.handleDragStop);
        this._carousel.addEventListener("touchend", this.handleDragStop);
    };

    calculateSlideWidth = () => {
        const rect = this._carousel.getBoundingClientRect();
        this._slideWidth = rect.right - rect.left;
    };

    // When draggin we need to find the current drag position
    getCurrentSlidesWrapperTransform = () => {
        let currentTransformX = getComputedStyle(this._carousel.children[0])
            .getPropertyValue("transform")
            .match(/(-?[0-9\.]+)/g)[4];
        return parseInt(currentTransformX);
    };

    //
    slideTrack = () => {
        this._carousel.children[0].style.transform = `translateX(-${
            this._currentSlide * this._slideWidth
        }px)`;
    };

    decideSlideToShow = (event) => {
        const target = event.currentTarget.dataset.slide;
        if (target === "next") {
            this.nextSlide();
        } else if (target === "prev") {
            this.prevSlide();
        } else {
            this.goToSlide(parseInt(target));
        }
    };

    goToNextSlide = () => {
        this.removeCurrentActive();
        if (this._currentSlide >= this._lastSlide) {
            this._currentSlide = 0;
        } else {
            this._currentSlide += 1;
        }
        this.addCurrentActive();
    };

    goToPrevSlide = () => {
        this.removeCurrentActive();
        if (this._currentSlide <= 0) {
            this._currentSlide = this._lastSlide;
        } else {
            this._currentSlide -= 1;
        }
        this.addCurrentActive();
    };

    goToSlide = (target) => {
        this.removeCurrentActive();
        this._currentSlide = target;
        this.addCurrentActive();
    };

    removeCurrentActive = () => {
        for (let button of this._buttons) {
            if (button.dataset.slide == this._currentSlide) {
                button.classList.remove("active");
            }
        }
        this._slides[this._currentSlide].classList.remove("active");
    };

    addCurrentActive = () => {
        for (let button of this._buttons) {
            if (button.dataset.slide == this._currentSlide) {
                button.classList.add("active");
            }
        }
        this._slides[this._currentSlide].classList.add("active");
        this.slideTrack();
    };

    handleDragStart = (e) => {
        this._carousel.classList.add("dragging");
        this._isDown = true;
        this._initialXPosition = e.pageX || e.touches[0].clientX;
        this._currentSlidesWrapperTransform = this.getCurrentSlidesWrapperTransform();
    };

    handleDragMove = (e) => {
        if (this._isDown) {
            const posX = e.pageX || e.touches[0].clientX;
            const movement = posX - this._initialXPosition;
            this._carousel.children[0].style.transform = `translateX(${
                movement + this._currentSlidesWrapperTransform
            }px)`;
        }
    };

    handleDragStop = () => {
        this._isDown = false;
        this._carousel.classList.remove("dragging");
        const startingTransform = this._currentSlide * this._slideWidth * -1; // this returns positive when it is infact a negative hence *-1
        const currentTransform = this.getCurrentSlidesWrapperTransform();

        if (currentTransform + this._resistance < startingTransform) {
            this.goToNextSlide();
        } else if (currentTransform - this._resistance > startingTransform) {
            this.goToPrevSlide();
        } else {
            this.goToSlide(this._currentSlide);
        }
    };
}

(function () {
    window.addEventListener("load", () => {
        const carousels = document.querySelectorAll(".zen-carousel");
        for (let carousel of carousels) {
            new Carousel(carousel);
            console.log(carousel.children[0].children);
        }
    });
})();
