import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PZaseki from './PZaseki';
import PMeiretsu from './PMeiretsu';
import PSekigae from './PSekigae';

export default function MyNav({ config, setConfig }) {
  const [configShow, setConfigShow] = useState(false);
  const [meiretsuShow, setMeiretsuShow] = useState(false);
  const [sekigaeShow, setSekigaeShow] = useState(false);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/">座席表作成</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => { setConfigShow(true) }}>設定</Nav.Link>
              <Nav.Link onClick={() => { setMeiretsuShow(true) }}>名列</Nav.Link>
              <Nav.Link onClick={() => { setSekigaeShow(true) }}>席替</Nav.Link>
              <Nav.Link onClick={() => { window.print() }}>印刷</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <PZaseki config={config} setConfig={setConfig} show={configShow} setShow={setConfigShow} />
      <PMeiretsu config={config} setConfig={setConfig} show={meiretsuShow} setShow={setMeiretsuShow} />
      <PSekigae config={config} setConfig={setConfig} show={sekigaeShow} setShow={setSekigaeShow} />
    </>
  );
}
