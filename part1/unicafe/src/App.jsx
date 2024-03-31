import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0,6:0,7:0,8:0})

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const nextAnecdoteHandler = () => {
    let x = Math.floor(Math.random() * anecdotes.length)
    setSelected(x)
  }

  const voteAnecdoteHandler = () => {
    const copyPoints = { ...points }
    copyPoints[selected] += 1
    setPoints(copyPoints)
  }

  function getKeyOfMaxValue(obj) {
    const keys = Object.keys(obj);
    const maxValue = Math.max(...keys.map(key => obj[key]));
    return keys.find(key => obj[key] === maxValue);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button label={'good'} set_rating={setGood} rating={good} />
      <Button label={'neutral'} set_rating={setNeutral} rating={neutral} />
      <Button label={'bad'} set_rating={setBad} rating={bad} />
      <Statistics good={good} bad={bad} neutral={neutral}/>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <button onClick={voteAnecdoteHandler}>vote</button>
      <button onClick={nextAnecdoteHandler}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <div>{anecdotes[getKeyOfMaxValue(points)]}</div>
    </div>
    
  )
}

const Button = ({ rating, set_rating, label }) => {

  const click_Handler = () => {
    let new_rating = rating + 1
    set_rating(new_rating)
  }
  return (
    <button onClick={click_Handler}>{label}</button>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  if ((good + bad + neutral) == 0) {
    return (
      <div>
      <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>statistics</h1>
        <table><tbody>
          <StatisticLine text='good' value={good} />
           <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='average' value={(good-bad) / (good+bad+neutral)} />
            <StatisticLine text='positive' value={(good) / (good + neutral + bad) * 100 + '%'} />
            </tbody></table>
      </div>
    )
  }
 
}

const StatisticLine = ({text, value}) => {
  return (
    <><tr><td>{text} {value}</td></tr></>
  )
}


export default App  
