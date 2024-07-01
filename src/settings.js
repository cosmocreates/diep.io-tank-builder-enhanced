const strokeWidths = {
    primary: 2,
    thin: 1
};

const strokeBleedFactors = {
    primary: -40
};

const circleClosingPoint = Math.PI * 2;

const unorganized = {
    paused: false,
    arenaDeadzoneOffset: -100,
    developmentMode: false,
};

function setSetting(query, value) {
    unorganized[query] = value;
}

function getSetting(query) {
    return unorganized[query];
}

module.exports = {
    strokeWidths,
    strokeBleedFactors,
    circleClosingPoint,
    setSetting,
    getSetting
};