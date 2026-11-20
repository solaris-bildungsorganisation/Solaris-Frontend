import React from 'react';
import {
  SolarisLogo,
  LineArtAstronaut,
  CrateredPlanet,
  OpenFourDigit,
  AnimatedBackground,
} from '../../components/SpaceElements';
import './Page3.css';

const Page3 = ({ lang = 'en' }) => {
  const isAr = lang === 'ar';

  return (
    <main className="error-page page-variant-3">
      <AnimatedBackground triangleColor="#4b6071" />
      <SolarisLogo />
      <LineArtAstronaut strokeColor="#328a73" />

      <div className="floating-extra-planet planet-mid-right">
        <CrateredPlanet className="extra-planet-size" idSuffix="p3-mr" />
      </div>
      <div className="floating-extra-planet planet-bottom-left-p3">
        <CrateredPlanet className="extra-planet-size" idSuffix="p3-bl" />
      </div>

      <section className="center-content" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="hero-404-planet" dir="ltr">
          <OpenFourDigit idSuffix="p3-left" className="open-four-digit left-open-four" />
          <div className="center-planet-slot">
            <CrateredPlanet className="center-planet-size" idSuffix="p3-center" />
          </div>
          <OpenFourDigit idSuffix="p3-right" className="open-four-digit right-open-four" />
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

export default Page3;
