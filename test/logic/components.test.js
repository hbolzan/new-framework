import { registerEvent, unregisterEvent } from "../../src/logic/context.js";

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

describe("unregisterEvent", () => {
    let handlerA = (x) => x,
        handlerB = (y) => y,
        handlerC = (z) => z,
        handlerD = (t) => t,
        handlerE = (w) => w;

    it("removes a handler from event handlers list", () => {
        expect(
            unregisterEvent(
                ["click", handlerB],
                { click: [handlerA, handlerB, handlerC], change: [handlerD, handlerE] }
            )
        ).toEqual(
            { click: [handlerA, handlerC], change: [handlerD, handlerE] }
        );
    });

    it("does nothing if handler is not in the events list", () => {
        expect(
            unregisterEvent(
                ["click", handlerB],
                { click: [handlerA, handlerC], change: [handlerD, handlerE] }
            )
        ).toEqual(
            { click: [handlerA, handlerC], change: [handlerD, handlerE] }
        );
    });

    it("does nothing if event doesn't exist", () => {
        expect(
            unregisterEvent(
                ["click", handlerB],
                { change: [handlerD, handlerE] }
            )
        ).toEqual(
            { change: [handlerD, handlerE] }
        );
    });
});
