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
const bungalowReservationHistory = {template: '<bungalowReservationHistory></bungalowReservationHistory>'}
const boatReservationHistory = {template: '<boatReservationHistory></boatReservationHistory>'}
const courseReservationHistory = {template: '<courseReservationHistory></courseReservationHistory>'}
// -- For owners only
const myBungalows = {template: '<owner-my-bungalows></owner-my-bungalows>'}
const myBoats = {template: '<owner-my-boats></owner-my-boats>'}
// -- For instructors only
const myCourses = {template: '<instructor-my-courses></instructor-my-courses>'}
// For admins only
const adminRegReqComplaints = {template: '<admin-reg-req-complaints></admin-reg-req-complaints>'}
const adminRegister = {template: '<admin-register></admin-register>'}
const adminDeletionRequests = {template: '<admin-user-complaints></admin-user-complaints>'}
const adminFishySystems = {template: '<admin-fishy-finds-system></admin-fishy-finds-system>'}
const adminUsersOffers = {template: '<admin-users-offers></admin-users-offers>'}
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
		{ path: '/account', component: profile },
		{ path: '/bungalowReservationHistory', component: bungalowReservationHistory},
		{ path: '/boatReservationHistory', component: boatReservationHistory},
		{ path: '/courseReservationHistory', component: courseReservationHistory},
		// For owners only
		{ path: '/my-bungalows', component: myBungalows},
		{ path: '/my-boats', component: myBoats},
		// For instructors only
		{ path: '/my-courses', component: myCourses},
		// For admins only
        { path: '/admin-reg-req-complaints', component: adminRegReqComplaints},
        { path: '/admin-register', component: adminRegister},
        { path: '/admin-user-complaints', component: adminDeletionRequests},
        { path: '/admin-fishy-finds-system', component: adminFishySystems},
        { path: '/admin-users-offers', component: adminUsersOffers}
		// ...
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});