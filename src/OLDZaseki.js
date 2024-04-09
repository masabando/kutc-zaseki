import { useRef, useEffect } from 'react';


export default function Zaseki({ config }) {
  const canvasRef = useRef(null);
  let ctxRef = useRef(null);

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
  }, []);

  useEffect(() => {
    let ctx = ctxRef.current;
    let width = canvasRef.current.width;
    let height = canvasRef.current.height;
    // clear
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, width, height);
    // title
    ctx.font = "100px sans-serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgb(0, 0, 0)';
    let lowFlag = config.gakunen === "1" || config.gakunen === "2";
    ctx.fillText(`${config.nendo}年度 ${config.gakunen}${lowFlag ? "年" : ""}${config.kumi}${lowFlag ? "組" : ""} 座席表`, width / 2, 20);
    // 教卓
    ctx.save();
    ctx.translate(width/2, height - 300);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 6;
    let ksize = { w: 800, h: 200 };
    ctx.fillRect(-ksize.w / 2, -ksize.h/2, ksize.w, ksize.h);
    ctx.strokeRect(-ksize.w / 2, -ksize.h / 2, ksize.w, ksize.h);
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.textBaseline = 'middle';
    ctx.fillText("教卓", 0, 0);
    ctx.restore();
    // 座席
    let zmargin = 20;
    let yoko = config.zaseki.yoko;
    let tate = config.zaseki.tate;
    let zsize = { w: (width - zmargin * 2) / yoko, h: 200 };
    let zdata = config.zaseki.pdata;
  }, [config]);
  return (
    <canvas
      className="zaseki-canvas"
      ref={canvasRef}
      height={2100} width={2970}
    />
  )
}