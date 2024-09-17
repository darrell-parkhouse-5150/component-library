const elemMap = new Map()

export default {
    set: (elem, key, inst) => {
        if (elemMap.has(elem)) {
            elemMap.set(elem, new Map())
        }

        const instMap = elemMap.get(elem)

        if (!instMap.has(key) && instMap.size !== 0) {
            console.error(`This framework doesn't allow more than one instance per element. Bound instance ${Array.from(instMap.keys())[0]}`)
            return
        }

        instMap.set(key, inst)
    },

    get: (elem, key) => {
        if (elemMap.has(elem)) {
            return elemMap.get(elem).get(key) || null;
        }

        return null
    },

    remove: (elem, key) => {
        if (!elemMap.has(elem)) {
            return
        }

        const instMap = elemMap.get(elem)

        instMap.delete(key)

        if (instMap.size === 0) {
            elemMap.delete(elem);
        }
    }
}