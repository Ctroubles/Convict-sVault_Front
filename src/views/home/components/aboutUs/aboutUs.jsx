import React, { useState } from 'react';
import style from "./aboutUs.module.css"

const AboutUs = () => {
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rotation3, setRotation3] = useState(0);

  const companyInfo = {
    quienesSomos:
      'Somos una empresa apasionada por la innovación y la tecnología. Desde nuestros inicios, nos hemos dedicado a brindar soluciones tecnológicas vanguardistas que superan las expectativas de nuestros clientes. Nos enorgullece ser impulsores del cambio y contribuir al progreso de la sociedad.',
    mision:
      'Somos una empresa dedicada a las ventas online. Nuestro propósito es apoyar a emprendedores comercializando sus productos y los nuestros. También realizamos campañas sociales, apoyando a personas privadas de la libertad con sus artesanías y aprendizajes, donaciones para animales, niños y todo lo que esté a nuestro alcance.',
    vision:
      'Para el año 2026, queremos ser reconocidos como una de las mejores páginas web a nivel nacional, apoyando la resocialización y colaborando entre emprendedores.',
  };
  

  const handleClick = (cardNumber) => {
    switch (cardNumber) {
      case 1:
        setRotation1(rotation1 + 180);
        break;
      case 2:
        setRotation2(rotation2 + 180);
        break;
      case 3:
        setRotation3(rotation3 + 180);
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.aboutUsContainer}>
      <div
        className={style.card}
        style={{
          transform: `rotateY(${rotation1}deg)`,
        }}
        onClick={() => handleClick(1)}
      >
        <div className={style.front}>
          <h1 className={style.title}>¿Quiénes Somos?</h1>
        </div>
        <div className={style.back}>
          <p className={style.content}>{companyInfo.quienesSomos}</p>
        </div>
      </div>

      <div
        className={style.card}
        style={{
          transform: `rotateY(${rotation2}deg)`,
        }}
        onClick={() => handleClick(2)}
      >
        <div className={style.front}>
          <h1 className={style.title}>Misión</h1>
        </div>
        <div className={style.back}>
          <p className={style.content}>{companyInfo.mision}</p>
        </div>
      </div>

      <div
        className={style.card}
        style={{
          transform: `rotateY(${rotation3}deg)`,
        }}
        onClick={() => handleClick(3)}
      >
        <div className={style.front}>
          <h1 className={style.title}>Visión</h1>
        </div>
        <div className={style.back}>
          <p className={style.content}>{companyInfo.vision}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
