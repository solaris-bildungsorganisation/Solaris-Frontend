import React from 'react';
import { SolarisLogo } from '../../components/SpaceElements';
import './Page4.css';

const astronautCutout = `${import.meta.env.BASE_URL}images/astronaut_3d_cutout.png`;

const Page4 = ({ lang = 'en' }) => {
  const isAr = lang === 'ar';

  return (
    <main className="error-page page-variant-4">
      <SolarisLogo />

      {/* Smooth Sky & Soft Cloud Mist Layer */}
      <div className="page4-atmosphere" aria-hidden="true">
        <div className="cloud-puff cloud-left-upper" />
        <div className="cloud-puff cloud-left-lower" />
        <div className="cloud-puff cloud-center-mass" />
        <div className="cloud-puff cloud-right-upper" />
        <div className="cloud-puff cloud-right-lower" />
        <div className="cloud-mist-band" />
        <div className="cloud-horizon-white" />
      </div>

      <div className="page4-scene-container">
        {/* Hero Composition: Open-Top Giant "404" + 3D Astronaut */}
        <div className="page4-hero-composition" dir="ltr">
          <svg
            className="page4-giant-404-svg"
            viewBox="0 0 1200 560"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* Left Open "4" */}
            <path
              className="giant-four-path"
              d="M 196 58 L 284 58 L 166 338 L 298 338 L 298 206 L 384 206 L 384 338 L 430 338 L 430 416 L 384 416 L 384 520 L 298 520 L 298 416 L 68 416 L 68 356 Z"
              fill="#ffffff"
            />

            {/* Center "0" behind Astronaut */}
            <path
              className="giant-zero-path"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 600 54 C 710 54, 768 134, 768 288 C 768 442, 710 522, 600 522 C 490 522, 432 442, 432 288 C 432 134, 490 54, 600 54 Z M 600 138 C 540 138, 516 188, 516 288 C 516 388, 540 438, 600 438 C 660 438, 684 388, 684 288 C 684 188, 660 138, 600 138 Z"
              fill="#ffffff"
            />

            {/* Right Open "4" */}
            <path
              className="giant-four-path"
              d="M 936 58 L 1024 58 L 906 338 L 1038 338 L 1038 206 L 1124 206 L 1124 338 L 1170 338 L 1170 416 L 1124 416 L 1124 520 L 1038 520 L 1038 416 L 808 416 L 808 356 Z"
              fill="#ffffff"
            />
          </svg>

          <div className="page4-midground-mist" aria-hidden="true" />

          <div className="page4-astronaut-wrapper">
            <img
              src={astronautCutout}
              alt="404 Lost Astronaut"
              className="page4-astronaut-cutout"
            />
            <div className="astronaut-floor-shadow" />
          </div>
        </div>

        <section className="page4-text-section" dir={isAr ? 'rtl' : 'ltr'}>
          <h1 className="page4-title">
            {isAr ? 'عذراً! لقد تهنا في الفضاء' : "OOPS! WE'RE LOST"}
          </h1>
          <p className="page4-subtitle">
            {isAr
              ? 'لا تقلق، يمكننا أن نتوه معاً.'
              : "Don't worry, we can be lost together."}
          </p>
          <button type="button" className="home-action-btn page4-btn">
            {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          </button>
        </section>
      </div>
    </main>
  );
};

export default Page4;
