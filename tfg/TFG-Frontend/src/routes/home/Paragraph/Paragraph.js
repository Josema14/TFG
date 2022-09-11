import React from 'react'
import "./Paragraph.css"

export default function Paragraph(props) {
  return (
    <>
    <div className='Paragraph-container'>
          <div className='Paragraph-container-text'>
        <h2>{props.title}</h2>
        <hr/>
        <p>
          {props.text}
        </p>
        
</div>
    
        </div>
    

    </>
  )
}
