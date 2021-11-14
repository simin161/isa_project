Vue.component('homepage', {
	data: function(){
		return{	}
	},
template: `	
			<div>
			<header class="container-fluid">
			<div class="row">
				<div class="container">
					<div class="row">
						<a class="logo" href="#/"><h1 class="col-sm-4">FishyFinds</h1></a>
						<nav class="col-sm-8">
							<a href="#/signIn">Sign in</a>
							<a href="#/register">Register</a>
							<a href="">menu 3</a>
							<a href="">menu 4</a>
						</nav>
					</div>
				</div>
			</div>
		</header>

		<div class="container-fluid main-image hidden-xs" >
			<div class="row">
				<div class="container"> 
					<div class="row">
						<div class="col-xs-12"> 
							<p class="title"> FishyFinds </p>
							<p class="slogan"> Plan your next trip with confidence</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-4 boxes">
					<div class="box">
						<img src="images/bungalows-image-ver1.jpg" class="img-rounded">
						<h2>Bungalows</h2>
						<a href="#/bungalows">See more ...</a>
					</div>
				</div>
				<div class="col-xs-12 col-md-4 boxes">
					<div class="box">
						<img src="images/boats-image-ver1.jpg">
						<h2>Boats</h2>
						<a href="#/boats">See more ...</a>
					</div>
				</div>
				<div class="col-xs-12 col-md-4 boxes">
					<div class="box">
						<img src="images/courses-image-ver1.jpg">
						<h2>Courses</h2>
						<a href="#/courses">See more ...</a>
					</div>
				</div>
			</div>
		</div>
		</div>
		`

});