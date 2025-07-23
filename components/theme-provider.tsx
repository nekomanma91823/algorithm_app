"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

// カスタムテーマの型定義
export type DesignTheme = "glassmorphism" | "simple";

interface DesignThemeContextType {
  designTheme: DesignTheme;
  setDesignTheme: (theme: DesignTheme) => void;
}

const DesignThemeContext = React.createContext<DesignThemeContextType | undefined>(undefined);

export function useDesignTheme() {
  const context = React.useContext(DesignThemeContext);
  if (!context) {
    throw new Error("useDesignTheme must be used within a DesignThemeProvider");
  }
  return context;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [designTheme, setDesignTheme] = React.useState<DesignTheme>("glassmorphism");

  // ローカルストレージからテーマを復元
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("design-theme") as DesignTheme;
    if (savedTheme && (savedTheme === "glassmorphism" || savedTheme === "simple")) {
      setDesignTheme(savedTheme);
    }
  }, []);

  // テーマ変更時にローカルストレージに保存
  const handleSetDesignTheme = React.useCallback((theme: DesignTheme) => {
    setDesignTheme(theme);
    localStorage.setItem("design-theme", theme);
  }, []);

  return (
    <NextThemesProvider {...props}>
      <DesignThemeContext.Provider value={{ designTheme, setDesignTheme: handleSetDesignTheme }}>
        {children}
      </DesignThemeContext.Provider>
    </NextThemesProvider>
  );
}
