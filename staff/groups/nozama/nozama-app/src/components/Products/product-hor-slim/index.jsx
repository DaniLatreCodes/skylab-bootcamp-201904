import React from 'react'
import Title from '../Detail/Title'
import Subtitle from '../Detail/Subtitle'
import Image from '../Detail/Image'
import {Row, Container, Col} from 'reactstrap'
import Price from '../Detail/Price';
import Currency from '../Detail/Currency'

function ProductHorizontalSlim(props) {
  const { product, onDetail } = props

  const handleClickImage = (e) => {
    onDetail(product);
  }
  
  const { imageSmall, productName, subtitle, originalPrice, displayCurrency } = product;
  return (
    <div style={{marginTop:"0.2rem", }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-5 col-sm-4" >
            <Image image={imageSmall} onClick={handleClickImage}/>
          </div>
          <div className="col-xs-7 col-sm-4">
            <Title title={productName}/>
            <Subtitle subtitle={subtitle}/>
              <div style={{display:"flex" }}>
                  <Price price={originalPrice}/>
                  <Currency currency={displayCurrency}/>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductHorizontalSlim