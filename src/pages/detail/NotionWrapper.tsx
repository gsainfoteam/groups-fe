// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";
// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";
// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import "./styles.css";

import * as React from 'react'
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import 'react-notion-x/src/styles.css'

const NotionWrapper = ({ recordMap}: { recordMap: ExtendedRecordMap }) => {
  if (!recordMap) {
    return null;
  }
  return <NotionRenderer 
  recordMap={recordMap} 
  fullPage={false} 
  />
};

export default NotionWrapper;
