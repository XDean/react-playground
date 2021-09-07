import {ReactEditor} from "../components/editor/ReactEditor";
import {GetServerSideProps} from 'next'
import {Code, CodeTypes} from "../lib/domain";
import {CONSTANTS} from "../lib/constants";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

type Props = {
  code: Code
}

const Page = (props: Props) => {
  const {code} = props
  return (
    <div className={'h-screen w-screen'}>
      <ReactEditor code={code}/>
    </div>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const code: Code = {
    js: CONSTANTS.HELLO_WORLD_JS,
    css: '',
  }
  for (const key of CodeTypes) {
    const path = ctx.query[key]
    if (!!path && typeof path === 'string') {
      code[key] = await fetch(path)
        .then(e => e.ok ? e.text() : `Resource ${path} not correct, response ${e.status}`)
        .catch(e => `Fail to fetch ${path}: ${e.toString()}`)
    }
  }
  return {
    props: {
      code: code
    }
  }
}
