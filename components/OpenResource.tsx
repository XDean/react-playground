import {useState} from "react";

export const OpenResource = () => {
  const [js, setJS] = useState('')
  const [css, setCSS] = useState('')
  const onConfirm = () => {
    window.open(`${window.location.href.split('?')[0]}editor?js=${js}&css=${css}`, '_blank')
  }
  return (
    <div className={'space-y-1'}>
      <div className={'flex flex-col'}>
        JS
        <input className={'w-11/12'} value={js} onChange={e => setJS(e.target.value)}/>
      </div>
      <div className={'flex flex-col'}>
        CSS
        <input className={'w-11/12'} value={css} onChange={e => setCSS(e.target.value)}/>
      </div>
      <div>
        <button onClick={onConfirm}>
          GO
        </button>
      </div>
    </div>
  )
}