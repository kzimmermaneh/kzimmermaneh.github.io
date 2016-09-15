'use strict';


/**
 * HTMLElement prototypes
 */
if ('HTMLElement' in window) {


    /**
     * Determines whether an object matches the specified selector.
     * @param {String} selector - The selector to compare the object to.
     * @returns {Boolean}
     */
    HTMLElement.prototype.matchesSelector = function (selector) {
        var element = this;

        if (element.matches) {
            return element.matches(selector);
        }
        else if (element.mozMatchesSelector) {
            return element.mozMatchesSelector(selector);
        }
        else if (element.msMatchesSelector) {
            return element.msMatchesSelector(selector);
        }
        else if (element.oMatchesSelector) {
            return element.oMatchesSelector(selector);
        }
        else if (element.webkitMatchesSelector) {
            return element.webkitMatchesSelector(selector);
        }
        else {
            var matches = element.parentElement.querySelectorAll(selector),
                i = matches.length;

            while (--i >= 0 && matches.item(i) !== element);

            return i > -1;
        }
    };

}




/**
 * NodeList prototypes
 */
if ('NodeList' in window) {


    /**
     * Applies a callback function to each node of a NodeList.
     * @param {Function} callbackFn - The callback function to apply.
     * @returns {NodeList} The initial NodeList.
     */
    NodeList.prototype.forEach = function (callbackFn) {
        // if this is not a function,
        // we can't do anything else
        if (!(callbackFn instanceof Function)) {
            return;
        }

        // apply callbackFn to each node
        [].forEach.call(this, function (value, index, traversedObject) {
            callbackFn(value, index, traversedObject);
        });

        return this;
    };


    /**
     * Removes a class to each node of a NodeList. If class does not exist in the node's list of classes, it will not be removed.
     * @param {String} className - The class name to remove.
     * @returns {NodeList} The initial NodeList.
     */
    NodeList.prototype.removeClass = function (className) {
        if (className && className.constructor === String) {
            this.forEach(function (n) {
                n.classList.remove(className);
            });
        }

        return this;
    };


}