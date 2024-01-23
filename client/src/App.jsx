// Import from react-router-dom
import { Routes, Route } from "react-router-dom";

// Import Bootstrap
import { Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Components
import Home from "./components/Home";
import Hackathon from "./components/Hackathon";

// Styles
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Open AI IVR Hackathon Demo</Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/hackathon" element={<Hackathon />}></Route>
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
