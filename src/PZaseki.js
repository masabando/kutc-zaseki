import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function PZaseki({ config, setConfig, show, setShow }) {
  function Seki({ yoko, tate }) {
    let p = config.zaseki.pdata[tate]?.[yoko];
    return (
      <div className={`pzaseki-seki ${p ? 'ok' : "ng"}`}
        onClick={() => {
          let c = JSON.parse(JSON.stringify(config.zaseki.pdata));
          c[tate][yoko] = !p;
          setConfig({ ...config, zaseki: { ...config.zaseki, pdata: c } });
        }}
      >
        {p ? "" //`${yoko}-${tate}`
          : "×"}
      </div>
    )
  }


  return (
    <Modal size="lg" show={show} onHide={() => { setShow(false) }}>
      <Modal.Header closeButton>
        <Modal.Title>座席表設定</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <InputGroup className="mb-1">
            <InputGroup.Text>年度</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="年度"
              defaultValue={config.nendo}
              onChange={e => { setConfig({ ...config, nendo: e.target.value }) }}
            />
            <InputGroup.Text>学年</InputGroup.Text>
            <Form.Select
              defaultValue={config.gakunen}
              onChange={e => { setConfig({ ...config, gakunen: e.target.value }) }}
            >
              <option value="1">1年</option>
              <option value="2">2年</option>
              <option value="3">3年</option>
              <option value="4">4年</option>
              <option value="5">5年</option>
            </Form.Select>
            <InputGroup.Text>組</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="組"
              defaultValue={config.kumi}
              onChange={e => { setConfig({ ...config, kumi: e.target.value }) }}
            />
          </InputGroup>
          <InputGroup className="mb-1">
            <InputGroup.Text>横の座席数</InputGroup.Text>
            <Form.Select
              defaultValue={config.zaseki.yoko}
              onChange={e => {
                setConfig({ ...config, zaseki: { ...config.zaseki, yoko: +e.target.value } })
              }}
            >
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Select>
            <InputGroup.Text>縦の座席数</InputGroup.Text>
            <Form.Select
              defaultValue={config.zaseki.tate}
              onChange={e => {
                setConfig({ ...config, zaseki: { ...config.zaseki, tate: +e.target.value } })
              }}
            >
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Select>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>教室</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="教室"
              defaultValue={config.room}
              onChange={e => { setConfig({ ...config, room: e.target.value }) }}
            />
            <InputGroup.Text>日付</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="日付"
              defaultValue={config.date}
              onChange={e => { setConfig({ ...config, date: e.target.value }) }}
            />
          </InputGroup>
        </div>
        下の座席をクリックすると、空席/利用を切り替えることができます。
        <div className="border p-4">
          <Row xs={config.yoko} sm={config.yoko} className="g-2">
            {
              Array.from({ length: config.zaseki.yoko }, (_, yoko) => (
                <Col key={`pzaseki-row-${yoko}`}>
                  <Row xs={1} sm={1} className="g-2">
                    {
                      Array.from({ length: config.zaseki.tate }, (_, tate) => (
                        <Col key={`pzaseki-${yoko}-${tate}`}>
                          <Seki yoko={yoko} tate={tate} />
                        </Col>
                      ))
                    }
                  </Row>
                </Col>
              ))
            }
          </Row>
          <div className="text-center mt-3">
            <div className="pzaseki-kyoutaku">教卓</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => { setShow(false) }}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}