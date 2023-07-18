import React from "react";
import type { Preview } from "@storybook/react";
import { ThemeProvider } from "../src/contexts/ThemeContext";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: ["Atoms", "Molecules", "Organisms"],
      }
    }
  },
};

export const globalTypes = {
  themeMode: {
    name: "Theme Mode",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      // array of plain string values or MenuItem shape (see below)
      items: ["light", "dark"],
      // Property that specifies if the name of the item will be displayed
      showName: true,
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story, context) => (
    <ThemeProvider mode={context.globals.themeMode}>
      <div style={{ background: 'var(--background)', padding: 20, borderRadius: 10 }}>
        <Story />
      </div>
    </ThemeProvider>
  )
];
    

export default preview;
