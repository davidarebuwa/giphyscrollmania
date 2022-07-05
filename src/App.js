import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components'
import { useState } from 'react';
import Error from './components/Error';
import './App.css';

const giphy = new GiphyFetch("5tbw92ipEDm83CyPYmoLMxNY1N0XSTKt");


function App() {
  const [text, setText] = useState('')
  const [err, setErr] = useState(false)
  const fetchGifs = (offset) => giphy.trending({ offset, limit: 10 })
  const searchGifs = (offset) => giphy.search(`${text}`, { offset, limit: 10 });
  const [width, setWidth] = useState(window.innerWidth);
  const [searching, setSearching] = useState(false)
  

  const handleInput = (e) => {
    setText(e.target.value)
  }

  const handleRefresh = () => {
    setSearching(false)
    setText('')
  }

  const handleSubmit = (e) => {
    if(text.length === 0) {
      //set error state to true
      setErr(true)
      return
    }
    console.log(text)
   
   // search(text)
    setSearching(true)

    if(searching){
      setText('')
      setErr(false)
    }
   

  }

  return (
    <div className="App">
      <h1>GiphySrollMania!</h1>
      <h3>Type text into the form, hit submit and we'll find a gif</h3>
      <button className='refresh-btn' onClick={handleRefresh}>Restart</button>
      <input className='input-field' value={text} onChange={handleInput} />
      <button className='submit-btn' onClick={handleSubmit}>Submit</button>

      <Error isError={err} text='need length longer than 0 for input'/>

      {searching && <h2>Searching...</h2>}
      {searching &&  <Grid width={width} columns={3} gutter={6} fetchGifs={ searchGifs }/>}
      {!searching &&  <Grid width={width} columns={3} gutter={6} fetchGifs={fetchGifs}/>}
    </div>
  );
}

export default App;
