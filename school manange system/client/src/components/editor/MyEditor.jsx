import  { useState } from 'react';
import ReactQuill from 'react-quill';
// import { BiBold, BiItalic, BiUnderline, BiLink, BiImage, BiVideo } from 'react-icons/bi';
import 'react-quill/dist/quill.snow.css';
import './editor.css'
const MyEditor = () => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  const toolbarOptions =  [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['link', 'image',],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  

    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'color', 'background',
    'align',
    'link', 'image', 'video'
  ];

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={{ toolbar: toolbarOptions }}
        formats={formats}
        // placeholder="Digite seu texto aqui..."
        theme="snow"
        bounds=".main-article"
        style={{height: '100%'}}
      />
    </div>
  );
};

export default MyEditor;