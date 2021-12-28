Vue.component('homepage', {
	data: function(){
		return{	}
	},
template: `	
		<div>
		
			<nav-bar></nav-bar>
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
							<h2>Instructors</h2>
							<a href="#/instructors">See more ...</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		`

});