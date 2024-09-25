import './styles/app.scss'
import Toolbar from "./components/Toolbar.jsx";
import SettingBar from "./components/SettingBar.jsx";
import Canvas from "./components/Canvas.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

    return (
        <div className='app bg-primary'>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </div>
    )
}

export default App
