import React from 'react'
import {useEditor, EditorContent, extensions} from '@tiptap/react'
import {StarterKit} from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline';
 
function RealTimeEditor() {
        const editor = useEditor(
            {
                extensions:[StarterKit],
                content: '<p className = "text-gray-600">Type your content here...</p>',
            }
        );
  return (
    <div>
    <div className="border p-4 rounded">
        <EditorContent editor={editor} />
    </div>
    </div>
  )
}

export default RealTimeEditor
