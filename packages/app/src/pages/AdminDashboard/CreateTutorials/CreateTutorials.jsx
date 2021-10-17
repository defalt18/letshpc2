import React, { useCallback, useMemo, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import './CreateTutorial.css';

import { createTutorial } from '../../../services/admin-services';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const useStyles = makeStyles(() => ({
  textfields: {
    border: '#22272d',
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#2d333b',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: '#2d333b',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#2d333b',
    },
    '& .MuiOutlinedInput-input': {
      color: 'white',
    },
    '&:hover .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
      color: 'white',
    },
    '& .MuiInputLabel-outlined': {
      color: 'white',
    },
    '&:hover .MuiInputLabel-outlined': {
      color: 'white',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: 'white',
    },
  },
}));

function CreateTutorials() {
  const classes = useStyles();
  const [tutorial, setTutorial] = useState({
    title: '',
    theory: '',
    code: '',
    level: 'beginner',
    input: '',
    output: '',
    tags: Array,
    testcases: Array,
  });

  const notify = () => {
    toast.success('Tutorial added to collection !', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const issueAddition = useCallback(async () => {
    await createTutorial(tutorial);
    notify();
  }, [tutorial]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTutorial({ ...tutorial, [name]: value });
    },
    [tutorial, setTutorial],
  );

  const initialEditorState = useMemo(() => EditorState.createEmpty(), []);

  const [editorState, setEditorState] = useState(() => ({
    theory: initialEditorState,
    code: initialEditorState,
    input: initialEditorState,
    output: initialEditorState,
  }));

  const handleEditorChange = (state, editorName) => {
    setEditorState({ ...editorState, [editorName]: state });
    convertContentToHTML(editorName);
  };
  const convertContentToHTML = (editorName) => {
    setTutorial({
      ...tutorial,
      [editorName]: convertToHTML(editorState[editorName].getCurrentContent()),
    });
  };

  return (
    <div className="admin__content">
      <h1>Create a Tutorial</h1>
      <div className="create__tutorials">
        <label htmlFor={'title'}>Title</label>
        <input
          placeholder="Title"
          className="inputs"
          type="text"
          name="title"
          onChange={handleChange}
          id="name"
        />
        <Autocomplete
          id="combo-box-demo"
          options={['beginner', 'medium', 'advance']}
          value={tutorial.level}
          onChange={(e, value) => setTutorial({ ...tutorial, level: value })}
          getOptionLabel={(option) => option}
          style={{ width: '100%' }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Level"
              name="level"
              className={classes.textfields}
              variant="outlined"
            />
          )}
        />
        <label>Theory</label>
        <Editor
          editorState={editorState.theory}
          onEditorStateChange={(state) => handleEditorChange(state, 'theory')}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar"
        />

        <label>Code</label>
        <Editor
          editorState={editorState.code}
          onEditorStateChange={(state) => handleEditorChange(state, 'code')}
          wrapperClassName="wrapper-class"
          editorClassName="editor-code-class"
          toolbarClassName="toolbar"
        />
        <h3>Testcase Details : </h3>
        <label>Input</label>
        <Editor
          editorState={editorState.input}
          onEditorStateChange={(state) => handleEditorChange(state, 'input')}
          wrapperClassName="wrapper-class"
          editorClassName="editor-input-class"
          toolbarClassName="toolbar"
        />
        <label>Output</label>
        <Editor
          editorState={editorState.output}
          onEditorStateChange={(state) => handleEditorChange(state, 'output')}
          wrapperClassName="wrapper-class"
          editorClassName="editor-input-class"
          toolbarClassName="toolbar"
        />
        <Button onClick={issueAddition} style={{ background: '#2d333b', color: 'white' }}>
          Submit Tutorial
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateTutorials;
