import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ThemeConfig from "./theme/ThemeConfig.tsx";
import ThemeProvider from "./theme/ThemeProvider.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeConfig>
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </ThemeConfig>
    </React.StrictMode>
);
