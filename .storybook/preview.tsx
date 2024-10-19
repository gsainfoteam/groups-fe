import React, { useEffect } from "react";

import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/locales/index";
import "../src/index.css";

import type { Preview, StoryContext, StoryFn } from "@storybook/react";

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

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en-US", title: "English" },
        { value: "ko-KR", title: "Korean" },
      ],
      showName: true,
    },
  },
};

const TranslationSuspenseFallback = () => <div>translation loading</div>;

const withI18next = (Story: StoryFn, context: StoryContext) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Suspense fallback={<TranslationSuspenseFallback />}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

export const decorators = [withI18next];

export default preview;
