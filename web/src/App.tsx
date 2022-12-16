import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { Hotel } from './pages/Hotel';
import { Quarto } from './pages/Quarto';
import { Hospede } from './pages/Hospede';
import { Reserva } from './pages/Reserva';

import './global.css';
import { Layout } from './components/Layout';

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/hotel' element={<Hotel />} />
            <Route path='/quartos' element={<Quarto />} />
            <Route path='/hospede' element={<Hospede />} />
            <Route path='/reserva' element={<Reserva />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
