'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ColorTheme = string; // e.g. "theme-blue"
export type Mode = 'system' | 'light' | 'dark';

interface ThemeContextValue {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  availableThemes: ColorTheme[];
  mode: Mode;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
  isSystemDark: boolean;
}

const LS_COLOR_KEY = 'color-theme';
const LS_MODE_KEY = 'theme-mode';

const readLocal = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeLocal = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

function disableTransitionsTemporarily() {
  if (typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.setAttribute('data-theme-disable-transitions', '');
  style.textContent = `
    *,
    *::before,
    *::after {
      transition: none !important;
      animation: none !important;
    }
  `;
  document.head.appendChild(style);

  requestAnimationFrame(() => {
    style.remove();
  });
}

function ThemeScript({ colorThemes }: { colorThemes: string[] }) {
  const themesJSON = JSON.stringify(colorThemes);
  const script = `(() => {
    try {
      const colorThemes = ${themesJSON};
      const LS_COLOR_KEY = "${LS_COLOR_KEY}";
      const LS_MODE_KEY = "${LS_MODE_KEY}";
      const html = document.documentElement;
      const savedColor = localStorage.getItem(LS_COLOR_KEY);
      const savedMode = localStorage.getItem(LS_MODE_KEY);
      const mode = savedMode === "light" || savedMode === "dark" ? savedMode : "system";
      
      // remove existing theme classes
      colorThemes.forEach(t => html.classList.remove(t));
      html.classList.remove("dark", "light");

      // apply color theme if valid
      if (savedColor && colorThemes.includes(savedColor)) {
        html.classList.add(savedColor);
      }

      // determine dark/light
      const isSystemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const darkActive = mode === "dark" || (mode === "system" && isSystemDark);
      html.classList.add(darkActive ? "dark" : "light");

      // set color-scheme property
      try {
        html.style.colorScheme = darkActive ? "dark" : "light";
      } catch {}
    } catch (e) {}
  })();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}

interface ProviderProps {
  children: ReactNode;
  colorThemes: ColorTheme[];
  defaultColorTheme?: ColorTheme;
  defaultMode?: Mode;
}

function ThemeProvider({
  children,
  colorThemes,
  defaultColorTheme = colorThemes[0] ?? 'default-theme',
  defaultMode = 'system',
}: ProviderProps) {
  const themeSet = useMemo(() => new Set(colorThemes), [colorThemes]);

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    if (typeof window === 'undefined') return defaultColorTheme;
    const saved = readLocal(LS_COLOR_KEY);
    return saved && themeSet.has(saved) ? saved : defaultColorTheme;
  });

  const [mode, setModeState] = useState<Mode>(() => {
    if (typeof window === 'undefined') return defaultMode;
    const saved = readLocal(LS_MODE_KEY) as Mode | null;
    return saved === 'light' || saved === 'dark' || saved === 'system'
      ? (saved as Mode)
      : defaultMode;
  });

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const [isSystemDark, setIsSystemDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setIsSystemDark(e.matches);

    try {
      mq.addEventListener('change', handler);
    } catch {
      mq.addListener(handler);
    }

    return () => {
      try {
        mq.removeEventListener('change', handler);
      } catch {
        mq.removeListener(handler);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const html = document.documentElement;

    disableTransitionsTemporarily();

    // remove existing color theme classes
    colorThemes.forEach((t) => html.classList.remove(t));
    html.classList.remove('dark', 'light');

    // add current theme
    if (themeSet.has(colorTheme)) html.classList.add(colorTheme);

    // add dark/light class
    const darkActive = mode === 'dark' || (mode === 'system' && isSystemDark);
    html.classList.add(darkActive ? 'dark' : 'light');

    // update color-scheme property
    try {
      html.style.colorScheme = darkActive ? 'dark' : 'light';
    } catch {}

    writeLocal(LS_COLOR_KEY, colorTheme);
    writeLocal(LS_MODE_KEY, mode);
  }, [colorTheme, mode, isSystemDark, colorThemes, themeSet]);

  const setColorTheme = useCallback(
    (t: ColorTheme) => {
      if (!themeSet.has(t)) return;
      setColorThemeState(t);
    },
    [themeSet]
  );

  const setMode = (m: Mode) => {
    if (m !== 'light' && m !== 'dark' && m !== 'system') return;
    setModeState(m);
    if (m === 'system') {
      setIsSystemDark(
        typeof window !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
  };

  const toggleMode = () => {
    setModeState((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const value = useMemo(
    (): ThemeContextValue => ({
      colorTheme,
      setColorTheme,
      availableThemes: [...colorThemes],
      mode,
      setMode,
      toggleMode,
      isSystemDark,
    }),
    [colorTheme, setColorTheme, colorThemes, mode, isSystemDark]
  );

  if (!hydrated) return <ThemeScript colorThemes={colorThemes} />;

  return (
    <>
      <ThemeScript colorThemes={colorThemes} />
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </>
  );
}

export { ThemeProvider, useTheme };
