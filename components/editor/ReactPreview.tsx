import {LiveError, LivePreview, LiveProvider} from "react-live";
import {Code} from "./type";

type Props = {
  code: Code
}

export const ReactPreview = (props: Props) => {
  const {code} = props
  return (
    <LiveProvider code={code.js}
                  noInline
                  transformCode={code => code.replace('ReactDOM.render', 'render')}>
      <style>
        {code.css}
      </style>
      <LivePreview/>
      <LiveError className={'text-red-500'}/>
    </LiveProvider>
  )
}