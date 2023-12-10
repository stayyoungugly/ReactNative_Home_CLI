import React, {useEffect, useState} from 'react';
import {LangStore} from "../modules/lang/stores/LangStore";

class RootStore {
    langStore

    constructor() {
        this.langStore = new LangStore();
    }
}

export const rootStore = new RootStore();

export const storesContext = React.createContext(rootStore);