Vue.component('homepage', {
	data: function(){
		return{	
			loggedUser: null,
		}
	},
template: `	
		<div class="homepage">
			<nav-bar></nav-bar>

			<div class="welcome-text container-fluid justify-content-center">
				<h1 v-if="loggedUser == '' || loggedUser == 'CUSTOMER'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser == 'BUNGALOW_OWNER'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser == 'BOAT_OWNER'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser == 'INSTRUCTOR'">Plan your next trip with confidence!</h1>
			</div>

			<div class="wrapper" v-if="loggedUser == '' || loggedUser.userType == 'CUSTOMER'">

				<div class="card">
					<img src="images/homepage-bungalows.jpg">
					<div class="info">
						<h1>Bungalows</h1>
						<p>Perfect places to rest after a day full of fishing!</p>
						<a class="btn btn-light" href="#/bungalows" role="button">Read More</a>
					</div>
				</div>

				<div class="card">
					<img src="images/homepage-boats.jpg">
					<div class="info">
						<h1>Boats</h1>
						<p>The easiest eay to get around here</p>
						<a class="btn btn-light" href="#/boats" role="button">Read More</a>
					</div>
				</div>		

				<div class="card">
					<img src="images/homepage-courses.jpg">
					<div class="info">
						<h1>Courses</h1>
						<p>Get prepared for the best adventures!</p>
						<a class="btn btn-light" href="#/instructors" role="button">Read More</a>
					</div>
				</div>
			
			</div>

			<div class="wrapper" v-if="loggedUser.userType == 'BUNGALOW_OWNER'">

				<div class="card">
					<img src="images/homepage-bungalows.jpg">
					<div class="info">
						<h1>My Bungalows</h1>
						<p>Manage your bungalows!</p>
						<a class="btn btn-light" href="#/my-bungalows" role="button">My bungalows</a>
					</div>
				</div>
			
			</div>

			<div class="wrapper" v-if="loggedUser.userType == 'BOAT_OWNER'">

				<div class="card">
					<img src="images/homepage-boats.jpg">
					<div class="info">
						<h1>My Boats</h1>
						<p>Manage your boats!</p>
						<a class="btn btn-light" href="#/my-boats" role="button">My boats</a>
					</div>
				</div>

			</div>

			<div class="wrapper" v-if="loggedUser.userType == 'INSTRUCTOR'">

				<div class="card">
					<img src="images/homepage-courses.jpg">
					<div class="info">
						<h1>My Courses</h1>
						<p>Manage your courses!</p>
						<a class="btn btn-light" href="#/my-courses" role="button">My courses</a>
					</div>
				</div>

			</div>

		</div>
		`
	,
    mounted(){
        axios.get("/api/authenticateUser")
            .then(response => this.loggedUser = response.data)
        console.log(this.loggedUser);
    }

});