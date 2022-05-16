Vue.component('following', {
	data: function(){
		return{

		}
	},
template: `
		<div>
            <nav-bar></nav-bar>
            <div class="container">
<div class="container mt-5">
    					<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="boat in boats">
    						<div class="row g-0">
    							<div class="col-md-4" style="text-align:center;">
    								<img src="../images/bungalow-images/bungalow-1-out-1.jpg" class="img-fluid rounded" style="margin:0 auto;"alt="James Bond's Bungalow">
    							</div>
    							<div class="col-md-8">
    								<div class="card-body">
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{boat.offer.offerName}}</h5>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{boat.offer.description}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Unit price: {{boat.offer.unitPrice}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{boat.offer.rating}}</p>
    									<button class="float-end btn btn-light" @click="showMore(boat.offer)">Show more</button>
    									<span v-show="loggedUser.userType === 'CUSTOMER'">
    									<button v-show="!boat.followed" class="float-end btn btn-light" @click="follow(boat.offer)">Unfollow</button>
    								    </span>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
            </div>
		</div>
		`
        ,
        methods : {

        }
});