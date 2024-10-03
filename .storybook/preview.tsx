import React from "react";

import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/locales/index";
import "../src/index.css";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

const TranslationSuspenseFallback = () => <div>translation loading</div>;

const withI18next = (Story) => (
  <Suspense fallback={<TranslationSuspenseFallback />}>
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  </Suspense>
);

export const decorators = [withI18next];

export default preview;
