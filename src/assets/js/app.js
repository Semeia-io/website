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
