if (window._ == undefined) {
    window._ = require("lodash");
}

function validationAssignments(validation, fields) {
    const basePath = validation?.handling?.assignmentsPath || {},
          assignments = validation?.handling?.assignments || [],
          assignmentsMap = assignments.reduce((m, a) => Object.assign(m, { [a.destination]: a.origin }), {}),
          assignees = assignments.map(a => a.destination);

    return assignees.map(a => Object.assign( fields[a], { path: `${ basePath }.${ assignmentsMap[a] }`}));
}

function validationAssigner(assignments) {
    const properties = assignments.map(f => {
        return { fn: _.property(f.path), field: f };
    });
    return validationResult => {
        properties.forEach(prop => prop.field.value(prop.fn(validationResult)));
    };
}

export { validationAssignments, validationAssigner };
