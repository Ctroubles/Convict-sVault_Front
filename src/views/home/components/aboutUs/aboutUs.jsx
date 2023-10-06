import React from 'react';
import style from "./aboutUs.module.css"

const AboutUs = () => {
  // Datos ficticios
  const companyInfo = {
    quienesSomos:
      'Somos una empresa apasionada por la innovación y la tecnología. Desde nuestros inicios, nos hemos dedicado a brindar soluciones tecnológicas vanguardistas que superan las expectativas de nuestros clientes. Nos enorgullece ser impulsores del cambio y contribuir al progreso de la sociedad.',
    mision:
      'Nuestra misión es clara y ambiciosa: mejorar la vida de las personas mediante el desarrollo de productos y servicios de alta calidad. Nos esforzamos por crear soluciones que no solo cumplan con las necesidades actuales, sino que también anticipen y aborden los desafíos futuros. Estamos comprometidos con la excelencia en cada paso que damos.',
    vision:
      'Miramos hacia el futuro con una visión audaz. Aspiramos a convertirnos en líderes globales en el mercado tecnológico, siendo reconocidos por nuestra excelencia, innovación y compromiso con la satisfacción del cliente. Visualizamos un mundo donde nuestras soluciones marquen la pauta y establezcan nuevos estándares, allanando el camino para un futuro más eficiente y conectado.',
  };

  return (
    <div className={style.aboutUsContainer}>
      <div className={style.card}>
        <h1 className={style.title}>¿Quiénes Somos?</h1>
        <p className={style.content}>{companyInfo.quienesSomos}</p>
      </div>

      <div className={style.card}>
        <h1 className={style.title}>Misión</h1>
        <p className={style.content}>{companyInfo.mision}</p>
      </div>

      <div className={style.card}>
        <h1 className={style.title}>Visión</h1>
        <p className={style.content}>{companyInfo.vision}</p>
      </div>
    </div>
  );
};

export default AboutUs;