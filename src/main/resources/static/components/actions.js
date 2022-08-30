Vue.component('actions', {
data: function(){
    		return{
    			showPage: 0,
    			sortOption: "",
    			searchParams: {
    			    bungalowName : "",
    			    bungalowLocation: ""
    			},
    			reservations:[]
    		}
    	},
    template: `
    	<div>
    		<nav-bar></nav-bar>
    		<br>
    		<br>
            <div class="my-bungalows">
    			<div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; height:80vh">
    				<form class="justify-content-center">
    					<table class="justify-content-center" style="width:90%; margin-left:5%; table-layout:fixed;" >
    						<tr><td colspan="1"><input v-model="searchParams.bungalowName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Bungalow's name" /></td>
    							<td colspan="1"><input v-model="searchParams.bungalowLocation" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Bungalow's location"/></td>
    							<td rowspan="2"><input @click="search" class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Search" /></td>
    						</tr>
    						<br>
    						<tr>
    							<td colspan="2">
    								<select v-model="sortOption" class="select-sort" name="select" id="format">
    									<option selected disabled>Sort by</option>
    									<option value="AscAlpha" >Sort alphabetically (A-Z)</option>
    									<option value="DescAlpha">Sort alphabetically (Z-A)</option>
    									<option value="AscRating">Sort by average rating (Asc)</option>
    									<option value="DescRating">Sort by average rating (Desc)</option>
    									<option value="AscPrice">Sort by price: low to high</option>
    									<option value="DescPrice">Sort by price: hight to low</option>
    								</select>
    							</td>
    							<tr>
    							    <td><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Sort" @click="sortedArray"/></td>
    							</tr>
    						</tr>
    					</table>
    				</form>
    				<div class="container mt-5">
    					<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="reservation in reservations">
    						<div class="row g-0">
    							<div class="col-md-4" style="text-align:center;">
    								<img src="../images/bungalow-images/bungalow-1-out-1.jpg" class="img-fluid rounded" style="margin:0 auto;"alt="James Bond's Bungalow">
    							</div>
    							<div class="col-md-8">
    								<div class="card-body">
    								    <h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{reservation.startDate}} - {{reservation.endDate}}</h5>
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{reservation.offer.offerName}}</h5>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{reservation.offer.description}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Number of people: {{reservation.numberOfPeople}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Unit price: {{reservation.offer.unitPrice}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Total price: {{reservation.totalPrice}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Discount: {{reservation.discount}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{reservation.offer.rating}}</p>
    									<button class="float-end btn btn-light" style="margin-right:2.5%;" @click="makeReservation(reservation)">Book!</button>
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
              axiosParams() {
                  const params = new URLSearchParams();
                  params.append('name', this.searchParams.bungalowName);
                  params.append('location', this.searchParams.bungalowLocation);
                  params.append('type', 'BUNGALOW');
                  return params;
              }
          }
          ,
          methods : {
            search : function(){
                axios.get('/api/search', {
                     params: this.axiosParams
                }).then(response => (this.bungalows = response.data))
            },
            makeReservation : function(reservation){
            axios.defaults.headers.common["Authorization"] =
                           localStorage.getItem("user");
                axios.post("/api/makeReservationAction",{"id" : reservation.id})
                     .then((response)=>{
                        if(response.data){
                           axios.defaults.headers.common["Authorization"] =
                                                                       localStorage.getItem("user");
                                       axios.post("/api/getActionsForOffer", {"id" : id})
                                            .then((response) => {this.reservations = response.data})
                        }else{
                            Swal.fire('Ooops, something went wrong!',
                	                  'Please, try again later',
                	                  'error')
                        }
                     })
            },
            sortedArray: function() {
                   if(this.sortOption === 'DescAlpha'){
                       function compare(a, b) {
                         if (a.offerName > b.offerName)
                           return -1;
                         if (a.offerName < b.offerName)
                           return 1;
                        return 0;
                      }
                       return this.bungalows.sort(compare);
                   }
                    if(this.sortOption === 'AscAlpha'){
                        function compare(a, b) {
                            if (a.offerName < b.offerName)
                               return -1;
                            if (a.offerName > b.offerName)
                               return 1;
                            return 0;
                        }
                        return this.bungalows.sort(compare);
                    }
                    if(this.sortOption === 'DescRating'){
                       function compare(a, b) {
                         if (a.rating > b.rating)
                           return -1;
                         if (a.rating < b.rating)
                           return 1;
                        return 0;
                      }
                       return this.bungalows.sort(compare);
                   }
                    if(this.sortOption === 'AscRating'){
                        function compare(a, b) {
                            if (a.rating < b.rating)
                               return -1;
                            if (a.rating > b.rating)
                               return 1;
                            return 0;
                        }
                        return this.bungalows.sort(compare);
                    }
                    if(this.sortOption === 'DescPrice'){
                       function compare(a, b) {
                         if (a.unitPrice > b.unitPrice)
                           return -1;
                         if (a.unitPrice < b.unitPrice)
                           return 1;
                        return 0;
                      }
                       return this.bungalows.sort(compare);
                   }
                    if(this.sortOption === 'AscPrice'){
                        function compare(a, b) {
                            if (a.unitPrice < b.unitPrice)
                               return -1;
                            if (a.unitPrice > b.unitPrice)
                               return 1;
                            return 0;
                        }
                        return this.bungalows.sort(compare);
                    }
             }
          },
        mounted(){
            const id = window.location.hash.split('/')[2];
            axios.defaults.headers.common["Authorization"] =
                                            localStorage.getItem("user");
            axios.post("/api/getActionsForOffer", {"id" : id})
                 .then((response) => {this.reservations = response.data})
        }

});