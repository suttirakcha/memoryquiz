import { Moon, Sun } from "lucide-react";
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  ThemeSwitcher: React.FC<{ className: string }>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme-storage") || "light");

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme-storage", theme);
  }, [theme])

  const ThemeSwitcher = ({ className } : { className?: string }) => {
    const iconClassName = "w-8 h-8";
    const handleSwitchTheme = () => {
      setTheme(prev => prev === "dark" ? "light" : "dark");
    };
    return (
      <div className={className}>
        <p>Current theme: {theme}</p>
        <button onClick={handleSwitchTheme}>
          {theme === "light" ? <Moon className={iconClassName}/> : <Sun className={iconClassName}/>}
        </button>
      </div>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, ThemeSwitcher }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export { useTheme, ThemeProvider };
