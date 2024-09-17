const max_uid = 1_000_000
const multiplier = 1000
const transition_end = 'transitionend'

const parseSelector = selector => {
    if (selector && window.CSS && window.CSS.escape) {
        selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`)
    }

    return selector
}

const isDisabled = (elem) => {
    if (!elem || elem.nodeType !== Node.ELEMENT_NODE) {
        return true
    }

    if (elem.classList.contains('disabled'))
        return true

    if (typeof elem.disabled !== 'undefined')
        return elem.disabled

    return elem.hasAttribute('disabled') && elem.getAttribute('disabled') !== 'false'
}

const getElem = (obj) => {
    if (isElem(obj))
        return obj.jquery ? obj[0] : obj

    if (typeof obj === 'string' && obj.length > 0) {
        return document.querySelector(parseSelector(obj))
    }

    return null
}

const isElem = obj => {
    if (!obj || typeof obj !== 'object') 
        return false

    if (typeof obj.jquery !== 'undefined')
        obj = obj[0]

    return typeof obj.nodeType !== 'undefined'
}

const isVisible = elem => {
    if (!isElem(elem) | elem.getClientRect().length === 0)
        return false

    const elemVisible = getComputedStyle(elem).getPropertyValue('visibility') === 'visible'
    const closestDetails = elem.closest('details:not([open]')

    if (!closestDetails) {
        return elemVisible
    }

    if (closestDetails !== elem) {
        const summary = elem.closest('summary')

        if (summary && summary.parentNode !== closestDetails)
            return false

        if (summary === null)
            return false
    }

    return elemVisible
}