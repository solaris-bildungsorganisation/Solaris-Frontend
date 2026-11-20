import React from 'react';
import {
  SolarisLogo,
  LineArtAstronaut,
  CrateredPlanet,
  AnimatedBackground,
} from '../../components/SpaceElements';
import './Page1.css';

const Page1 = ({ lang = 'en' }) => {
  const isAr = lang === 'ar';

  return (
    <main className="error-page page-variant-1">
      <AnimatedBackground triangleColor="#cdb885" />
      <SolarisLogo />
      <LineArtAstronaut strokeColor="#254862" />

      <section className="center-content" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="hero-404-planet" dir="ltr">
          <span className="four-digit metallic-fade">4</span>
          <div className="center-planet-slot">
            <CrateredPlanet className="center-planet-size" idSuffix="p1-center" />
          </div>
          <span className="four-digit metallic-fade">4</span>
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
          {isAr ? 'العودة للرئيسية' : 'Back to Home'}
        </button>
      </section>
    </main>
  );
};

export default Page1;
