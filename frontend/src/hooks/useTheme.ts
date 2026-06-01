import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      return "light";
    }

    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () =>
      setTheme((prev) =>
        prev === "dark" ? "light" : "dark"
      ),
  };
}