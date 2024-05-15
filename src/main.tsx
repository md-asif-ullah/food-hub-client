import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.tsx";
import Theme from "./theme/theme.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/Store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Toaster />
    </Theme>
  </React.StrictMode>
);
