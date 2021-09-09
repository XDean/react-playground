import {useCallback, useEffect, useState} from "react";
import {CodeEditor} from "./CodeEditor";
import {Code} from "../../lib/domain";
import clsx from "clsx";
import {Ace} from "ace-builds";
import {ReactPreview} from "./ReactPreview";
import {useRouter} from "next/router";
import {BiArrowToLeft, BiArrowToRight, BiShareAlt} from 'react-icons/bi'
import copy from 'copy-to-clipboard';
import {compressToEncodedURIComponent} from 'lz-string'

export type ReactEditorProps = {
  code: Code
  className?: string
  hideCode?: boolean
}

export const ReactEditor = (props: ReactEditorProps) => {
  const [refs, setRefs] = useState<Partial<Record<keyof Code, Ace.Editor>>>({})
  const [type, setType] = useState<keyof Code>('js')
  const [code, setCode] = useState(props.code)
  const [showPreview, setShowPreview] = useState(true)
  const router = useRouter()
  useEffect(() => setCode(props.code), [props.code])
  useEffect(() => refs[type]?.resize(), [type, refs])
  useEffect(() => {
    setTimeout(() => refs[type]?.resize(), 300);
  }, [showPreview])
  useEffect(() => {
    const p = router.query.preview
    if (!!p && typeof p === 'string') {
      setShowPreview(p.toLowerCase() !== 'false')
    }
  }, [router])

  const onShare = () => {
    const js = compressToEncodedURIComponent(code.js)
    const css = compressToEncodedURIComponent(code.css)
    const url = `${window.location.origin}${window.location.pathname}?js=cmp:${js}&css=cmp:${css}`
    copy(url)
    alert('Share URL copied')
  }

  return (
    <div className={'w-full h-full flex flex-row'}>
      <div className={clsx('flex flex-col transition-all duration-300', showPreview ? 'w-6/12' : 'w-full')}>
        <div className={'bg-black text-white text-lg flex flex-row items-center space-x-2 px-2'}>
          <div className={clsx('link-btn', type === 'js' && 'active')}
               onClick={() => setType('js')}>
            JSX
          </div>
          <div className={clsx('link-btn', type === 'css' && 'active')}
               onClick={() => setType('css')}>
            CSS
          </div>
          <div className={'flex-grow'}/>
          <BiShareAlt className={'icon-btn !text-xl'}
                      title={'Share'}
                      onClick={onShare}
          />
          {showPreview ?
            <BiArrowToRight className={'icon-btn'}
                            title={'Hide Preview'}
                            onClick={() => setShowPreview(false)}/> :
            <BiArrowToLeft className={'icon-btn'}
                           title={'Show Preview'}
                           onClick={() => setShowPreview(true)}/>}
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
      <div className={clsx('transition-all duration-300', showPreview ? 'p-2 w-6/12' : 'p-0 w-0')}>
        <ReactPreview code={code}/>
      </div>
    </div>
  )
}