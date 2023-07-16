/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '@pages/Home';

function App() {
  return (
    <>
      <Global styles={globalStyle} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

const globalStyle = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default App;
