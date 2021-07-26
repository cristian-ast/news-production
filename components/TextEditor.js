import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const TextEditor = ({setNewsContent}) => {

  const handleChange = (content) => {
    setNewsContent(content);
  }

  return (
    <div>
      <SunEditor 
        onChange={handleChange} 
        setDefaultStyle="font-size: 16px;" 
        setOptions={{height: 350}}
        placeholder="Please type here..."
      />
    </div>
  );
};

export default TextEditor;