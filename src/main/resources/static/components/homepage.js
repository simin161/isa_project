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
					<img src="images/bungalow.jpg">
					<div class="info">
						<h1>Bungalows</h1>
						<p>Lorem Ipsum hehe hu hu hihihi</p>
						<a class="btn btn-light" href="#/bungalows" role="button">Read More</a>
					</div>
				</div>

				<div class="card">
					<img src="images/ship.jpg">
					<div class="info">
						<h1>Boats</h1>
						<p>Lorem Ipsum hehe hu hu hihihi</p>
						<a class="btn btn-light" href="#/boats" role="button">Read More</a>
					</div>
				</div>		

				<div class="card">
					<img src="images/course.jpg">
					<div class="info">
						<h1>Courses</h1>
						<p>Lorem Ipsum hehe hu hu hihihi</p>
						<a class="btn btn-light" href="#/instructors" role="button">Read More</a>
					</div>
				</div>


			</div>

		</div>

<!--

			<div class="container-fluid" style="background-color: #1E4E6C;">
				<div class="row">
					<div class="col-xs-12 col-md-4 box">

							<img src="images/bungalow.jpg" class="img-rounded">
							<h2>Bungalows</h2>
							<a href="#/bungalows">See more ...</a>
					</div>
					<div class="col-xs-12 col-md-4 boxes">
							<img src="images/ship.jpg">
							<h2>Boats</h2>
							<a href="#/boats">See more ...</a>
					</div>
					<div class="col-xs-12 col-md-4 boxes">
						<div class="box">
							<img src="images/course.jpg">
							<h2>Instructors</h2>
							<a href="#/instructors">See more ...</a>
					</div>
				</div>
			</div>
		</div>

-->

		`

});