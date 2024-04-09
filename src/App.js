import { useState, useEffect } from 'react';
import './App.scss';
import Container from 'react-bootstrap/Container';
import MyNav from './MyNav';
import Zaseki from './Zaseki';

function App() {
  const init = { tate: 7, yoko: 5 };
  const [config, setConfig] = useState({
    nendo: '2024',
    gakunen: '3',
    kumi: 'I',
    room: '041',
    date: '2024-04-05',
    num: 35,
    meiretsu: [],
    zaseki: {
      yoko: init.yoko,
      tate: init.tate,
      data: Array.from({ length: init.tate }, (_, tate) => (
        Array.from({ length: init.yoko }, (_, yoko) => {
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
      )),
      edata: Array.from({ length: init.tate }, (_, tate) => (
        Array.from({ length: init.yoko }, (_, yoko) => {
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
      )),
      pdata: Array.from({ length: init.tate }, (_, tate) => (
        Array.from({ length: init.yoko }, (_, yoko) => true))),
    }
  });
  useEffect(() => {
    setConfig({
      ...config, zaseki: {
        ...config.zaseki,
        pdata: Array.from({ length: config.zaseki.tate }, (_, tate) => (
          Array.from({ length: config.zaseki.yoko }, (_, yoko) => true)
        ))
      }
    })
    // eslint-disable-next-line
  }, [config.zaseki.yoko, config.zaseki.tate]);

  useEffect(() => {
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
    let idx = 0;
    for (let yoko = 0; yoko < config.zaseki.yoko; yoko++) {
      for (let tate = 0; tate < config.zaseki.tate; tate++) {
        let t = config.zaseki.tate - tate - 1;
        let y = config.zaseki.yoko - yoko - 1;
        edata[t][y].use = config.zaseki.pdata[t][y];
        if (config.zaseki.pdata[t][y]) {
          idx++;
          let f = config.meiretsu[idx - 1] ? config.meiretsu[idx - 1] : false;
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
        edata: edata,
        data: JSON.parse(JSON.stringify(edata))
      }
    });
    // eslint-disable-next-line
  }, [config.zaseki.pdata, config.meiretsu]);

  return (
    <div className="App">
      <MyNav config={config} setConfig={setConfig} />
      <Container fluid>
        <Zaseki config={config} />
        <Zaseki config={config} exam />
      </Container>
    </div>
  );
}

export default App;
