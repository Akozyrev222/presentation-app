import './styles/app.scss'
import Toolbar from "./components/Toolbar.jsx";
import SettingBar from "./components/SettingBar.jsx";
import Canvas from "./components/Canvas.jsx";

function App() {

    return (
        <div className='app'>
            <Toolbar/>
            <SettingBar/>
            <Canvas/>
        </div>
    )
}

export default App
