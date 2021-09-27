import React, { FC, useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';

interface props {
  setPostContent: (text: string) => void;
  className: string;
  initial?: string;
}

const MyEditor:FC<props> = ({ setPostContent, className, initial }) => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  useEffect(() => {
    if (initial) {
      const contentBlock = htmlToDraft(initial);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const textedState = EditorState.createWithContent(contentState);
        setEditorState(textedState);
      }
    }
  }, [])

  const setComponentState = (newState: EditorState) => {
    setEditorState(newState);
    const text = draftToHtml(convertToRaw(newState.getCurrentContent()));
    setPostContent(text);
  }

  return (
    <>
      <div />
      <Editor
        editorState={editorState}
        toolbarClassName=""
        wrapperClassName={className}
        editorClassName="border"
        onEditorStateChange={setComponentState}
      />
    </>
  );
}

export default MyEditor;
