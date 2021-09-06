import {ReactEditor} from "../components/editor/ReactEditor";
import {GetServerSideProps} from 'next'
import {Code, CodeTypes} from "../components/editor/type";

type Props = {
  code: Code
}

const Page = (props: Props) => {
  const {code} = props
  console.log(code)
  return <ReactEditor code={code}/>
}

export default Page

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const code: Code = {
    js: defaultJS,
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

const defaultJS = `const App = () => (
  <h1>
    Hello, world!
  </h1>
)

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);`