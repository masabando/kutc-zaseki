import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Seki({ data, use }) {
  let f = use && data.idx > 0;
  return (
    <Col>
      <div className={`seki ${f ? "" : "notUseSeki"}`}>
        <div className="d-flex justify-content-between mt-1">
          <span className="seki-idx">{f ? data.idx : ""}</span>
          <span className={`seki-bikou ${data.bikou?.length > 0 ? "" : "ng"}`}>{f ? data.bikou : ""}</span>
        </div>
        <div className="d-flex align-items-center justify-content-center text-center">
          <div>
            <div className="seki-kana">
              {f ? data.kana : ""}
            </div>
            <div>
              {f ? data.name : ""}
            </div>
          </div>
        </div>
      </div>
    </Col>
  )
}


export default function Zaseki({ config, exam }) {
  let d = exam ? config.zaseki.edata : config.zaseki.data;
  let g = config.gakunen === "1" || config.gakunen === "2";
  return (
    <div className="zaseki">
      <div className="zaseki-date">{config.date}</div>
      <div className="zaseki-title text-center mt-3">
        {config.nendo}年度
        <span className="mx-3">{config.gakunen}{g ? "年" : ""}{config.kumi}{g ? "組" : ""}</span>
        {exam ? "[定期試験] " : ""}
        座席表 (教室:{config.room})
      </div>
      <Row>
        {
          Array(d[0].length).fill(0).map((_, yoko) => (
            <Col key={`zaseki-${yoko}`}>
              <Row xs={1} sm={1} className="g-2">
                {
                  Array(d.length).fill(0).map((_, tate) => (
                    <Seki
                      key={`zaseki-${yoko}-${tate}`}
                      use={d[tate][yoko].use}
                      data={d[tate][yoko].data}
                    />
                  ))
                }
              </Row>
            </Col>
          ))
        }
      </Row>
      <div className="text-center mt-3">
        <div className="zaseki-kyoutaku">教卓</div>
      </div>
    </div>
  )
}