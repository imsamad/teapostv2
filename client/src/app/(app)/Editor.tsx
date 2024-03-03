"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState } from "react";

const editorOptions = {
  lineNumbers: true,
  spellChecker: false,
  placeholder: "Write...",
};

const extraKeys = {
  Up: function (cm: any) {
    cm.replaceSelection(" surprise. ");
  },
  Down: function (cm: any) {
    cm.replaceSelection(" surprise again! ");
  },
};

const Editor = () => {
  const [value, setValue] = useState("");
  return (
    <div>
      <SimpleMDE
        options={editorOptions}
        value={value}
        onChange={(val) => setValue(val)}
        // extraKeys={extraKeys}
      />
      {/* <div></div> */}
    </div>
  );
};

export default Editor;
