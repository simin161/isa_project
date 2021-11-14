const homePage = { template: '<homepage></homepage>' }
const signIn = { template: '<sign-in></sign-in>'}
const register = { template: '<register></register>'}
const boats = { template: '<boats></boats>'}
const bungalows = { template: '<bungalows></bungalows>'}
const courses = { template: '<courses></courses>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: homePage},
		{ path: '/signIn', component: signIn},
		{ path: '/register', component: register},
		{ path: '/boats', component: boats},
		{ path: '/bungalows', component: bungalows},
		{ path: '/courses', component: courses}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});