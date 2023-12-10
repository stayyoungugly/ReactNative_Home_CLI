import { createContext, useEffect, useState } from "react";
import { ThemeTypes } from "./ThemeTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

const THEME_KEY = '@THEME';
export const ThemeContext = createContext(undefined);
class IProps {
  children
}

export const ThemeProviders = ({children}) => {
  const [theme, setTheme] = useState(ThemeTypes.LIGHT);
  const [selectTheme, setSelectTheme] = useState(ThemeTypes.LIGHT);

  useEffect(() => { (async () => {
    const savedTheme = (await AsyncStorage.getItem(THEME_KEY));
    if (!savedTheme) {
      return;
    }
    changeTheme(savedTheme); })();
  }, []);

  useEffect(() => {
    let listener;
    if (selectTheme === ThemeTypes.SYSTEM) {
      listener = Appearance.addChangeListener(({colorScheme}) => {
        if (colorScheme) {
          setTheme(colorScheme);
        } }
      );
    }

    return () => {
      if (listener) {
        listener.remove();
      }
    };
  }, [selectTheme]);

  const changeTheme = (newTheme) => {
    setSelectTheme(newTheme);
    AsyncStorage.setItem(THEME_KEY, newTheme);

    if (newTheme === ThemeTypes.SYSTEM) {
      const colorScheme = Appearance.getColorScheme();

      if (colorScheme) {
        setTheme(colorScheme);
      }
    } else {
      setTheme(newTheme); }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        selectTheme,
        changeTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  )
};
