Vue.component('boats', {
data: function(){
    		return{
    		    loggedUser: {
                    userType:''
                },
    			showPage: 0,
    			sortOption: "",
    			boatToShow: {
    			    offer: null,
    			    followed: false
    			},
                searchParams: {
                    boatName : "",
                    boatLocation: "",
                    startDate: "",
                    endDate: ""
                },
    			boats:[],
    			terms:[],
    			reviews: [],
    			additionalServices: ""
    		}
    	},
    template: `
    	<div>
    		<nav-bar></nav-bar>
    		<br>
    		<br>
            <div class="my-bungalows">
    			<div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh" v-show="showPage == 0">
    				<form class="justify-content-center">
    					<table class="justify-content-center" style="width:90%; margin-left:5%; table-layout:fixed;" >
    						<tr><td colspan="1"><input v-model="searchParams.boatName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Boat's name" /></td>
    							<td colspan="1"><input v-model="searchParams.boatLocation" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Boat's location"/></td>
    					        <td colspan="1"><input v-model="searchParams.startDate" class="update-text-profile" class="datetime-local" type="datetime-local" style="height:20px; font-size:12px; font-family:'poppins-light'"/></td>
                          </tr>
                          <tr>
                             <td colspan="1"><input v-model="searchParams.endDate" class="update-text-profile" class="datetime-local" type="datetime-local" style="height:20px; font-size:12px; font-family:'poppins-light'"/></td>
                             <td rowspan="2"><input class="confirm-profile" @click="search" type="button" style="background-color: #1b4560; font-size: 15px;" value="Search" /></td>
                          </tr>
    				 		<br>
    						<tr>
    							<td colspan="2">
    								<select v-model="sortOption" class="select-sort" name="select" id="format">
    									<option selected disabled>Sort by</option>
    									<option value="AscAlpha">Sort alphabetically (A-Z)</option>
    									<option value="DescAlpha">Sort alphabetically (Z-A)</option>
    									<option value="AscRating">Sort by average rating (Asc)</option>
    									<option value="DescRating">Sort by average rating (Desc)</option>
    									<option value="AscPrice">Sort by price: low to high</option>
    									<option value="DescPrice">Sort by price: hight to low</option>
    								</select>
    							</td>
    							<td><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Sort" @click="sortedArray"/></td>
    						</tr>
    						<tr>
                            </tr>
    					</table>
    				</form>
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
    									<button class="float-end btn btn-light" @click="showMore(boat)" style="margin-left: 5px;">Show more</button>
    									<span v-show="loggedUser.userType === 'CUSTOMER'">
    									    <button class="float-end btn btn-light" v-show="!boat.followed" @click="follow(boat.offer)" style="margin-left: 5px;">Follow</button>
    								    </span>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
                </div>
                <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh" v-show="showPage == 1">
                   	<div class="container" v-show="showPage == 1">
    					<div class="container align-items-start">
    						<input class="confirm-profile" type="button" value="Back" style="width:15%; float:left; font-size:12px; background-color: #881A02" @click="showPage = 0"/>
    						<input type="button" class="confirm-profile" @click="showTerms(boatToShow.offer)" style="width:15%; margin-left: 8px; float:left; font-size:12px; background-color: white; color: black;" value="Show terms"/>
                            <input class="confirm-profile" type="button" value="Show gallery" style="width:15%; float:left; margin-left: 8px; margin-right: 8px; font-size:12px; background-color: white; color: black;" @click="showPage = 3"/>
                            <input class="confirm-profile" type="button" value="Show reviews" style="width:15%; float:left; margin-left 8px; font-size:12px; background-color: white; color: black;" @click="showReviews(boatToShow.offer.id)"/>
                            <span v-show="loggedUser.userType === 'CUSTOMER'">
                                 <input class="confirm-profile" type="button" style="width:15%; float:left; margin-left: 8px; font-size:12px; background-color: white; color: black;" @click="showActions(boatToShow.offer.id)" value="Show actions"/>
                            </span>
                            <br><br><br>
    						<form class="justify-content-center">
    						    <p class="title-text-bold" style="margin-top:10px; text-align:center;"> {{boatToShow.offer.offerName}} </p>
    							<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
    								<tr class="d-flex justify-content-evenly">
    									<td><input type="text" placeholder="   Country" class="input-text"  v-model="boatToShow.offer.location.country"/></td>
    									<td><input type="text" placeholder="   City" class="input-text"  v-model="boatToShow.offer.location.city"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Street" class="input-text"  v-model="boatToShow.offer.location.street"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Street number" class="input-text"  v-model="boatToShow.offer.location.streetNumber"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Unit price" class="input-text"  v-model="boatToShow.offer.unitPrice"/></td></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area"  v-model="boatToShow.offer.description" ></textarea></tr><br>
    								<tr><td><input type="text" placeholder="   Maximum capacity" class="input-text"  v-model="boatToShow.offer.maxCustomerCapacity"/></td></tr><br>
    								<tr><textarea rowspan="3"name="text" placeholder="   Additional services (Wi-fi, Parking, etc.)" class="input-text-area"  v-model="additionalServices" ></textarea></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="boatToShow.offer.rulesOfConduct" ></textarea></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="boatToShow.offer.cancellationPolicy" ></textarea></tr><br>
    							</table>
    						</form>
    					</div>
                   	</div>
                </div>
                <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh" v-show="showPage == 2">
                    <div class="container" v-show="showPage == 2">
                         <div class="container align-items-start">
                             <input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: #881A02" @click="showPage = 1"/><br><br><br>
                             <p class="title-text-bold" style="margin-top:10px; text-align:center;">All terms</p>
                             <div v-for="term in terms" style="border-bottom: solid thick white">
                                 <p style="color:#fff;font-family:poppins-light; font-size:12px;">Start date: {{term.startTime}}</p>
                                 <p style="color:#fff;font-family:poppins-light; font-size:12px;">End date: {{term.endTime}}</p>
                                 <span v-show="loggedUser.userType === 'CUSTOMER'">
                                     <button class="float-end btn btn-light" @click="showReservation(term)">Make reservation</button>
                                 </span>
                                 <br/>
                                 </hr>
                             </div>
                         </div>
                    </div>
                </div>
                <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh" v-show="showPage == 4">
                    <div class="container mt-5">
                        <input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: #881A02" @click="showPage = 1"/><br><br><br>
    					<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="r in reviews">
    						<div class="row g-0">
    							<div class="col-md-8">
    								<div class="card-body">
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">Feedback for owner: {{r.contentForOwner}}</h5>
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">Feedback for offer: {{r.contentForOffer}}</h5>
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">Rating for owner: {{r.rateOwner}}</h5>
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">Rating for offer: {{r.rateOffer}}</h5>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
                </div>
                <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh" v-show="showPage == 3">
                     <div class="container mt-5">
                         <input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: #881A02" @click="showPage =1"/><br><br><br>
                    	 <div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="i in boatToShow.offer.images">
                    		<div class="row g-0">
                    			<img :src="i.path"/>
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
                  params.append('name', this.searchParams.boatName);
                  params.append('location', this.searchParams.boatLocation);
                  params.append('type', 'BOAT');
                  params.append('startDate', this.searchParams.startDate);
                  params.append('endDate', this.searchParams.endDate);
                  return params;
              }
          }
          ,
          methods : {
           showReviews : function(id){
                axios.post('/api/allAcceptedFeedbacksForOffer', {"id" : id})
                     .then((result) => {
                         this.reviews = result.data;
                         this.showPage = 4;
                     })
                },
           showActions : function(id){
                          router.push("actions/" + id);
           },
           showReservation : function(term){
                          router.push('/reservationForm/' + term.id);
           },
           showTerms : function(bung){
                axios.defaults.headers.common["Authorization"] =
                                       localStorage.getItem("user");
                axios.get('/api/getTermsByOfferId/' + bung.id)
                     .then((result) => {
                         this.terms = result.data;
                         this.showPage = 2;
                })
           },
           showMore : function(bung){
               this.boatToShow = bung;
               for(let i = 0; i < this.boatToShow.offer.additionalServices.length; i++){
                    this.additionalServices = this.additionalServices + " " + this.boatToShow.offer.additionalServices[i].name;
               }
               this.showPage = 1;
           },
           follow : function(bung){
                axios.defaults.headers.common["Authorization"] =
                               localStorage.getItem("user");
                axios.post("/api/addFollower", {"id" : bung.id})
                      .then(response => {
                       axios.defaults.headers.common["Authorization"] =
                                                localStorage.getItem("user");
                                  axios.get("/api/allBoats")
                                       .then(response => {
                                          this.boats = response.data;
                                   })
                      });
            },
            search : function(){
                if((this.searchParams.startDate != "" && this.searchParams.endDate == "") || (this.searchParams.startDate == "" && this.searchParams.endDate != "")){
                    Swal.fire('Please, fill are date fields!',
                              '',
                              'error')
                }else if(this.searchParams.startDate == "" && this.searchParams.endDate == ""){
                    axios.get('/api/search', {
                         params: this.axiosParams
                    }).then(response => {
                        this.boats = response.data;
                    })
                }else if(this.searchParams.startDate != "" && this.searchParams.endDate != ""){
                    let today = new Date();
                    let startDate = new Date(this.searchParams.startDate);
                    let endDate = new Date(this.searchParams.endDate);
                    if(startDate <= today || endDate <= today){
                        Swal.fire('Date cannot be in the past!',
                                  '',
                                  'error')
                    }else if(startDate > today && endDate > today && startDate < endDate){
                        axios.get('/api/search', {
                             params: this.axiosParams
                        }).then(response => {
                            this.boats = response.data;
                        })
                    }else{
                        Swal.fire('Please, enter valid values for start and end date!',
                                  'Start date must be before end date',
                                  'error')
                    }
                }
            }
            ,
             sortedArray: function() {
                   if(this.sortOption === 'DescAlpha'){
                       function compare(a, b) {
                         if (a.offer.offerName > b.offer.offerName)
                           return -1;
                         if (a.offer.offerName < b.offer.offerName)
                           return 1;
                        return 0;
                      }
                       return this.boats.sort(compare);
                   }
                    if(this.sortOption === 'AscAlpha'){
                        function compare(a, b) {
                            if (a.offer.offerName < b.offer.offerName)
                               return -1;
                            if (a.offer.offerName > b.offer.offerName)
                               return 1;
                            return 0;
                        }
                        return this.boats.sort(compare);
                    }
                    if(this.sortOption === 'DescRating'){
                       function compare(a, b) {
                         if (a.offer.rating > b.offer.rating)
                           return -1;
                         if (a.offer.rating < b.offer.rating)
                           return 1;
                        return 0;
                      }
                       return this.boats.sort(compare);
                   }
                    if(this.sortOption === 'AscRating'){
                        function compare(a, b) {
                            if (a.offer.rating < b.offer.rating)
                               return -1;
                            if (a.offer.rating > b.offer.rating)
                               return 1;
                            return 0;
                        }
                        return this.boats.sort(compare);
                    }
                    if(this.sortOption === 'DescPrice'){
                       function compare(a, b) {
                         if (a.offer.unitPrice > b.offer.unitPrice)
                           return -1;
                         if (a.offer.unitPrice < b.offer.unitPrice)
                           return 1;
                        return 0;
                      }
                       return this.boats.sort(compare);
                   }
                    if(this.sortOption === 'AscPrice'){
                        function compare(a, b) {
                            if (a.offer.unitPrice < b.offer.unitPrice)
                               return -1;
                            if (a.offer.unitPrice > b.offer.unitPrice)
                               return 1;
                            return 0;
                        }
                        return this.boats.sort(compare);
                    }
             }
          }
          ,
	mounted(){
	    axios.get("/api/allBoats")
	         .then(response => {this.boats = response.data;
	            this.boatToShow = this.boats[0];
	         axios.defaults.headers.common["Authorization"] =
                            localStorage.getItem("user");
             axios.get("/api/authenticateUser")
                  .then(response => this.loggedUser = response.data);
             })
	}
});
