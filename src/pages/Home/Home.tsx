import { Button } from "@/components/ui/button";
import { ThemeContext } from "@/theme/ThemeConfig";

import { useContext } from "react";

export default function Home() {
    const { theme, setTheme } = useContext(ThemeContext);

    const handleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div className={`${theme}`}>
            <div className="w-full h-screen dark:bg-slate-900 ">
                <Button className="bg-red-600" onClick={handleTheme}>
                    Click me
                </Button>
            </div>
        </div>
    );
}
