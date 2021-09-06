import {useCallback, useEffect, useState} from "react";
import {CodeEditor} from "./CodeEditor";
import {Code} from "./type";
import clsx from "clsx";
import {Ace} from "ace-builds";
import {ReactPreview} from "./ReactPreview";

export type ReactEditorProps = {
  code: Code
  className?: string
  hideCode?: boolean
}

export const ReactEditor = (props: ReactEditorProps) => {
  const [refs, setRefs] = useState<Partial<Record<keyof Code, Ace.Editor>>>({})
  const [type, setType] = useState<keyof Code>('js')
  const [code, setCode] = useState(props.code)
  useEffect(() => setCode(props.code), [props.code])
  useEffect(() => refs[type]?.resize(), [type, refs])

  return (
    <div className={'grid grid-cols-2 w-screen h-screen'}>
      <div className={'flex flex-col'}>
        <div className={'bg-black text-white text-lg flex flex-row items-center'}>
          <div
            className={clsx('mx-1 cursor-pointer hover:underline hover:text-gray-300', type === 'js' && 'underline')}
            onClick={() => setType('js')}
          >
            JSX
          </div>
          <div
            className={clsx('mx-1 cursor-pointer hover:underline hover:text-gray-300', type === 'css' && 'underline')}
            onClick={() => setType('css')}>
            CSS
          </div>
        </div>
        {['js', 'css'].map(t => (
          <div className={clsx('relative flex-grow', t === type ? 'block' : 'hidden')} key={t}>
            <CodeEditor
              onRef={r => setRefs(rs => ({...rs, [t]: r}))}
              code={code[t as keyof Code]}
              onCodeChange={useCallback((v) => setCode(c => ({...c, [t]: v})), [])}
              mode={t === 'js' ? 'jsx' : 'css'}/>
          </div>
        ))}
      </div>
      <div>
        <ReactPreview code={code}/>
      </div>
    </div>
  )
}