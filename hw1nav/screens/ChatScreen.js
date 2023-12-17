import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useTheme} from "../modules/theme/hooks/useTheme";
import React from "react";

export default function ChatScreen({}) {

    const {t} = useTranslation()

    const {Colors, selectTheme, changeTheme} = useTheme();
    const styles = useStyles(Colors);

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.content]}>
                <Text style={styles.titleText}>{t('main.screens.chat')}</Text>
            </View>
        </SafeAreaView>
    )
}

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
    }
    ,
    titleText: {
        color: colors.textPrimary,
        fontSize:
            20,
        fontFamily: "Gilroy-Black"
    }
});