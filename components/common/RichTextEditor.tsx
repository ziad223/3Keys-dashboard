'use client'

import React, { useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { 
  Link2, 
  Image as ImageIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  ChevronDown,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react'

const RichTextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'right',
      }),
      Placeholder.configure({
        placeholder: 'محتوى المقال هنا...',
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#00614E] underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-md max-w-full h-auto',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'w-full h-full min-h-[150px] outline-none text-[13px] text-[#30343F] p-4 prose prose-sm max-w-none text-right',
        dir: 'rtl'
      },
    },
    immediatelyRender: false,
  })

  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) return

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Image URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }

  const toggleHeading = () => {
    if (editor.isActive('heading', { level: 1 })) {
      editor.chain().focus().toggleHeading({ level: 2 }).run()
    } else if (editor.isActive('heading', { level: 2 })) {
      editor.chain().focus().toggleHeading({ level: 3 }).run()
    } else if (editor.isActive('heading', { level: 3 })) {
      editor.chain().focus().setParagraph().run()
    } else {
      editor.chain().focus().toggleHeading({ level: 1 }).run()
    }
  }

  const getHeadingLabel = () => {
    if (editor.isActive('heading', { level: 1 })) return 'Heading 1'
    if (editor.isActive('heading', { level: 2 })) return 'Heading 2'
    if (editor.isActive('heading', { level: 3 })) return 'Heading 3'
    return 'Normal'
  }

  const toggleAlign = () => {
    if (editor.isActive({ textAlign: 'right' })) {
      editor.chain().focus().setTextAlign('center').run()
    } else if (editor.isActive({ textAlign: 'center' })) {
      editor.chain().focus().setTextAlign('left').run()
    } else {
      editor.chain().focus().setTextAlign('right').run()
    }
  }

  const getAlignIcon = () => {
    if (editor.isActive({ textAlign: 'center' })) return <AlignCenter size={15} />
    if (editor.isActive({ textAlign: 'left' })) return <AlignLeft size={15} />
    return <AlignRight size={15} />
  }

  const getAlignLabel = () => {
    if (editor.isActive({ textAlign: 'center' })) return 'Center'
    if (editor.isActive({ textAlign: 'left' })) return 'Left-aligned'
    return 'Right-aligned'
  }

  return (
    <div className="w-full border border-[#D9D8D4] h-[238px] rounded-[12px] bg-white overflow-hidden focus-within:border-[#00614E] transition-colors">
      <div className="flex flex-wrap items-center gap-1 sm:gap-2 px-3 py-2 border-b border-[#D9D8D4] bg-[#F4F3EF]" dir="rtl">
        <button 
          type="button" 
          onClick={toggleHeading}
          className={`flex items-center gap-2 px-2 py-1.5 text-[12px] font-medium text-[#4E525D] bg-white border border-[#D9D8D4] rounded-[6px] hover:bg-gray-50 transition-colors ${
            editor.isActive('heading') ? 'border-[#00614E] text-[#00614E]' : ''
          }`}
        >
          <span className="min-w-[45px] text-left">{getHeadingLabel()}</span>
          <ChevronDown size={14} />
        </button>

        <div className="w-[1px] h-4 bg-[#D9D8D4] mx-1"></div>

        <button 
          type="button" 
          onClick={setLink}
          className={`w-7 h-7 flex items-center justify-center rounded-[6px] text-[#4E525D] hover:bg-white transition-colors ${
            editor.isActive('link') ? 'bg-white text-[#00614E] shadow-sm' : ''
          }`}
        >
          <Link2 size={15} />
        </button>
        <button 
          type="button" 
          onClick={addImage}
          className="w-7 h-7 flex items-center justify-center rounded-[6px] text-[#4E525D] hover:bg-white transition-colors"
        >
          <ImageIcon size={15} />
        </button>

        <div className="w-[1px] h-4 bg-[#D9D8D4] mx-1"></div>

        <button 
          type="button" 
          onClick={toggleAlign}
          className="flex items-center gap-1.5 px-2 py-1.5 text-[12px] font-medium text-[#4E525D] bg-white border border-[#D9D8D4] rounded-[6px] hover:bg-gray-50 transition-colors min-w-[120px]"
        >
          {getAlignIcon()}
          <span className="flex-1 text-left">{getAlignLabel()}</span>
          <ChevronDown size={14} />
        </button>
        
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`w-7 h-7 flex items-center justify-center rounded-[6px] text-[#4E525D] hover:bg-white transition-colors ${
            editor.isActive('bulletList') ? 'bg-white text-[#00614E] shadow-sm' : ''
          }`}
        >
          <List size={15} />
        </button>

        <div className="w-[1px] h-4 bg-[#D9D8D4] mx-1"></div>

        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`w-7 h-7 flex items-center justify-center rounded-[6px] text-[#4E525D] hover:bg-white transition-colors font-bold ${
            editor.isActive('bold') ? 'bg-white text-[#00614E] shadow-sm' : ''
          }`}
        >
          <Bold size={15} />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`w-7 h-7 flex items-center justify-center rounded-[6px] text-[#4E525D] hover:bg-white transition-colors italic ${
            editor.isActive('italic') ? 'bg-white text-[#00614E] shadow-sm' : ''
          }`}
        >
          <Italic size={15} />
        </button>
        <button 
          type="button" 
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`w-7 h-7 flex items-center justify-center rounded-[6px] text-[#4E525D] hover:bg-white transition-colors underline ${
            editor.isActive('underline') ? 'bg-white text-[#00614E] shadow-sm' : ''
          }`}
        >
          <UnderlineIcon size={15} />
        </button>
      </div>

      <div className="bg-white min-h-[150px] relative">
        <EditorContent editor={editor} />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: right;
          color: #999894;
          pointer-events: none;
          height: 0;
        }
      `}} />
    </div>
  )
}

export default RichTextEditor
