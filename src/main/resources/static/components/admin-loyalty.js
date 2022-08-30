Vue.component('bungalows', {
	data: function(){
    		return{
    			showPage: 0,
    			loyalty: {
    			    categoryName: "",
    			    minPoints: "",
    			    maxPoints: "",
    			    categoryDiscount: "",
    			    earningRate: "",
    			    type: ""
    			},
    			loyalties: []
    		}
    	},
    template: `
    	<div>

    		<nav-bar></nav-bar>
    		<br><br>

        <div class="my-bungalows">
    			<div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; height:80vh">

    				<div class="container mt-5">
    					<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="l in loyalties">
    						<div class="row g-0">
    							<div class="col-md-4" style="text-align:center;">
    							</div>
    							<div class="col-md-8">
    								<div class="card-body">
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">Category: {{l.categoryName}}</h5>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Min points: {{l.minPoints}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Max points: {{l.maxPoints}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Discount: {{l.categoryDiscount}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Earning rate: {{l.earningRate}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Type: {{l.type}}</p>
    									<button class="float-end btn btn-light" @click="showMore(l)">Delete category</button>

    								</div>
    							</div>
    						</div>
    					</div>
    				</div>

          </div>

    	</div>
    	</div>

    		`
          ,
          computed: {

          }
          ,
          methods : {
            showMore : function(bung){
               this.bungalowToShow = bung;
               this.showPage = 1;
            }
          }
          ,
          mounted(){
            axios.defaults.headers.common["Authorization"] =
                          localStorage.getItem("user");
            axios.get("/api/getAllLoyaltyCategories")
            .then(response=>{
                this.loyalties = response.data;
            })
          }
});
