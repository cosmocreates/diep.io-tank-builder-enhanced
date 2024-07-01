export const strokeWidths = {
    primary: 2,
    thin: 1
}

export const strokeBleedFactors = {
    primary: -40
}

export const circleClosingPoint = Math.PI * 2

const unorganized = {
    paused: false,
    arenaDeadzoneOffset: -100,
    developmentMode: true,
}

export function setSetting(query, value) {
    unorganized[query] = value
}

export function getSetting(query) {
    return unorganized[query]
}