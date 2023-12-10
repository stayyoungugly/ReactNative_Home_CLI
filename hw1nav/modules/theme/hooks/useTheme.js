import { ThemeContext } from "../ThemeProvider";
import { useContext, useMemo } from "react";
import IColors from "../IColors";
import { Colors } from "../../../styles/Colors";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const colors = useMemo(() => {
    const result = {};
    const keys = Object.keys(Colors);

    for (let i = 0; i < keys.length; i++) {
      const colorObject = Colors[keys[i]];

      if (context.theme in colorObject) {
        Object.assign(result, {[keys[i]]: colorObject[context.theme]});
      }
    }

    return result;
    }, [context.theme]);

  return {Colors: colors, ...context};
};
