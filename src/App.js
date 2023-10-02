
import './App.css';
import {Home} from "./pages/Home/Home"
import {images} from "./datab/images"
import { useBrowser } from './context/browser-context';
import { useEffect } from 'react';

function App() {

  const index = Math.floor(Math.random() * images.length);
  const bgImage = images[index].image;
  const {name, browserDispatch} = useBrowser();
  
  useEffect(() => {
    const userName = localStorage.getItem("name");
    browserDispatch({
      type: "NAME",
      payload: userName
    });
  }, [])

  return (
    <div className="App" style={{backgroundImage: `url("${bgImage}")`}}>
      <Home />
    </div>
  );
}

export default App;
