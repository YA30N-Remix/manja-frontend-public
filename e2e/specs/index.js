import { load, close, getTitle } from '../pageObjects';

describe("React App", () => {
    beforeEach(async () => {
        await load();
    });

    afterEach(async () => {
        await close();
    });

    it("should be titled 'Chasht'", async () => {
        expect(await getTitle()).toBe('Chasht');
    });
});
