import { useState, useEffect } from "react"
import {connect} from "react-redux"
import { incrementScore, setUsername } from "../redux/actions"
import styles from '../styles/index.module.css'
import dynamic from 'next/dynamic'
import io from "socket.io-client"

const socket = io(":3001")


const World = dynamic(
    () => import('../components/World'),
    { ssr: false }
)

function useInput(val: string) {
    const [value, setValue] = useState(val);

    function handleChange(e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>) {
          setValue(e.currentTarget.value);
        }

    return {
          value,
          onChange: handleChange
            }
}

const App = (props) => {
  const username = useInput(props.username)
  const [rank, setRank] = useState(0)
  const [leaders, setLeaders] = useState([])
  const [playFlag, setPlayFlag] = useState(false)
  const play = () => {
    props.setUsername(username.value)
    setPlayFlag(true)
  }

  socket.on('list', function (msg) {
    console.log(msg);
    setLeaders(msg)
  });

  useEffect( () => {
   let data = {
          username: props.username,
          score: props.score
      }       

    socket.emit("score", data, function(data){
      // Data is bool value, but it can be something
      setRank(data + 1)
    });

  }, [props.score])

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <div className={styles.heading} >
          Welcome to <span style={{ color: "green", fontWeight: 600 }}> Foresto </span>
        </div>

        <div className={styles.content}>

          Foresto is a real-time multiplayer game. The aim is to run through a forest and collect fruits on your way.
          You get 10 points for one fruit, and there are multiple fruits on every tree. To score more points, cover 
          the maximum area on fruits. More points you have, higher you will be on the scoreboard. 
            <br/><br/>
              <span style={{ color: "gray" }} >
                Use spacebar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="2 0 20 10"><path d="M18 9v4H6V9H4v6h16V9z"/></svg> to jump.
              </span>
          </div >
        </div>
        <div className={styles.information}> 
        { !playFlag && 
            <div className={styles.box}>
                <input type="username" placeholder="Username" className={styles.input} {...username} />
                <button onClick={ play } className={styles.button}>Play</button>
           </div>
        }
         
        { playFlag &&
          <>

        <div className={styles.score}>
              <div className={styles.score_value}>
                  {props.score} [#{rank}]
              </div>
              <div className={styles.score_username}>
                  {username.value}
              </div>
          </div>

         <div className={styles.leaderboard}>
           <div className={styles.leader_title}>Top 10 Players</div>
           {
              leaders.map( (userN) => {
              
              return (
                <div className={styles.leader_row}>
                  <div className={styles.leader_name}>
                    {userN}
                 </div>
                 <div>
                       -
                 </div>
              </div>
              )

              })

           }
             
                  
          </div>


      
          </>
        }

        </div>
          

          { playFlag &&
              <World /> 
           }

    </div>
  )
}

const mapStatetToProps = state => ({
  score: state.score,
  username: state.username
})

const mapDispatchToProps = { 
  incrementScore: incrementScore,
  setUsername: setUsername
}

export default connect(mapStatetToProps, mapDispatchToProps)(App)
