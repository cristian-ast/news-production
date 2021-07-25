import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const handleChange = (content) => {
	console.log(content); //Get Content Inside Editor
}

const TextEditor = props => {
  return (
    <div>
      <SunEditor onChange={handleChange} setDefaultStyle="font-size: 14px;" />
    </div>
  );
};

export default TextEditor;