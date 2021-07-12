import React, { useEffect, useState, useCallback } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './Texteditor.css'

const TOOLBAR_OPTIONS = [
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ font: [] }],
	[{ align: [] }],
	['bold', 'italic', 'underline', 'strike'],
	[{ color: [] }, { background: [] }],
	['image', 'blockquote', 'code-block'],
	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ script: 'sub' }, { script: 'super' }],
	[{ indent: '-1' }, { indent: '+1' }],
	['clean']
]

export default function TextEditor(props) {
	const { saveReport, initialData } = props

	const [quill, setQuill] = useState()

	const sendData = useCallback(() => {
		saveReport(quill.getContents())
	}, [saveReport, quill])

	useEffect(() => {
		if (quill == null) return
		if (initialData) {
			quill.setContents(initialData.ops)
		} else {
			quill.setContents([{ insert: '' }])
		}
		quill.on('text-change', () => sendData())
		quill.enable()

		return () => {
			quill.off('text-change', () => console.log('Quill Says Bye'))
		}
	}, [quill, initialData, sendData])

	const wrapperRef = useCallback((wrapper) => {
		if (wrapper == null) return

		wrapper.innerHTML = ''
		const editor = document.createElement('div')
		wrapper.append(editor)
		const q = new Quill(editor, {
			theme: 'snow',
			modules: { toolbar: TOOLBAR_OPTIONS }
		})

		q.disable()
		q.setText('Loading...')
		setQuill(q)
	}, [])
	return <div className='container' ref={wrapperRef}></div>
}
