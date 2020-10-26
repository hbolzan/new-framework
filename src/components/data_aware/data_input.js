import input from "../../views/input/input.js";

function DataInput({ BaseComponent, fieldDef, dataField }) {
    let self = BaseComponent();

    return Object.assign(
        self,
        {
            hiccup: () => input(fieldDef),
        }
    );
}

export default DataInput;
