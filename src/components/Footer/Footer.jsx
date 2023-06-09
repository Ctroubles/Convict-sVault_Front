import footer_1 from "./assets/footer-politica-1.png"
import footer_2 from "./assets/footer-politica-2.png"
import footer_3 from "./assets/footer-politica-3.png"
import footer_4 from "./assets/41a75985-d97f-4179-8059-45af4ff1b62c___286642e29f278e11ad3a49d917484061.png"
import footer_5 from "./assets/footer-politica-5.png"
import style from "./Footer.module.css"
import headphones from "./assets/headphones.webp"
import sheet from "./assets/sheet.png"
import visa from "./assets/metodos_pago/visa.svg"
import mastercard from "./assets/metodos_pago/mastercard.svg"


const Footer = ()=>{
    return(
        <div>
            <label>
                <section style={{display:"flex", justifyContent:"center"}}>
                    <div style={{maxWidth:"1200px",width:"100%",padding:"0 20px",}}>
                        <section id={style.nav}>
                            <div>
                                <label>
                                    <img src={footer_1} alt="" />
                                </label>
                                <span>Acerca de nosotros</span>
                            </div> 
                            <div>
                                <label>
                                    <img src={footer_2} alt="" />
                                </label>
                                <span>Términos y condiciones</span>
                            </div> 
                            <div>
                                <label>
                                    <img src={footer_3} alt="" />
                                </label>
                                <span>Política de privacidad</span>
                            </div> 
                            <div>
                                <label>
                                    <img src={footer_4} alt="" />
                                </label>
                                <span>Cambios y Devoluciones</span>
                            </div> 
                            <div>
                                <label>
                                    <img src={footer_5} alt="" />
                                </label>
                                <span>Promociones</span>
                            </div> 
                        </section>
                    </div>
                </section>
                <section style={{display:"flex", justifyContent:"center"}}>
                    <div id={style.infSuperReo}>
                        <div>
                            <div>
                                <div>
                                    <h1>SUPER REO Y+</h1>
                                </div>
                                <div>
                                    <p>Somo un Marketplace online donde encontrarás productos de todo tipo a los mejores precios de 
                                        Colombia.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <h2>¿Necesitas ayuda en tu compra?</h2>
                                </div>
                                <div>
                                    <p>Conversa con nosotros de lunes a viernes de 8:00 am a 5:00 pm y sabado de 9:00 am a 1:00 pm </p>
                                </div>
                                <div className={style.contact} style={{marginBottom:"25px"}}>
                                    <img src={headphones} alt="" />
                                    <span>Llamanos al </span>
                                    <span className={style.blueSpan}> 999 999 999</span>
                                </div>
                                <div className={style.contact}>
                                    <img src={sheet} alt="" />
                                    <span>Mandar una </span>
                                    <span className={style.blueSpan} style={{textDecoration:"underline"}}>solicitud online</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <h2>
                                        Metodos de pago
                                    </h2>
                                </div>
                                <div>
                                    <p>
                                        Conoce los metodos de pago con los que contamos en SUPER REO Y+
                                    </p>
                                </div>
                                <div id={style.imgContainerPayment}>
                                    <img src={visa} alt="" />
                                    <img src={mastercard} alt="" />
                                    <img src={visa} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer id={style.footer}>
                    Copyrigth © 2023 - SUPER REO Y+ 
                </footer>
            </label>
        </div>
    )
};

export default Footer;