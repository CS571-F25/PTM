import { HashRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './components/Home'
import AboutMe from './components/AboutMe'
import Settings from './components/Setting'

function App() {
  return <HashRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<AboutMe/>}></Route>
      <Route path='/settings' element={<Settings/>}></Route>
    </Routes>
  </HashRouter>
}

export default App
