import { isDisabled, isVisible, parseSelector } from '../util/index'

const getSelector = elem => {
    let selector = elem.getAttribute('data-cl-target')
    if (!selector || selector === '#') {
        let hrefAttr = elem.getAttribute('href')
        if (!hrefAttr || (!hrefAttr.includes('#')) && !hrefAttr.startsWith('.'))
            return null

        if (hrefAttr.includes('#') && !hrefAttr.startsWith('#'))
            hrefAttr = `#${hrefAttr.split('#')[1]}`

        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null 
    }

    return selector ? selector.split(',').map(sel => parseSelector(sel)).join(',') : null
}
//! I removed thee next and previous because they are unmnecessary
const SelectorEngine = {
    findMany: (selector, elem = document.documentElement) => {
        return [].concat(...Element.prototype.querySelectorAll.call(elem, selector))
    },
    find: (selector, elem = document.documentElement) => {
        return Element.prototype.querySelector.call(elem, selector)
    },

    children: (element, selector) => {
        return [].concat(...element.children).filter(child => child.matches(selector))
    },
    parent: (elem, selector) => {
        const parents = []
        let ancestor = element.parentNode.closest(selector)

        while (ancestor) {
            parents.push(ancestor)
            ancestor = ancestor.parentNode.closest(selector)
        }

        return parents;
    },

    focusableChildren: (element) => {
        const focusables = [
            'a',
            'button',
            'input',
            'textarea',
            'select',
            'details',
            '[tabindex]',
            '[contenteditable="true"]'
        ].map(selector => `${selector}:not([tabindex^="-"])`).join(',')

        return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el))
    },

    getSelFromElem: elem => {
        const selector = getSelector(elem)

        if (selector) {
            return SelectorEngine.find(selector) ? selector : null
        }

        return null
    },

    getElemFromSel: (elem) => {
        const selector = getSelector(elem)

        if (selector) {
            return SelectorEngine.findMany(selector) ? selector : null
        }

        return null
    },

    getElemfromSel: (elem) =>{
        const selector = getSelector(elem)
        return selector ? SelectorEngine.find(selector) : null
    },

    getMutiElemsFromSel: (elem) => {
        const selector = getSelector(elem)
        return selector ? SelectorEngine.find(selector) : []
    }
}

export default SelectorEngine;