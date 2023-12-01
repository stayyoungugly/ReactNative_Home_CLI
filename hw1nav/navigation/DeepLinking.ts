import {LinkingOptions} from '@react-navigation/native';
import {getActionFromState, getStateFromPath} from '@react-navigation/native';
import {Linking} from 'react-native';
import Navigation from './Navigation';

export const linkingPrefix = 'navigationapp://';

export class DeepLinking {
    static linking: LinkingOptions<{}> = {
        prefixes: [linkingPrefix],
        config: {
            screens: {
                ['Tab']: {
                    screens: {
                        ['News']: {
                            path: 'screens/news-info',
                        },
                    },
                },
            },
        },
        getInitialURL() {
            return null;
        },

        subscribe() {
            const linkingSubscription = Linking.addEventListener('url', ({url}) => {
                if (url === null) {
                    return;
                }
                DeepLinking.handleNavigate(url);
            });
            return () => {
                linkingSubscription.remove();
            };
        },
    };

    static handleInitialNavigate = async (initialUrl: string | null) => {
        if (initialUrl === null) {
            return;
        }
        await DeepLinking.handleNavigate(initialUrl, true); // <- Данный метод добавим далее
    };

    static handleNavigate = async (url: string, isInitialNavigate?: boolean) => {
        const action = DeepLinking.getActionFromState(
            DeepLinking.linking.config,
            url,
        );
        switch (action?.type) {
            case 'NAVIGATE':
                const {name, params} = action.payload;
                if (name && params) {
                    if (isInitialNavigate) {
                        Navigation.replace(name, params);
                        return;
                    }
                    Navigation.navigate(name, params);
                }
                return;
        }
    };

    static getPathWithoutPrefix = (url: string) => {
        let path = '';
        DeepLinking.linking.prefixes.forEach(prefix => {
            if (url.indexOf(prefix) > -1) {
                path = url.replace(prefix, '');
                return;
            }
        });
        return path;
    };

    static getActionFromState = (config: any, url: string) => {
        const path = DeepLinking.getPathWithoutPrefix(url);
        const state = getStateFromPath(path, config);
        if (!state) {
            return;
        }
        return getActionFromState(state, config);
    };
}
