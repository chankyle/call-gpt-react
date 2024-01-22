// Import from react-router-dom
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Dropdown, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Components
import Home from "./components/Home";
import VerificationForm from "./components/VerificationForm";
import EventStream from "./components/EventStream";
import CheckVerification from "./components/CheckVerification";
import Verify from "./components/Verify";
import Hackathon from "./components/Hackathon";

// Styles
import "./styles/App.css";
import SendSMS from "./components/SendSMS";

function App() {
  const [demoSelection, setDemoSelection] = useState("Select Demo");

  const showOrHideElement = () => {
    switch (demoSelection) {
      case "Toll Free Verification":
        break;
      case "Account Security":
        return { display: "none" };
      case "Voice Intelligence":
        break;
      default:
        return { display: "none" };
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
              <Dropdown onSelect={(e) => setDemoSelection(e)}>
                <Dropdown.Toggle> {demoSelection}</Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-dark">
                  <Dropdown.Item as={Link} to={"/"} href="Select Demo">
                    Select Demo
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={"/verification-form"}
                    href="Toll Free Verification"
                  >
                    Toll Free Verification
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={"/verify"}
                    href="Account Security"
                  >
                    Account Security
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={"/voice-intelligence"}
                    href="Voice Intelligence"
                  >
                    Voice Intelligence
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to={"/hackathon"}
                    href="Open AI Hackathon"
                  >
                    Open AI Hackathon
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav>
                <Link
                  to={"/send-sms"}
                  className="nav-link"
                  style={showOrHideElement()}
                >
                  Send SMS
                </Link>
              </Nav>
              <Nav>
                <Link
                  to={"/check-verification"}
                  className="nav-link"
                  style={showOrHideElement()}
                >
                  Check Verification Status
                </Link>
              </Nav>
              <Nav>
                <Link
                  to={"/event-stream"}
                  className="nav-link"
                  style={showOrHideElement()}
                >
                  Event Stream
                </Link>
              </Nav>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/send-sms" element={<SendSMS />}></Route>
                <Route
                  path="/verification-form"
                  element={<VerificationForm />}
                ></Route>
                <Route
                  path="/check-verification"
                  element={<CheckVerification />}
                ></Route>
                <Route path="/event-stream" element={<EventStream />}></Route>
                <Route path="/verify" element={<Verify />}></Route>
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
