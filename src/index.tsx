// import React from "react";
import { ConfigProvider } from "antd";
import en_US from "antd/locale/en_US";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

// const primaryButtonColor = "#FF0000";
root.render(
  <ConfigProvider
    locale={en_US}
    theme={{
      token: {
        colorPrimary: "#0c377c",
      },
      components: {
        // Button theme
        Button: {
          colorPrimary: "#FFBA00",
          borderRadius: 27,
          colorPrimaryHover: "rgba(255, 186, 0, .7)",
        },

        Layout: {
          //header theme
          headerBg: "white",
          colorText: "#6C6C6C",
        },
        Menu: {
          // Sidebar them
          colorText: "#A6A6A6",
          colorLinkActive: "#0C377C",
          itemBg: "#023047", // menu bg color
          itemSelectedColor: "white", // menu item selected text color
          itemBorderRadius: 0,
          colorPrimaryBorder: "2px solid green",
          itemHoverBg: "none",
          itemHoverColor: "white",
        },
        Breadcrumb: {
          lastItemColor: "#0C377C",
          linkColor: "#0C377C",
          separatorColor: "#0C377C",
        },
        Input: {
          colorBorder: "#A6A6A6",
          borderRadius: 4,
        },
        Select: {
          colorBorder: "#A6A6A6",
          borderRadius: 4,
        },
      },
    }}
  >
    <App />
  </ConfigProvider>,
);

reportWebVitals();
