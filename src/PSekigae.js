import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function PSekigae({ config, setConfig, show, setShow }) {
  const [ok, setOk] = useState(false);
  const [data, setData] = useState([]);
  return (
    <Modal size="lg" show={show} onHide={() => { setShow(false) }}>
      <Modal.Header closeButton>
        <Modal.Title>席替え設定</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        数字は出席番号で、空欄は空席です。<br />
        数字を入れ替えることで、席替えを行います。<br />
        「席替え」ボタンを押さない限り反映されません。
        <Form.Control
          as="textarea"
          rows={10}
          defaultValue={config.zaseki.data.map(v => v.map(v => v.data.idx >= 0 ? `${v.data.idx}` : '').join(', ')).join('\n')}
          onChange={e => {
            setOk(false);
            let data = e.target.value.split('\n').map(v => v.split(/\s*,\s*/).map(v => v === '' ? -1 : parseInt(v)));
            if (data.length !== config.zaseki.tate) return;
            for (let tate = 0; tate < data.length; tate++) {
              if (data[tate].length !== config.zaseki.yoko) return;
            }
            setData(data);
            setOk(true);
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" disabled={!ok} onClick={() => {
          let edata = Array.from({ length: config.zaseki.tate }, (_, tate) => (
            Array.from({ length: config.zaseki.yoko }, (_, yoko) => {
              return {
                data: {
                  name: "",
                  kana: "",
                  idx: -1,
                  bikou: "",
                },
                use: false,
              }
            })
          ));
          for (let yoko = 0; yoko < config.zaseki.yoko; yoko++) {
            for (let tate = 0; tate < config.zaseki.tate; tate++) {
              let t = config.zaseki.tate - tate - 1;
              let y = config.zaseki.yoko - yoko - 1;
              edata[t][y].use = config.zaseki.pdata[t][y];
              if (config.zaseki.pdata[t][y]) {
                let x = data[t][y];
                let f = config.meiretsu[x - 1] ? config.meiretsu[x - 1] : false;
                edata[t][y].data.idx = f ? f[0] : -1;
                edata[t][y].data.name = f ? `${f[1]} ${f[2]}` : "";
                edata[t][y].data.kana = f ? `${f[3]} ${f[4]}` : "";
                edata[t][y].data.bikou = f && f.length >= 8 ? f[8] : "";
              }
            }
          }
          setConfig({
            ...config, zaseki: {
              ...config.zaseki,
              data: JSON.parse(JSON.stringify(edata))
            }
          });

        }}>席替え</Button>
        <Button variant="secondary" onClick={() => { setShow(false) }}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

