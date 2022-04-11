import { load, close,getCloseLanguageSelectorModalButtomclassName } from "../pageObjects/language-selector";

describe("LanguageSelector close button ", () => {
    beforeEach(async () => {
        await load();
    });

    afterEach(async () => {
        await close();
    });

    it("should not have letter-spacing class", async () => {
        const className = await getCloseLanguageSelectorModalButtomclassName();
        expect(className.indexOf("letter-spacing") === -1 ).toBeTruthy();
    });    
});
