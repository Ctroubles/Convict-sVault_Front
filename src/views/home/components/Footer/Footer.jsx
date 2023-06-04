import footer_1 from "./assets/footer-politica-1.png"
import footer_2 from "./assets/footer-politica-2.png"
import footer_3 from "./assets/footer-politica-3.png"
import footer_4 from "./assets/41a75985-d97f-4179-8059-45af4ff1b62c___286642e29f278e11ad3a49d917484061.png"
import footer_5 from "./assets/footer-politica-5.png"
import style from "./Footer.module.css"


const Footer = ()=>{
    return(
        <div>
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
        </div>
    )
};

export default Footer;