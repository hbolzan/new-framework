const basicInputAttrs = (field, type = "text") => {
    return {
        class: ["uk-input"],
        type: type,
        name: field.name,
        private: { field },
    };
};

export { basicInputAttrs };
