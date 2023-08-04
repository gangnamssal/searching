import { css, Global } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '@pages/Home';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export const globalStyle = css`
  body {
    width: 1280px;
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default App;
