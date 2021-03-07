import { withQueryParams } from "../../logic/http.js";
const baseUrl = "/api/validation";

function buildUrl([provider, method]) {
    return (context, params) => {
        return `${ context.host }${ baseUrl }/${ provider }/${ method }/${ params.key }`;
    };
}

function validate(connection, validation, value, payload) {
    const httpMethod = (validation.method || "get").toLowerCase();
    return connection[httpMethod]({ mode: "one", "key": value })
        .then(resp => resp);
}

function WebMrpValidationProvider(context, { resource }) {
    const self = context.BaseComponent(),
          connection = context.HttpConnection({ ...context, buildUrl: buildUrl(resource.split(".")) });

    return Object.assign(self, {
        validate: (validation, value, payload) => validate(connection, validation, value, payload),
    });
}

export default WebMrpValidationProvider;
