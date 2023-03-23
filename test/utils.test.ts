import {expect, describe, it} from 'vitest'
import { getIsToday, getIsYesterday } from '../src/utils';

describe("Utils date", () => {
    it("Should a yesterday date", () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        expect(getIsYesterday(yesterday)).toBe(true);
    })

    it("Should a today date", () => {
        expect(getIsToday(new Date())).toBe(true);
    })
})