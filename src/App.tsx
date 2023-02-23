import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate,  } from 'react-router-dom';
import RouteEnum from './Enum/RouteEnum';
import Home from './Views/Home';
import Template from './Template';
import Inserisci from './Views/Inserisci';
import Contatti from './Views/Contatti';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dettaglio from './Views/Dettaglio';
import Modifica from './Views/Modifica';
import { ErrorPage } from './Components/ErrorPage';



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Template />}>
            <Route path="/" element={<Navigate to={RouteEnum.Home} replace={true} />} />
            <Route path={RouteEnum.Home} element={<Home />} />
            <Route path={RouteEnum.Inserisci} element={<Inserisci />} />
            <Route path={RouteEnum.Contatti} element={<Contatti />} />
            <Route path={RouteEnum.Dettaglio} element={<Dettaglio />} />
            <Route path={RouteEnum.Modifica} element={<Modifica />} />
            <Route path={RouteEnum.Error} element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;
