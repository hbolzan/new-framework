import { trace } from "../../common/misc.js";
import datepicker from "js-datepicker";
import { inputAttrs } from "./base.js";

const datePickerFormatter = locale => (input, date, instance) => {
    input.value = date.toLocaleDateString(locale);
};

function datePickerOptions(i18n) {
    return {
        formatter: datePickerFormatter(i18n.locale),
        position: "br",
        customDays: i18n.translate("abbreviatedWeekDays"),
        customMonths: i18n.translate("fullMonthsNames"),
        customOverlayMonths: i18n.translate("abbreviatedMonthsNames"),
        overlayButton: i18n.translate("Submit"),
        overlayPlaceholder: i18n.translate("4-digit-year"),
        showAllDates: true,
        respectDisabledReadOnly: true,
    };
}

function init ({ id }, { i18n }) {
    datepicker(`#${ id }`, datePickerOptions(i18n));
}

function dateInput(field) {
    return ["div",
            ["div", { class: ["uk-inline" ]},
             ["input", inputAttrs(field, { style: { cursor: "pointer" }, private: { init: init } })],
             ["span", { class: ["uk-form-icon", "uk-form-icon-flip"], ukIcon: "calendar" }],
            ]];
}
export default dateInput;
