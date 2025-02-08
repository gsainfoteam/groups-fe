export const notionLinkRegex =
  /^https:\/\/[a-zA-Z0-9-]+\.notion.site\/([a-zA-Z0-9-]+-)?([a-f0-9]{32})\??.*$/;

export const generalUrlRegex = /^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*.*/;

export const isInvalidNotionLink = (link: string) =>
  !notionLinkRegex.test(link) && link.length > 0;

export const isValidLink = (link: string) =>
  generalUrlRegex.test(link) || link.length === 0;

export const parseNotionPageId = (link: string) =>
  notionLinkRegex.test(link) ? link.match(notionLinkRegex)?.[2] : null;
