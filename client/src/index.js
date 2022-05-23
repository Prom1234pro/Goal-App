import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

function All(){
  const [loading, setLoading] = useState(false)
  return(
    <>
      <div className={loading? "spinner": ""}></div>
      <App setLoading={setLoading}/>
    </>

  )

}

root.render(

  <React.StrictMode>
      <All/>
  </React.StrictMode>
);


