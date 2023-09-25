import React from 'react';
import style from "./aboutUs.module.css"

const AboutUs = () => {
  // Datos ficticios
  const companyInfo = {
    quienesSomos:
      'Somos una empresa dedicada a brindar soluciones tecnológicas innovadoras para satisfacer las necesidades de nuestros clientes.',
    mision:
      'Nuestra misión es mejorar la vida de las personas mediante el desarrollo de productos y servicios de alta calidad que impulsen el progreso y la eficiencia.',
    vision:
      'Nuestra visión es convertirnos en líderes globales en el mercado tecnológico, siendo reconocidos por nuestra excelencia y compromiso con la satisfacción del cliente.',
  };

  return (
    <div className={style.aboutUsContainer}>
      <h1 className={style.title}>Quiénes Somos</h1>
      <p className={style.content}>{companyInfo.quienesSomos}</p>

      <h1 className={style.title}>Misión</h1>
      <p className={style.content}>{companyInfo.mision}</p>

      <h1 className={style.title}>Visión</h1>
      <p className={style.content}>{companyInfo.vision}</p>
    </div>
  );
};

export default AboutUs;
