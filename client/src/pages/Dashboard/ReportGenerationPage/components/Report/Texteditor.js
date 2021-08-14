import React, { useEffect, useState, useRef } from "react";

import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Texteditor.css";

import katex from "katex";
import "katex/dist/katex.css";

// MathQuill dependency
import "./jquery";
import "mathquill/build/mathquill.js";
import "mathquill/build/mathquill.css";

// mathquill4quill include
import mathquill4quill from "mathquill4quill";
import "mathquill4quill/mathquill4quill.css";

window.katex = katex;

const CUSTOM_OPERATORS = [
    ["\\pm", "\\pm"],
    ["\\sqrt{x}", "\\sqrt"],
    ["\\sqrt[3]{x}", "\\sqrt[3]{}"],
    ["\\sqrt[n]{x}", "\\nthroot"],
    ["\\frac{x}{y}", "\\frac"],
    ["\\sum^{s}_{x}{d}", "\\sum"],
    ["\\prod^{s}_{x}{d}", "\\prod"],
    ["\\coprod^{s}_{x}{d}", "\\coprod"],
    ["\\int^{s}_{x}{d}", "\\int"],
    ["\\binom{n}{k}", "\\binom"],
];

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["image", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["clean"],
    ["formula"],
];

export default function TextEditor(props) {
    const { saveReport, initialData } = props;
    const reactQuill = useRef();
    const [text, setText] = useState(initialData);

    useEffect(() => {
        const enableMathQuillFormulaAuthoring = mathquill4quill({
            Quill,
            katex,
        });
        const displayHistory = false;
        const operators = CUSTOM_OPERATORS;
        const options = { displayHistory, operators };
        enableMathQuillFormulaAuthoring(reactQuill.current.editor, options);
    }, [reactQuill]);

    return (
        <ReactQuill
            ref={reactQuill}
            id="editor"
            className="container"
            modules={{
                formula: true,
                toolbar: TOOLBAR_OPTIONS,
            }}
            placeholder="Type text here..."
            theme="snow"
            value={text}
            onChange={(value) => {
                setText(value);
                saveReport(value);
            }}
        />
    );
}
