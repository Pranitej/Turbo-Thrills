import React from "react";
import { Link } from "react-router-dom";

export default function CustomerMainBody() {
  const style = {
    display: "inlineBlock",
    position: "relative",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
  };

  return (
    <div
      className="container text-center"
      style={{
        marginBottom: "22vh",
        marginTop: "24vh",
      }}
    >
      <div className="row mt-5 mb-5">
        <div className="col-md-4 mb-5 ">
          <Link
            className="link-offset-2 link-underline link-dark link-underline-opacity-0 "
            to="/customer/sellcar"
          >
            <img
              src="https://www.team-bhp.com/forum/attachments/indian-car-scene/2073257d1603947531-modern-classic-indian-car-80s-would-you-own-today-images-9.jpeg"
              className="img-fluid mx-auto d-block card"
              alt="..."
              style={style}
            />
            <h2 className="text-white mt-3">Sell Cars</h2>
          </Link>
          <Link
            className="link-offset-2 link-underline link-underline-opacity-0"
            to="/customer/carsellerquestions"
          >
            Test Your Knowledge
          </Link>
        </div>

        <div className="col-md-4 mb-5">
          <Link
            className="link-offset-2 link-underline link-dark link-underline-opacity-0"
            to="/customer"
          >
            <img
              src="https://www.usnews.com/object/image/00000182-c70c-dbee-a98a-ef8f37b80000/2021-mercedesbenz-gla35-front1.jpg?update-time=1681138792838&size=responsive970"
              className="img-fluid mx-auto d-block card"
              alt="..."
              style={style}
            />
            <h2 className="text-white mt-3">Buy Cars</h2>
          </Link>
          <Link
            className="link-offset-2 link-underline link-underline-opacity-0"
            to="/customer/carbuyerquestions"
          >
            Test Your Knowledge
          </Link>
        </div>

        <div className="col-md-4 mb-5 ">
          <Link
            className="link-offset-2 link-underline link-dark link-underline-opacity-0"
            to="/customer/customerrarecar"
          >
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura-101-1655218102.jpg?crop=0.8889431489846579xw:1xh;center,top&resize=1200:*"
              className="img-fluid mx-auto d-block card"
              alt="..."
              style={style}
            />
            <h2 className="text-white mt-3">Rare Cars</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
