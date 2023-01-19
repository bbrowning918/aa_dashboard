import { ippReducer } from "../ipp";
import { Powers } from "../constants";

describe("ippSlice tests", () => {
    test("initialized state", () => {
        expect(ippReducer(undefined, { type: undefined })).toEqual({
            [Powers.GERMANY]: { 0: { start: 20 } },
            [Powers.SOVIET_UNION]: { 0: { start: 8 } },
            [Powers.COMMUNIST_CHINA]: { 0: { start: 2 } },
            [Powers.JAPAN]: { 0: { start: 16 } },
            [Powers.UK_WEST]: { 0: { start: 11 } },
            [Powers.UK_EAST]: { 0: { start: 5 } },
            [Powers.ANZAC]: { 0: { start: 3 } },
            [Powers.FRANCE]: { 0: { start: 5 } },
            [Powers.ITALY]: { 0: { start: 7 } },
            [Powers.USA]: { 0: { start: 6 } },
            [Powers.NATIONALIST_CHINA]: { 0: { start: 6 } },
            turnIds: [0, 1],
            currentTurnId: 0,
        });
    });
});
