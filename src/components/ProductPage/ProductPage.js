import { useContext,useState } from 'react'

import PRODUCT_LIST from './../../data/PRODUCT_LIST'
import { useParams } from 'react-router-dom'
import CartContext from '../../store/cart-context'
import ProductItemActions from '../Layout/Main/ProductCartButton'
import classes from './ProductPage.module.scss'
import Wrapper from './../UI/Wrapper'
import ProductPageButton from './ProductPageButton'

const ProductPage = props => {



	const { id } = useParams()
	const product = PRODUCT_LIST.find(product => product.id === id)

	const cartCtx = useContext(CartContext)
	const addToCartHandler = amount => {
		cartCtx.addItem({
			id: product.id,
			name: product.name,
			amount: amount,
			price: product.price,
			photo: product.gallery[0],
		})
	}

	const [img,setImg] = useState(product.gallery[0])

	
const changeImg = e => {
	setImg(e.target.src)
}

	return (
		<Wrapper>
			<div className={classes.product}>
				<div className={classes['product__gallery']}>
					{product.gallery.map(item => (
						<img onClick={changeImg} className={classes['product__gallery-item']} src={item} alt='product screens' />
					))}
				</div>
				<img className={classes['product__hero-img']} src={img} alt='main-photo' />
				<div className={classes['product__text']}>
					<h2 className={classes['product__text-name']}>{product.name}</h2>
					<p className={classes['product__text-dev']}> {product.developer}</p>
					<h3>Information</h3>
					{product.platform && (
						<p className={classes['product__text-info']}>
							Platform: <span>{product.platform}</span>
						</p>
					)}
					{product.version && (
						<p className={classes['product__text-info']}>
							Language: <span>{product.version}</span>
						</p>
					)}
					{product.capacity && (
						<p className={classes['product__text-info']}>
							Capacity: <span>{product.capacity}</span>
						</p>
					)}
					{product.color && (
						<p className={classes['product__text-info']}>
							Color:{product.color.map(color=> <button
								className={classes['product__text-info--color']}
								style={{ backgroundColor: `${color}` }}></button>)}
						</p>
					)}

					{product.content && (
						<p className={classes['product__text-info']}>
							Content: <span>{product.content.map(item => item + ', ')}</span>
						</p>
					)}

					<p className={classes['product__text-info']}>
						Description: <span>{product.description}</span>
					</p>
					<div className={classes['product__price']}>
						<p>{product.price}zł</p>
					</div>
					<ProductPageButton onAddToCart={addToCartHandler} showCartModalHandler={props.showCartModalHandler} />
				</div>
			</div>
		</Wrapper>
	)
}

export default ProductPage