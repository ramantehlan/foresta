import {connect} from "react-redux"
import { incrementScore } from "../redux/actions"
import styles from '../styles/index.module.css'

const App = (props) => {
  return (
      <>
        <div className="card">
          <button onClick={props.incrementScore}>Increment</button>
          {props.score}
        </div>
      </>
  )
}

const mapStatetToProps = state => ({
  score: state.score
})

const mapDispatchToProps = { 
  incrementScore: incrementScore
}

export default connect(mapStatetToProps, mapDispatchToProps)(App)
