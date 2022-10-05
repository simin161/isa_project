Vue.component('actions', {
data: function(){
    		return{
    		    loggedUser: {
                   userType:''
                },
    			showPage: 0,
    			sortOption: "",
    			reservations:[],
    		}
    	},
    template: `
    	<div>
    		<nav-bar></nav-bar>
    		<br>
    		<br>
            <div class="my-bungalows">
    			<div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh">
    				<form class="justify-content-center">
    					<table class="justify-content-center" style="width:90%; margin-left:5%; table-layout:fixed;" >
    						<br>
    						<tr>
    							<td colspan="2">
    								<select v-model="sortOption" class="select-sort" name="select" id="format">
    									<option selected disabled>Sort by</option>
    									<option value="AscPrice">Sort by total price: low to high</option>
    									<option value="DescPrice">Sort by total price: high to low</option>
    									<option value="AscDuration">Sort by duration (asc)</option>
                                        <option value="DescDuration">Sort by duration (desc)</option>
                                        <option value="AscStart">Sort by start date (asc)</option>
                                        <option value="DescStart">Sort by start date (desc)</option>
                                        <option value="AscEnd">Sort by end date (asc)</option>
                                        <option value="DescEnd">Sort by end date (desc)</option>
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
    								<img :src="reservation.path" class="img-fluid rounded" style="margin:0 auto;"alt="James Bond's Bungalow">
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
    									<button v-show="loggedUser.userType == 'CUSTOMER'" class="float-end btn btn-light" style="margin-right:2.5%;" @click="makeReservation(reservation)">Book!</button>
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
                    if(this.sortOption === 'DescPrice'){
                       function compare(a, b) {
                         if (a.totalPrice > b.totalPrice)
                           return -1;
                         if (a.totalPrice < b.totalPrice)
                           return 1;
                        return 0;
                      }
                       return this.reservations.sort(compare);
                   }
                    if(this.sortOption === 'AscPrice'){
                        function compare(a, b) {
                            if (a.totalPrice < b.totalPrice)
                               return -1;
                            if (a.totalPrice > b.totalPrice)
                               return 1;
                            return 0;
                        }
                        return this.reservations.sort(compare);
                    }
                    if(this.sortOption === 'DescDuration'){
                       function compare(a, b) {
                         if (a.duration > b.duration)
                           return -1;
                         if (a.duration < b.duration)
                           return 1;
                        return 0;
                      }
                       return this.reservations.sort(compare);
                   }
                    if(this.sortOption === 'AscDuration'){
                        function compare(a, b) {
                            if (a.duration < b.duration)
                               return -1;
                            if (a.duration > b.duration)
                               return 1;
                            return 0;
                        }
                        return this.reservations.sort(compare);
                    }
                    if(this.sortOption === 'DescStart'){
                       function compare(a, b) {
                         if (a.startDate > b.startDate)
                           return -1;
                         if (a.startDate < b.startDate)
                           return 1;
                        return 0;
                      }
                       return this.reservations.sort(compare);
                   }
                    if(this.sortOption === 'AscStart'){
                        function compare(a, b) {
                            if (a.startDate < b.startDate)
                               return -1;
                            if (a.startDate > b.startDate)
                               return 1;
                            return 0;
                        }
                        return this.reservations.sort(compare);
                    }
                    if(this.sortOption === 'DescEnd'){
                       function compare(a, b) {
                         if (a.endDate > b.endDate)
                           return -1;
                         if (a.endDate < b.endDate)
                           return 1;
                        return 0;
                      }
                       return this.reservations.sort(compare);
                   }
                    if(this.sortOption === 'AscEnd'){
                        function compare(a, b) {
                            if (a.endDate < b.endDate)
                               return -1;
                            if (a.endDate > b.endDate)
                               return 1;
                            return 0;
                        }
                        return this.reservations.sort(compare);
                    }
             }
          },
        mounted(){
            const id = window.location.hash.split('/')[2];
            axios.defaults.headers.common["Authorization"] =
                                            localStorage.getItem("user");
            axios.post("/api/getActionsForOffer", {"id" : id})
                 .then((response) => {this.reservations = response.data;
                  axios.defaults.headers.common["Authorization"] =
                                                                  localStorage.getItem("user");
                                             axios.get("/api/authenticateUser")
                                                 .then(response => this.loggedUser = response.data);})
        }

});