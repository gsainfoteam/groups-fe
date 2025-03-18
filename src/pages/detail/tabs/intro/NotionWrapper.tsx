// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import "./styles.css";
import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import { Equation } from "react-notion-x/build/third-party/equation";
import { Modal } from "react-notion-x/build/third-party/modal";
import { Pdf } from "react-notion-x/build/third-party/pdf";

import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

const NotionWrapper = ({ recordMap }: { recordMap: ExtendedRecordMap }) => {
  if (!recordMap) {
    return null;
  }
  console.log(recordMap);
  const mediaQeury = window.matchMedia("(prefers-color-scheme: dark)");
  return (
    <NotionRenderer
      recordMap={recordMap}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
      }}
      fullPage={false}
      darkMode={mediaQeury.matches}
    />
  );
};

export default NotionWrapper;
