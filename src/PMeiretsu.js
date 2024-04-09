import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function PMeiretsu({ config, setConfig, show, setShow }) {
  return (
    <Modal size="lg" show={show} onHide={() => { setShow(false) }}>
      <Modal.Header closeButton>
        <Modal.Title>名列設定</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        名列ファイルの「番号」から「備考」までをコピペしてください。<br />
        見出しは不要です。
        <Form.Control
          as="textarea"
          rows={10}
          defaultValue={config.meiretsu.map(v => v.join(' ')).join('\n')}
          onChange={e => {
            setConfig({
              ...config,
              meiretsu: e.target.value.split('\n').map(v => v.split(/\s+/)).filter(v => v.length > 0)
            })
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => { setShow(false) }}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

