const homePage = { template: '<homepage></homepage>' }
const signIn = { template: '<sign-in></sign-in>'}
const register = { template: '<register></register>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: homePage},
		{ path: '/signIn', component: signIn},
		{ path: '/register', component: register}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});