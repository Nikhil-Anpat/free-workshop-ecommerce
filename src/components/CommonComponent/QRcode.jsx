/** @format */

import "./QRcode.css";
import img from "../../assets/images/img1.png";
import img1 from "../../assets/images/bi_qr-code.png";

const QRcode = () => {
  return (
    <>
      <div className="qrcode-container">
        <div className="qrcode-left">
          <img src={img} alt="" />
        </div>
        <div className="qrcode-center">
          <h6>The simpler way to buy and sell locally!</h6>
          <p>Scan to download the app</p>
        </div>
        <div className="qrcode-right">
          <img src={img1} alt="" />
        </div>
      </div>
    </>
  );
};

export default QRcode;
                  