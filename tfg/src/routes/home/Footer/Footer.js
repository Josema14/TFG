import React from 'react'


import "./Footer.css"
export default function Footer() {
  return (
    
    <div className="Footer-container">
    <div class="Footer-row">
    <a href="#"><i class="fa fa-facebook"></i></a>
    <a href="#"><i class="fa fa-instagram"></i></a>
    <a href="#"><i class="fa fa-youtube"></i></a>
    <a href="#"><i class="fa fa-twitter"></i></a>
    </div>
    
    <div class="Footer-row">
    <ul>
    <li><a href="#">Contáctanos</a></li>
    <li><a href="#">Nuestros servicios</a></li>
    <li><a href="#">Política de privacidad</a></li>
    <li><a href="#">Términos y condiciones</a></li>
    </ul>
    </div>
    
    <div class="Footer-row">
    <p>Trabajo de Fin de Grado Universidad de Murcia </p>
    <p>José María Espín Jiménez</p>
    </div>
    </div>
  )
}
