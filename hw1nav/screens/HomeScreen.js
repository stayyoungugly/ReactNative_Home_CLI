import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {LangType} from "../lang/types/LangType";
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

export const HomeScreen = observer(({navigation}) => {

    const {langStore} = useRootStore()
    const {t} = useTranslation()

    useEffect(() => {
        langStore.getLang();
    }, [])

    console.log(langStore.lang)
    const handleChangeLang = async () => {
        await langStore.changeLang(
            LangType.RU === langStore.lang ? LangType.EN : LangType.RU,
        );
    };

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.content]}>
                <Text>{t('main.screens.home.title')}</Text>
                <TouchableOpacity style={[styles.buttonFirst]}
                                  onPress={() => handleChangeLang()}>
                    <Text style={styles.appButtonText}>{t('main.screens.home.button')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
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
        marginTop: 30,
        justifyContent:
            "center",
        alignItems:
            "center",
        backgroundColor:
            'seagreen',
    }
    ,
    titleText: {
        color: 'black',
        fontSize:
            20,
    }
    ,
    appButtonText: {
        color: 'white',
        fontSize:
            16,
        textAlign: "center"
    },
    loader: {
        flex: 1,
        alignContent: "center",
    }
});