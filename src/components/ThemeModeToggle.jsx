'use client'
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeModeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const handleToggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

    useEffect(() => {
        setMounted(true);
    }, []);


    if (!mounted) {
        return null;
    }

    return (
        <div onClick={handleToggleTheme} className={'transition-all duration-500 w-6 h-6 rounded-full flex justify-between items-center p-1 relative cursor-pointer'}>
            {
                theme==='dark' ? '🔆' : '🌙'
            }

        </div>
    );
};

export default ThemeModeToggle;
