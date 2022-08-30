Vue.component('boats', {
data: function(){
    		return{
    		    loggedUser: {
                    userType:''
                },
    			showPage: 0,
    			sortOption: "",
    			boatToShow: {
    			    offerType: "BOAT",
                    offerName: "",
                    location:{
                        country: "",
                        city: "",
                        street: "",
                        streetNumber:""
                    },
                    description:"",
                    unitPrice:"",
                    maxCustomerCapacity:"",
                    maxCustomerCapacity:"",
                    rulesOfConduct:"",
                    additionalServices:"",
                    cancellationPolicy:""
    			},
                searchParams: {
                    boatName : "",
                    boatLocation: "",
                    startDate: "",
                    endDate: ""
                },
    			boats:[],
    			terms:[]
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
    									<button class="float-end btn btn-light" @click="showMore(boat.offer)">Show more</button>
    									<button class="float-end btn btn-light" @click="showTerms(boat.offer)">Show terms</button>
    									<span v-show="loggedUser.userType === 'CUSTOMER'">
    									    <button v-show="!boat.followed" class="float-end btn btn-light" @click="follow(boat.offer)">Follow/unfollow</button>
    								    </span>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>

                   	</div>
                   	<div class="col-md-4 right-div overflow-auto" style="margin-top:-20px; height:80vh" v-show="showPage == 1">
                   	<div class="container" v-show="showPage == 1">
    					<div class="container align-items-start">
    						<input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: gray" @click="showPage = 0"/><br><br><br>
    						<p class="title-text-bold" style="margin-top:10px; text-align:center;"> Show a new Bungalow </p>
    						<form class="justify-content-center">
    							<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
    								<tr><td><input type="text" placeholder="   Bungalow's name" class="input-text" v-model="boatToShow.offerName"/></td></tr><br>
    								<tr class="d-flex justify-content-evenly">
    									<td><input type="text" placeholder="   Country" class="input-text"  v-model="boatToShow.location.country"/></td>
    									<td><input type="text" placeholder="   City" class="input-text"  v-model="boatToShow.location.city"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Street" class="input-text"  v-model="boatToShow.location.street"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Street number" class="input-text"  v-model="boatToShow.location.streetNumber"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Unit price" class="input-text"  v-model="boatToShow.unitPrice"/></td></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area"  v-model="boatToShow.description" ></textarea></tr><br>
    								<tr><td><input type="text" placeholder="   Maximum capacity" class="input-text"  v-model="boatToShow.maxCustomerCapacity"/></td></tr><br>
    								<tr><textarea rowspan="3"name="text" placeholder="   Additional services (Wi-fi, Parking, etc.)" class="input-text-area"  v-model="boatToShow.additionalServices" ></textarea></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="boatToShow.rulesOfConduct" ></textarea></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="boatToShow.cancellationPolicy" ></textarea></tr><br>
    							</table>
    						</form>
    					</div>
                   	</div>
                   	<div class="col-md-4 right-div overflow-auto" style="margin-top:-20px; height:80vh" v-show="showPage == 2">
                       <div class="col-md-4 right-div overflow-auto" style="margin-top:-20px; height:80vh" v-show="showPage == 2">
                                       <div class="container" v-show="showPage == 2">
                                                   <div class="container align-items-start">
                                           <input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: gray" @click="showPage = 0"/><br><br><br>
                                           <p class="title-text-bold" style="margin-top:10px; text-align:center;">Show all terms</p>
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
                axios.get('/api/search', {
                     params: this.axiosParams
                }).then(response => {this.boats = response.data; console.log(this.boats)})
            }
            ,
             sortedArray: function() {
                   if(this.sortOption === 'DescAlpha'){
                       function compare(a, b) {
                         if (a.offerName > b.offerName)
                           return -1;
                         if (a.offerName < b.offerName)
                           return 1;
                        return 0;
                      }
                       return this.boats.sort(compare);
                   }
                    if(this.sortOption === 'AscAlpha'){
                        function compare(a, b) {
                            if (a.offerName < b.offerName)
                               return -1;
                            if (a.offerName > b.offerName)
                               return 1;
                            return 0;
                        }
                        return this.boats.sort(compare);
                    }
                    if(this.sortOption === 'DescRating'){
                       function compare(a, b) {
                         if (a.rating > b.rating)
                           return -1;
                         if (a.rating < b.rating)
                           return 1;
                        return 0;
                      }
                       return this.boats.sort(compare);
                   }
                    if(this.sortOption === 'AscRating'){
                        function compare(a, b) {
                            if (a.rating < b.rating)
                               return -1;
                            if (a.rating > b.rating)
                               return 1;
                            return 0;
                        }
                        return this.boats.sort(compare);
                    }
                    if(this.sortOption === 'DescPrice'){
                       function compare(a, b) {
                         if (a.unitPrice > b.unitPrice)
                           return -1;
                         if (a.unitPrice < b.unitPrice)
                           return 1;
                        return 0;
                      }
                       return this.boats.sort(compare);
                   }
                    if(this.sortOption === 'AscPrice'){
                        function compare(a, b) {
                            if (a.unitPrice < b.unitPrice)
                               return -1;
                            if (a.unitPrice > b.unitPrice)
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
	         axios.defaults.headers.common["Authorization"] =
                            localStorage.getItem("user");
             axios.get("/api/authenticateUser")
                  .then(response => this.loggedUser = response.data);
             })
	}
});
