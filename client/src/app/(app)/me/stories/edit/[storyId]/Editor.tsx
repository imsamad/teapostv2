"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

// import MarkdownPreview from "@uiw/react-markdown-preview";
const editorOptions = {
  lineNumbers: true,
  spellChecker: false,
  placeholder: "Write...",
};

const Editor = ({ field }: any) => {
  return (
    <SimpleMDE
      style={{
        width: "100%",
      }}
      options={editorOptions}
      {...field}
    />
  );
};

export default Editor;
