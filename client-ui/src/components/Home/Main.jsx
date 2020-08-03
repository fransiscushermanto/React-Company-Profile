import React, { useEffect, useState, useRef } from "react";
import CardOverlay from "./Overlay/Card";
import { Carousel, ProductSliderComp, useMediaQuery } from "../Factories";

import "../../sass/main.scss";
const Main = () => {
  const windowSM = useMediaQuery("(max-width: 600px)");
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [carouselItems] = useState([
    {
      src: "14.jpg",
    },

    {
      src: "15.jpg",
    },
    {
      src: "16.jpg",
    },
  ]);
  const [products] = useState([
    { img: "11.jpg", productName: "PENDANT" },
    { img: "12.jpg", productName: "BIOGLASS" },
    { img: "13.jpg", productName: "GLUCOLA" },
    { img: "14.jpg", productName: "NANOSPRAY" },
  ]);
  const slider = useRef(null);

  const onMouseDown = (e) => {
    setIsDown(true);
    console.log(e);
    slider.current.classList.add("active");
    setStartX(e.pageX - slider.current.offsetLeft);
    setScrollLeft(slider.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
    slider.current.classList.remove("active");
  };

  const onMouseUp = () => {
    setIsDown(false);
    slider.current.classList.remove("active");
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = (x - startX) * 3;
    slider.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <main>
      <Carousel arrItem={carouselItems} />
      {/* Slider */}
      <div className="product-categories-slider">
        <header>
          <h5>Categories Product MCI</h5>
          <span className="ml-auto">View All</span>
        </header>
        <div className="slider">
          <div
            className="slider-wrapper"
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onMouseMove={onMouseMove}
            ref={slider}
          >
            {products.map((product, index) => {
              return (
                <ProductSliderComp
                  key={index}
                  img={product.img}
                  productName={product.productName}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="business-strategy-card">
        <div className="card">
          <div className="card-title">
            <h5>Mengapa Harus Join MCI Sekarang?</h5>
            <p>Jawabannya adalah 4P. Apa itu 4P?</p>
          </div>
          <div className="card-body">
            <div className="card strategy-card">
              <div className="card-body">
                <span className="icon-place">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="building"
                    className="svg-inline--fa fa-building fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="40px"
                  >
                    <path
                      fill="currentColor"
                      d="M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"
                    ></path>
                  </svg>
                </span>
                <span className="title">PERUSAHAAN</span>
                <span className="description">Since 2010 - Present.</span>
              </div>
            </div>
            <div className="card strategy-card">
              <div className="card-body">
                <span className="icon-place">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="box"
                    className="svg-inline--fa fa-box fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="30px"
                  >
                    <path
                      fill="currentColor"
                      d="M509.5 184.6L458.9 32.8C452.4 13.2 434.1 0 413.4 0H272v192h238.7c-.4-2.5-.4-5-1.2-7.4zM240 0H98.6c-20.7 0-39 13.2-45.5 32.8L2.5 184.6c-.8 2.4-.8 4.9-1.2 7.4H240V0zM0 224v240c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V224H0z"
                    ></path>
                  </svg>
                </span>
                <span className="title">PRODUK</span>
                <span className="description">
                  Produk yang diproduksi sangat bermanfaat misalnya produk
                  kecantikan maupun kesehatan.
                </span>
              </div>
            </div>
            <div className="card strategy-card">
              <div className="card-body">
                <span className="icon-place">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="handshake"
                    className="svg-inline--fa fa-handshake fa-w-20"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    width="40px"
                  >
                    <path
                      fill="currentColor"
                      d="M519.2 127.9l-47.6-47.6A56.252 56.252 0 0 0 432 64H205.2c-14.8 0-29.1 5.9-39.6 16.3L118 127.9H0v255.7h64c17.6 0 31.8-14.2 31.9-31.7h9.1l84.6 76.4c30.9 25.1 73.8 25.7 105.6 3.8 12.5 10.8 26 15.9 41.1 15.9 18.2 0 35.3-7.4 48.8-24 22.1 8.7 48.2 2.6 64-16.8l26.2-32.3c5.6-6.9 9.1-14.8 10.9-23h57.9c.1 17.5 14.4 31.7 31.9 31.7h64V127.9H519.2zM48 351.6c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.9-7.2 16-16 16zm390-6.9l-26.1 32.2c-2.8 3.4-7.8 4-11.3 1.2l-23.9-19.4-30 36.5c-6 7.3-15 4.8-18 2.4l-36.8-31.5-15.6 19.2c-13.9 17.1-39.2 19.7-55.3 6.6l-97.3-88H96V175.8h41.9l61.7-61.6c2-.8 3.7-1.5 5.7-2.3H262l-38.7 35.5c-29.4 26.9-31.1 72.3-4.4 101.3 14.8 16.2 61.2 41.2 101.5 4.4l8.2-7.5 108.2 87.8c3.4 2.8 3.9 7.9 1.2 11.3zm106-40.8h-69.2c-2.3-2.8-4.9-5.4-7.7-7.7l-102.7-83.4 12.5-11.4c6.5-6 7-16.1 1-22.6L367 167.1c-6-6.5-16.1-6.9-22.6-1l-55.2 50.6c-9.5 8.7-25.7 9.4-34.6 0-9.3-9.9-8.5-25.1 1.2-33.9l65.6-60.1c7.4-6.8 17-10.5 27-10.5l83.7-.2c2.1 0 4.1.8 5.5 2.3l61.7 61.6H544v128zm48 47.7c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.9-7.2 16-16 16z"
                    ></path>
                  </svg>
                </span>
                <span className="title">POTENSI BISNIS</span>
                <span className="description">
                  Sistem yang mudah dan simple untuk siapapun yang ingin
                  menjalankannya.
                </span>
              </div>
            </div>
            <div className="card strategy-card">
              <div className="card-body">
                <span className="icon-place">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="bullhorn"
                    className="svg-inline--fa fa-bullhorn fa-w-18"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    width="30px"
                  >
                    <path
                      fill="currentColor"
                      d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z"
                    ></path>
                  </svg>
                </span>
                <span className="title">PROMOSI</span>
                <span className="description">
                  Promosi bisa anda lakukan dimanapun dan kapapun.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
