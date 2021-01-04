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

function buildResponse(url, response) {
    runChecker();
    return {
        url,
        status: response.status,
        statusText: statusTexts[response.status],
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

let responses = {
    "http://test/api/version": { GET: { status: 200, body: { version: "1.2.3" }, checker: jest.fn() } }
};

*/
