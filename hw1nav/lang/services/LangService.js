import {Localization} from "../adapters/LangAdapter";
import LangLocalRepository from "../repositories/LangLocalRepository";
import {LangType} from "../types/LangType";

export default class LangService {
    constructor() {
        this.langLocal = new LangLocalRepository();
    }

    changeLang = async (lang) => {
        await this.langLocal.set(lang);
        if (lang) {
            await Localization.changeLanguage(lang); // метод “из коробки” i18next
        }
    };

    getLang = async () => {
        return await this.langLocal.get();
    };
}