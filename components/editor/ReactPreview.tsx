import {LiveError, LivePreview, LiveProvider} from "react-live";
import {Code} from "../../lib/domain";
import {IFrame} from "../util/IFrame";

type Props = {
  code: Code
}

export const ReactPreview = (props: Props) => {
  const {code} = props
  return (
    <IFrame className={'border-none w-full h-full'}>
      <LiveProvider code={code.js}
                    noInline
                    transformCode={code => code.replace('ReactDOM.render', 'render')}>
        <style>
          {code.css}
        </style>
        <LivePreview className={'break-words whitespace-pre'}/>
        <LiveError className={'text-red-500 break-words whitespace-pre'}/>
      </LiveProvider>
    </IFrame>
  )
}