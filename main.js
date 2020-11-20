import Vue from 'vue'
import App from './App'
import {
	myRequest
} from "./util/api.js"

Vue.prototype.$myRequest = myRequest

Vue.prototype.$dev_url = "https://localhost:44399"
Vue.prototype.$online_url = "https://bo-test.mrodt.com"

Vue.prototype.getImgSrc = (img) => {
	let imgSrc = img
	if(imgSrc!==''){
		imgSrc = "https://bo-test.mrodt.com/" + img
	}else{
		imgSrc = "https://bo.mrodt.com/Images/NotImg.jpg"
	}
	return imgSrc;
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
