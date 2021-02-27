if (window._ == undefined) {
    window._ = require("lodash");
}

function validationAssignments(validation, fields) {
    const basePath = validation?.handling?.assignmentsPath || {},
          assignments = validation?.handling?.assignments || {},
          assignees = _.keys(assignments);
    return _.reduce(
        fields,
        (t, f, fieldName) => {
            return assignees.includes(fieldName) ?
                t.concat(Object.assign( f, { path: `${ basePath }.${ assignments[fieldName] }`})) :
                t;
        },
        []
    );
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
