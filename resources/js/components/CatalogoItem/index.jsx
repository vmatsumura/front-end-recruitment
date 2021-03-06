import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './CatalogoItem.scss';
import {AdicionarProduto} from 'Actions';
import Store from 'Store';
import {CalcValorPrestacao} from 'Utils';

@CSSModules(styles)
class CatalogoItem extends Component {
  render () {
    const {abrirCarrinho} = this.props;

    let valor = this.props.price ? this.props.price.toFixed(2).toString().split('.')[0] : '00';
    let centavos = this.props.price ? this.props.price.toFixed(2).toString().split('.')[1] : '00';
    let valorPrestacao = this.props.price && this.props.installments ? CalcValorPrestacao(this.props.price, this.props.installments).split('.')[0] : '00';
    let centavosPrestacao = this.props.price && this.props.installments ? CalcValorPrestacao(this.props.price, this.props.installments).split('.')[1] : '00';

    let parcelamento = (
      <p styleName='parcelamento'>
        <span className='descricao'>ou {this.props.installments} x </span>
        <span className='moeda'>{this.props.currencyFormat}</span>
        <span className='valor'>{valorPrestacao},{centavosPrestacao}</span>
      </p>
    );

    parcelamento = this.props.installments > 0 ? parcelamento : '';

    return (
      <li
        styleName='catalogo__item'
        className='col-xs-4 center-xs'
        onClick={() => { Store.dispatch(AdicionarProduto(this.props)); abrirCarrinho(); }}>
        <figure>
          <img src={this.props.imgPath} alt={this.props.title} />
        </figure>
        <h4 styleName='titulo'>{this.props.title}{this.props.description !== '' ? ' - ' + this.props.description : ''}</h4>
        <div styleName='preco'>
          <span className='moeda'>{this.props.currencyFormat}</span>
          <span styleName='valor'>{valor},</span>
          <span className='centavos'>{centavos}</span>
        </div>
        {parcelamento}
      </li>
    );
  }
}

CatalogoItem.defaultProps = {
  id: '',
  sku: '',
  title: 'Novo item',
  description: '',
  availableSizes: '',
  style: '',
  price: '',
  installments: 0,
  currencyId: 'BRL',
  currencyFormat: 'R$',
  isFreeShipping: false,
  imgPath: 'img/catalogo-default.jpg',
  imgThumbPath: 'img/carrinho-item-default-thumb.jpg',
  adicionarProdutoCarrinho: () => {},
  calcularValorPrestacao: () => {}
};

CatalogoItem.propTypes = {
  id: PropTypes.number,
  sku: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  availableSizes: PropTypes.array,
  style: PropTypes.string,
  price: PropTypes.number,
  installments: PropTypes.number,
  currencyId: PropTypes.string,
  currencyFormat: PropTypes.string,
  isFreeShipping: PropTypes.bool,
  imgPath: PropTypes.string,
  imgThumbPath: PropTypes.string,
  adicionarProdutoCarrinho: PropTypes.func,
  calcularValorPrestacao: PropTypes.func
};

export default CatalogoItem;
