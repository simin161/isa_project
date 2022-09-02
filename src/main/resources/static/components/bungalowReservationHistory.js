Vue.component('bungalowReservationHistory', {
data: function(){
    		return{
    			showPage: 0,
    			sortOption: "",
    			bungalowToShow: {
    			    id: 0,
    			    offerType: "BUNGALOW",
                    offerName: "",
                    user: {
                        biography: "",
                        email: "",
                        firstName: "",
                        lastName: "",
                        phoneNumber: ""
                    },
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
    			    bungalowName : "",
    			    bungalowLocation: ""
    			},
    			reservations:[],
                feedback:{
                    contentForOffer: "",
                    contentForOwner: "",
                    id: null,
                    rateForOffer: null,
                    rateForOwner: null
                },
                offerType: "BUNGALOW"
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
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Unit price: {{reservation.offer.unitPrice}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{reservation.offer.rating}}</p>
    									<button class="float-end btn btn-light" @click="showMore(reservation)">Show more</button>
    									<button v-show="!reservation.hasFeedback" class="float-end btn btn-light" style="margin-right:2.5%;" @click="showFeedback(reservation)">Add feedback</button>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
                </div>
                <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh" v-show="showPage == 1">
                   	<div class="container" v-show="showPage == 1">
    					<div class="container align-items-start">
    						<input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: #881A02" @click="showPage = 0"/><br><br><br>
    						<p class="title-text-bold" style="margin-top:10px; text-align:center;"> {{bungalowToShow.offerName}} </p>
    						<form class="justify-content-center">
    							<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
    								<tr class="d-flex justify-content-evenly">
    									<td><input type="text" placeholder="   Country" disabled style="color: white" class="input-text"  v-model="bungalowToShow.location.country"/></td>
    									<td><input type="text" placeholder="   City" disabled style="color: white" class="input-text"  v-model="bungalowToShow.location.city"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Street" disabled style="color: white" class="input-text"  v-model="bungalowToShow.location.street"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Street number" disabled style="color: white" class="input-text"  v-model="bungalowToShow.location.streetNumber"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Unit price" disabled style="color: white" class="input-text"  v-model="bungalowToShow.unitPrice"/></td></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Description" disabled style="color: white" class="input-text-area"  v-model="bungalowToShow.description" ></textarea></tr><br>
    								<tr><td><input type="text" placeholder="   Maximum capacity" disabled style="color: white" class="input-text"  v-model="bungalowToShow.maxCustomerCapacity"/></td></tr><br>
    								<tr><textarea rowspan="3"name="text" placeholder="   Additional services (Wi-fi, Parking, etc.)" disabled style="color: white" class="input-text-area"  v-model="bungalowToShow.additionalServices" ></textarea></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area" disabled style="color: white"  v-model="bungalowToShow.rulesOfConduct" ></textarea></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area" disabled style="color: white"  v-model="bungalowToShow.cancellationPolicy" ></textarea></tr><br>
    							</table>
    						</form>
    					</div>
                   	</div>
               	</div>
                <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh" v-show="showPage == 2">
                   	<div class="container" v-show="showPage == 2">
    					<div class="container align-items-start">
    						<input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: #881A02" @click="showPage = 0"/><br><br><br>
    						<p class="title-text-bold" style="margin-top:10px; text-align:center;"> Feedback for bungalow and owner </p>
    						<form class="justify-content-center">
    							<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
    								<tr><td><input type="text" placeholder="   Bungalow's name" disabled class="input-text" style="color: white" v-model="bungalowToShow.offerName"/></td></tr><br>
    								<tr class="d-flex justify-content-evenly">
    								    <td><input type="text" placeholder="   First name" disabled class="input-text" style="color: white" v-model="bungalowToShow.user.firstName"/></td>
    								    <td><input type="text" placeholder="   Last name"  disabled class="input-text" style="color: white" v-model="bungalowToShow.user.lastName"/></td>
    								</tr>
    								<br>
    								<tr class="d-flex justify-content-evenly">
                                        <td style="width: 100%;"><input type="number" onKeyDown="return false" placeholder="    Rating for owner" v-model="feedback.rateForOwner" min="1" max="5" class="input-text" /></td>
                                        <td style="width: 100%;"><input type="number" onKeyDown="return false" placeholder="    Rating for bungalow" v-model="feedback.rateForOffer" min="1" max="5" class="input-text" /></td>
                                    </tr>
                                    <br>
    								<tr><textarea rowspan="4" name="text" placeholder="   Feedback for owner" v-model="feedback.contentForOwner" class="input-text-area" ></textarea></tr><br>
    								<tr><textarea rowspan="4" name="text" placeholder="   Feedback for bungalow" v-model="feedback.contentForOffer" class="input-text-area" ></textarea></tr><br>
                                    <tr><button :disabled="isFilled" type="button" @click="addFeedback" class="confirm">Send</button></tr>
    							</table>
    						</form>
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
              },
              isFilled(){
                return !(/\S/.test(this.feedback.contentForOwner) || /\S/.test(this.feedback.contentForOffer) || /\S/.test(this.feedback.rateForOwner) || /\S/.test(this.feedback.rateForOffer));
              }
          }
          ,
          methods : {
            showMore : function(bung){
               this.bungalowToShow = bung.offer;
               this.showPage = 1;
            },
            showFeedback : function(bung){
                this.bungalowToShow = bung.offer;
                this.feedback.id = bung.id;
                this.showPage = 2;
            },
            search : function(){
                axios.get('/api/search', {
                     params: this.axiosParams
                }).then(response => (this.bungalows = response.data))
            },
            addFeedback : function(){
                axios.defaults.headers.common["Authorization"] =
                                    localStorage.getItem("user");
                axios.post('/api/addFeedback', this.feedback)
                     .then(response => {
                         if(response.data){
                             Swal.fire(
                                 'Complaint sent successfuly!',
                                 '',
                                 'success'
                             )
                             axios.defaults.headers.common["Authorization"] =
                                                                         localStorage.getItem("user");
                                         axios.post("/api/historyOfReservationsForCustomer", { "offerType" : this.offerType })
                                              .then((response) => {this.reservations = response.data; this.showPage = 0;})
                         }else{
                             Swal.fire(
                                 'Ooops, something went wrong!',
                                 'Please, try again later!',
                                 'error'
                             )
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
            axios.defaults.headers.common["Authorization"] =
                                            localStorage.getItem("user");
            axios.post("/api/historyOfReservationsForCustomer", { "offerType" : this.offerType })
                 .then((response) => {this.reservations = response.data})
        }

});