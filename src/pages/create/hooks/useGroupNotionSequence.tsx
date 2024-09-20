import useDebouncedState from "@/hooks/useDebouncedState";

const useGroupNotionSequence = () => {
  const [link, setLink] = useDebouncedState<string>("");

  const notionRegex =
    /^https:\/\/[a-zA-Z0-9-]+\.notion.site\/[a-zA-Z0-9-]+-([a-f0-9]{32})$/;
  const isInvalidNotionLink = !notionRegex.test(link) && link.length > 0;

  const urlRegex = /^https?:\/\/[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*.*/;
  const isValidLink = urlRegex.test(link) || link.length === 0;
  return {
    setLink,
    isValidLink,
    isInvalidNotionLink,
    isNextButtonValid: isValidLink && !isInvalidNotionLink && link.length > 0,
  };
};

export default useGroupNotionSequence;
