import './scss/index.scss'
const healthBg = document.querySelector('#health')
const linkTo = document.querySelector('.health')

linkTo.addEventListener('click', liftToLink)
function liftToLink() {
	console.log('hiciste click en el link de health')
}
