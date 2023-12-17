import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {LangType} from "../modules/lang/types/LangType";
import {useRootStore} from "../hooks/useRootStore";
import {observer} from "mobx-react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import {useTheme} from "../modules/theme/hooks/useTheme";
import {ThemeTypes} from "../modules/theme/ThemeTypes";

export const HomeScreen = observer(({navigation}) => {

    const {langStore} = useRootStore()
    const {t} = useTranslation()

    const {Colors, selectTheme, changeTheme} = useTheme();
    const styles = useStyles(Colors);

    useEffect(() => {
        langStore.getLang();
    }, [])

    console.log(langStore.lang)
    const handleChangeLang = async () => {
        await langStore.changeLang(
            LangType.RU === langStore.lang ? LangType.EN : LangType.RU,
        );
    }

    const handleChangeTheme = async () => {
        changeTheme(selectTheme === ThemeTypes.LIGHT ? ThemeTypes.DARK : ThemeTypes.LIGHT)
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.content]}>
                <Text style={styles.titleText}>{t('main.screens.home.title')}</Text>
                <TouchableOpacity style={[styles.buttonFirst]}
                                  onPress={() => handleChangeLang()}>
                    <Text style={styles.appButtonText}>{t('main.screens.home.buttonLanguage')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonSecond]}
                                  onPress={() => handleChangeTheme()}>
                    <Text style={styles.appButtonText}>{t('main.screens.home.buttonTheme')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
});

const useStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.backgroundPrimary
    }
    ,
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonFirst: {
        width: 160,
        height:
            50,
        marginTop: 100,
        justifyContent:
            "center",
        alignItems:
            "center",
        backgroundColor:
        colors.buttonPrimary
    },
    buttonSecond: {
        width: 160,
        height:
            50,
        marginTop: 30,
        justifyContent:
            "center",
        alignItems:
            "center",
        backgroundColor:
        colors.buttonSecondary
    }
    ,
    titleText: {
        color: colors.textPrimary,
        fontSize:
            20,
        fontFamily: "Gilroy-Black",
    }
    ,
    appButtonText: {
        color: colors.textSecondary,
        fontSize:
            16,
        textAlign: "center",
        fontFamily: "Gilroy-Medium"
    },
    loader: {
        flex: 1,
        alignContent: "center",
    }
});