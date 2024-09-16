const normalizeData = (value) => {
    if (value === 'true')
        return true

    if (value === 'false')
        return false

    if (value === Number(value).toString())
        return Number(value)

    if (value === '' || value === 'null')
        return null

    if (typeof value !== 'string')
        return value

    try {
        return JSON.parse(decodeURIComponent(value))
    } catch {
        return value
    }
}