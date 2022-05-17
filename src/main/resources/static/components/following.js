Vue.component('following', {
	data: function(){
		return{
            offers: []
		}
	},
template: `
		<div>
            <nav-bar></nav-bar>
            <div class="container">
<div class="container mt-5">
    					<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="o in offers">
    						<div class="row g-0">
    							<div class="col-md-4" style="text-align:center;">
    								<img src="../images/bungalow-images/bungalow-1-out-1.jpg" class="img-fluid rounded" style="margin:0 auto;"alt="James Bond's Bungalow">
    							</div>
    							<div class="col-md-8">
    								<div class="card-body">
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{o.offer.offerName}}</h5>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{o.offer.description}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Unit price: {{o.offer.unitPrice}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{o.offer.rating}}</p>
    									<button class="float-end btn btn-light" @click="showMore(boat.offer)">Show more</button>
    									<button v-show="o.followed" class="float-end btn btn-light" @click="follow(o.offer)">Unfollow</button>
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
            follow : function(offer){
                            axios.defaults.headers.common["Authorization"] =
                                           localStorage.getItem("user");
                            axios.post("/api/addFollower", {"id" : offer.id})
                                  .then(response => {
                                   axios.defaults.headers.common["Authorization"] =
                                                            localStorage.getItem("user");
                                              axios.get("/api/getSubscriptionsByUser")
                                                   .then(response => {
                                                      this.offers = response.data;
                                               })
                                  });
                        }
        },
        mounted(){
             axios.defaults.headers.common["Authorization"] =
                                    localStorage.getItem("user");
             axios.get("/api/getSubscriptionsByUser")
                  .then(response => {
                      this.offers = response.data;
                  })
        }
});