import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';

import ShowCards from './components/ShowCards';
import ShowCardsLab from './components/ShowCardsLab';
import Anime from './components/Anime';


const App = () => {
  return (
    <Router>
        <Routes>
            {/* <Route path= "/" element= {<ShowCards/>}/> */}
            <Route path= "/" element= {<ShowCards/>}/>
            <Route path = "/anime/:id" element = {<Anime/>}/>
        </Routes>
    </Router>
  )
}

export default App