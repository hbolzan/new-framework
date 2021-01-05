if (window._ === undefined) {
    window._ = require("lodash");
}

const statusTexts = {
    200: "OK",
    201: "Accepted",
    404: "Not found",
    500: "Internal server error",
};

function runChecker(response) {
    if ( _.isFunction(response.checker) ) {
        response.checker();
    }
}

function isOk(status) {
    if ( status < 400 ) {
        return true;
    }
    return false;
};

function buildResponse(url, response) {
    runChecker(response);
    return {
        url,
        status: response.status,
        statusText: statusTexts[response.status],
        ok: isOk(response.status),
        json: () => response.body,
    };
}

function mockedFetch(responses, url, args) {
    return buildResponse(url, responses[url][args?.method || "GET"]);
}

function MockedFetch(responses) {
    return (url, args) => {
        return new Promise((resolve, reject) => resolve(mockedFetch(responses, url, args)));
    };
}

export { MockedFetch };

/*

// checker is an optional attribute that may point a function which will be called each time mockedFetch is called
// if a jest.fn() function is passed as checker, it will be possible to check if fetch was performed and how many times it was performed

let responses = {
    "http://test/api/version": { GET: { status: 200, body: { version: "1.2.3" }, checker: jest.fn() } }
};

*/
