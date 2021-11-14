const homePage = { template: '<homepage></homepage>' }
const signIn = { template: '<sign-in></sign-in>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: homePage},
		{ path: '/signIn', component: signIn}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});