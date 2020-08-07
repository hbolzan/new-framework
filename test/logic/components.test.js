import { registerEvent } from "../../src/logic/components.js";

const dummyHandler = (x) => x,
      otherHandler = (y) => y,
      changeHandler = (z) => z;

describe("registerEvent", () => {
    it("should create a new events key if it doesn't exist", () => {
        expect(registerEvent("click", dummyHandler, {}))
            .toEqual({ click: [dummyHandler] });

        expect(registerEvent("change", otherHandler, { click: [dummyHandler] }))
            .toEqual({ click: [dummyHandler], change: [otherHandler] });
    });

    it("should add events to the list associated with an existing key", () => {
        expect(registerEvent("click", otherHandler, { click: [dummyHandler] }))
            .toEqual({ click: [dummyHandler, otherHandler] });

        expect(
            registerEvent(
                "change",
                changeHandler,
                { click: [dummyHandler], change: [otherHandler] }
            )
        ).toEqual({ click: [dummyHandler], change: [otherHandler, changeHandler] });
    });
});
