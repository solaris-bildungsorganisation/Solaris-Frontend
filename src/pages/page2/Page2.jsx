import React from 'react';
import {
  SolarisLogo,
  LineArtAstronaut,
  CrateredPlanet,
  Ufo404Graphic,
  AnimatedBackground,
} from '../../components/SpaceElements';
import './Page2.css';

const Page2 = ({ lang = 'en' }) => {
  const isAr = lang === 'ar';

  return (
    <main className="error-page page-variant-2">
      <AnimatedBackground triangleColor="#cdb885" />
      <SolarisLogo />
      <LineArtAstronaut strokeColor="#254862" />

      <div className="floating-extra-planet planet-top-right">
        <CrateredPlanet className="extra-planet-size" idSuffix="p2-tr" />
      </div>
      <div className="floating-extra-planet planet-bottom-left">
        <CrateredPlanet className="extra-planet-size" idSuffix="p2-bl" />
      </div>

      <section className="center-content ufo-layout" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="hero-ufo-wrapper" dir="ltr">
          <Ufo404Graphic />
        </div>

        <h1 className="title-ooops">{isAr ? 'عذراً!' : 'Ooops!'}</h1>
        <h2 className="subtitle-not-found">
          {isAr ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h2>

        <p className="desc-line">
          {isAr
            ? 'هذه الصفحة غير موجودة أو تمت إزالتها!'
            : "This page doesn't exist or removed!"}
        </p>
        <p className="desc-line">
          {isAr
            ? 'نقترح عليك العودة إلى الصفحة الرئيسية.'
            : 'We suggest you back to home.'}
        </p>

        <button type="button" className="home-action-btn">
          {isAr ? 'الذهاب للرئيسية' : 'Go to Home'}
        </button>
      </section>
    </main>
  );
};

export default Page2;
