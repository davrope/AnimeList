import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';

import ShowCards from './components/ShowCards';
import ShowCardsLab from './components/ShowCardsLab';
import Anime from './components/Anime';
import { AnimesContextProvider } from './context/AnimesContext';
import FormAPIFill from './reference/utils/FormAPIFill';

const App = () => {
  return (
    <Router>
      <AnimesContextProvider>

        <Routes>
            {/* <Route path= "/" element= {<ShowCardsLab2/>}/> */}
            <Route path= "/" element= {<ShowCardsLab/>}/>
            <Route path = "/anime/:id" element = {<Anime/>}/>
            <Route path = "/form" element = {<FormAPIFill/>}/>
        </Routes>
        </AnimesContextProvider>
    </Router>
  )
}

export default App