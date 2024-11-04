import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ value, onChange, maxLength }) => {
  const quill = useRef();
  const [contentLength, setContentLength] = useState(0);

  useEffect(() => {
    if (value) {
      const text = quill.current?.getEditor().getText().trim(); 
      setContentLength(text.length);
    } else {
      setContentLength(0);
    }
  }, [value]);

  const handleTextChange = useCallback((delta, old, source) => {
    const quillInstance = quill.current.getEditor();
    if (maxLength && quillInstance.getLength() > maxLength) {
      const excess = quillInstance.getLength() - maxLength;
      quillInstance.deleteText(maxLength, excess);
    }
  }, [maxLength]);
  

  useEffect(() => {
    if (!quill.current) return;

    const quillInstance = quill.current.getEditor();
    quillInstance.on('text-change', handleTextChange);

    return () => {
      quillInstance.off('text-change', handleTextChange);
    };
  }, [handleTextChange]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );
  console.log(value)

  return (
    <div>
      <QuillEditor
        ref={(el) => (quill.current = el)}
        theme="snow"
        value={value}
        modules={modules}
        onChange={onChange}
        style={{ height: '200px' }}
      />
<p>le nombre de caractere ecrit est {contentLength}</p><p> le nombre maximale est{maxLength} est caractere</p> 
   </div>
  );
};

export default Editor;