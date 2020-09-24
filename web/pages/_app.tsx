import {Provider} from "react-redux"
import withRedux from "next-redux-wrapper"
import { wrapper} from "../redux/store"

// Global CSS
// Nextjs requires all the global css
// to be imported here
import '../styles/globals.css'


const WrapperApp =  ({ Component, pageProps }) => {
  return (
        <Component {...pageProps} />
  )
}

WrapperApp.getInitialProps = async ({ Component, ctx}) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx): {};
  
  //Anything returned here can be access by the client
  return {pageProps: pageProps}
}


export default wrapper.withRedux(WrapperApp)
