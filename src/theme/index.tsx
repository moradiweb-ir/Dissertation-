import React from "react";
import { ConfigProvider } from "antd";

function ThemePrivider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000000",
          borderRadius: 2,
          controlOutline: "none",
        },
        components: {
          Button: {
            controlHeight: 45,
            defaultBorderColor: "#000000",
          },
          Select: {
            controlHeight: 45,
          },
          Input: {
            controlHeight: 45,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemePrivider;
