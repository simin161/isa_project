Vue.component('homepage', {
	data: function(){
		return{	}
	},
template: `	
		<div class="homepage">
			<nav-bar></nav-bar>

			<div class="welcome-text container-fluid justify-content-center">
				<h1>Plan your next trip with confidence!</h1>
			</div>

			<div class="wrapper">
				
				<div class="card">
					<img src="images/homepage-bungalows.jpg">
					<div class="info">
						<h1>Bungalows</h1>
						<p>Lorem Ipsum hehe hu hu hihihi</p>
						<a class="btn btn-light" href="#/bungalows" role="button">Read More</a>
					</div>
				</div>

				<div class="card">
					<img src="images/homepage-boats.jpg">
					<div class="info">
						<h1>Boats</h1>
						<p>Lorem Ipsum hehe hu hu hihihi</p>
						<a class="btn btn-light" href="#/boats" role="button">Read More</a>
					</div>
				</div>		

				<div class="card">
					<img src="images/homepage-courses.jpg">
					<div class="info">
						<h1>Courses</h1>
						<p>Lorem Ipsum hehe hu hu hihihi</p>
						<a class="btn btn-light" href="#/instructors" role="button">Read More</a>
					</div>
				</div>

			</div>

		</div>
		`

});