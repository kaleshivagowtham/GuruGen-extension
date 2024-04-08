import './App.css';
import InitialScreen from './Components/InitialScreen';
import MainScreen from './Components/MainScreen';

function App() {

  return (
    <div className='appWholeCont'>
      <head>
        <title>GuruGen AI</title>
      </head>
      {/* <p>X</p> */}
      <InitialScreen />
      <MainScreen />
    </div>
  )
}

export default App
