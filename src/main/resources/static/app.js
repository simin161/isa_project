const homePage = { template: '<homepage></homepage>' }
const signIn = { template: '<sign-in></sign-in>'}
const register = { template: '<register></register>'}
const boats = { template: '<boats></boats>'}
const bungalows = { template: '<bungalows></bungalows>'}
const instructors = { template: '<instructors></instructors>'}
const profile = {template: '<profile></profile>'}
const reservationHistory = {template: '<reservationHistory></reservationHistory>'}
const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: homePage},
		{ path: '/signIn', component: signIn},
		{ path: '/register', component: register},
		{ path: '/boats', component: boats},
		{ path: '/bungalows', component: bungalows},
		{ path: '/instructors', component: instructors},
		{ path: '/account', component: profile },
		{ path: '/reservationHistory', component: reservationHistory}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});