import {Text, View} from "react-native";
import {useRootStore} from "../hooks/useRootStore";
import {useTranslation} from "react-i18next";

export default function NewsScreen({}) {

    const {t} = useTranslation()

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>{t('main.screens.news')}</Text>
        </View>
    )
}