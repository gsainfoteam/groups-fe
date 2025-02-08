// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import "./styles.css";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

const NotionWrapper = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  if (!recordMap) {
    return null;
  }
  const mediaQeury = window.matchMedia('(prefers-color-scheme: dark)');
  return <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={mediaQeury.matches}/>;
};

export default NotionWrapper;
