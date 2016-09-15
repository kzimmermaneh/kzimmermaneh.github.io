/// <reference path="core.dom.js" />


/**
 * Defines a component for menus, or HTML elements 
 * that appear upon interaction with a button or other control.
 */
(function (self, window, document) {
    'use strict';


    var activeClassName = 'active',
        menuAttrName = 'data-menu';


    /**
     * A callback function to handle clicks that occur outside of UI menus.
     * @param {Event} e - The click event to handle.
     */
    function handleGlobalClick(e) {
        if (!(e instanceof Event)) {
            return;
        }

        // get all open menu instances
        var menuIds = [];

        document.querySelectorAll('[' + menuAttrName + ']')
            .forEach(function (element) {
                menuIds.push('#' + element.getAttribute(menuAttrName) + '.' + activeClassName);
            });

        // determine if click occurred within menu content 
        var selector = menuIds.join(', ');
        var target = e.target;
        var menu = null;

        while (!(target instanceof HTMLBodyElement)) {
            if (target.matchesSelector(selector)) {
                menu = target;
                break;
            }

            target = target.parentElement;
        }

        // if click is outside menu content, close menu
        if (!menu) {
            document.documentElement.removeAttribute('data-active-element');
            document.querySelectorAll(selector).removeClass(activeClassName);

            // remove global click handler
            document.documentElement.removeEventListener('click', handleGlobalClick, true);
        }
    };


    /** 
     * A callback function to handle click events for elements
     * that target menu controls.
     * @param {Event} e - The click event to handle.
     */
    function handleMenuClick(e) {
        // ensure args are valid
        if (!(e instanceof Event)) {
            return;
        }

        // get the HTML element target.
        var target = document.getElementById(e.currentTarget.getAttribute(menuAttrName));

        // if no valid element was found, resume click behavior
        if (!(target instanceof HTMLElement)) {
            return;
        }

        // prevent default click behavior
        if (e.currentTarget.tagName.toUpperCase() !== 'LABEL') {
            e.preventDefault();
        }

        // toggle active class
        var isActive = target.classList.toggle(activeClassName);

        // remove global click handler if previously added
        document.documentElement.removeEventListener('click', handleGlobalClick, true);

        // add global click handler is showing target element
        if (isActive) {
            document.documentElement.setAttribute('data-active-element', e.currentTarget.getAttribute(menuAttrName));
            document.documentElement.addEventListener('click', handleGlobalClick, true);
        }
        else {
            document.documentElement.removeAttribute('data-active-element');
        }
    };


    /**
     * Initializes all menu HTML elements.
     */
    self.initialize = function () {
        // bind click events
        // for menu elements
        document.querySelectorAll('[' + menuAttrName + ']')
            .forEach(function (element) {
                element.removeEventListener('click', handleMenuClick);
                element.addEventListener('click', handleMenuClick);
            });
    };


    return self;


})(window.uiMenu = window.uiMenu || {}, window, window.document);


/**
 * Initialize when DOM is ready
 */
if ('addEventListener' in window) {
    window.addEventListener('DOMContentLoaded', uiMenu.initialize);
}