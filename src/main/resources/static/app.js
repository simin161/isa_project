// COMPONENTS:
// -- For all users
const homePage = { template: '<homepage></homepage>' }
const signIn = { template: '<sign-in></sign-in>'}
const register = { template: '<register></register>'}
const profile = {template: '<profile></profile>'}
// -- For customers only
const boats = { template: '<boats></boats>'}
const bungalows = { template: '<bungalows></bungalows>'}
const instructors = { template: '<instructors></instructors>'}
const reservationHistory = {template: '<reservationHistory></reservationHistory>'}
// -- For owners only
const myBungalows = {template: '<owner-my-bungalows></owner-my-bungalows>'}
const myBoats = {template: '<owner-my-boats></owner-my-boats>'}
// -- For instructors only
const myCourses = {template: '<instructor-my-courses></instructor-my-courses>'}
// For admins only
// ...

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
		// ROUTES:
		// For all users
	    { path: '/', component: homePage},
		{ path: '/signIn', component: signIn},
		{ path: '/register', component: register},
		{ path: '/account', component: profile },
		// For customers only
		{ path: '/bungalows', component: bungalows},
		{ path: '/boats', component: boats},
		{ path: '/instructors', component: instructors},
		{ path: '/reservationHistory', component: reservationHistory},
		// For owners only
		{ path: '/my-bungalows', component: myBungalows},
		{ path: '/my-boats', component: myBoats},
		// For instructors only
		{ path: '/my-courses', component: myCourses},
		// For admins only
		// ...
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});