import {makeAutoObservable} from "mobx";
import LangService from "../services/LangService";

export class LangStore {
    lang = null;

    isLoading = false;

    langService;

    constructor() {
        makeAutoObservable(this);
        this.langService = new LangService();
    }

    getLang = async () => {
        this.setIsLoading(true);

        this.langService
            .getLang()
            .then(result => {
                this.setLang(result);
                this.changeLang(result);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setIsLoading(false);
            });
    }

    changeLang = async (value) => {
        this.setIsLoading(true)
        this.langService.changeLang(value)
            .then(() => this.setLang(value))
            .finally(() => {
                this.setIsLoading(false);
            });
    }
    setLang = value => {
        this.lang = value;
    }

    setIsLoading = value => {
        this.isLoading = value;
    }
}