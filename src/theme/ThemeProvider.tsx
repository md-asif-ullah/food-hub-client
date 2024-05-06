import { ReactNode, useContext } from "react";
import { ThemeContext } from "./ThemeConfig";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const { theme } = useContext(ThemeContext);

    return <div className={`${theme}`}>{children}</div>;
};

export default ThemeProvider;
