Vue.component('upcoming', {
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
    		    offerName : "",
    			reservations:[],
    			complaint:{
    			    content: "",
    			    offer: null,
    			    user: null
    			},
                feedback:{
                    content: "",
                    id: null,
                    rate: null
                },
                filterOptions: "noFilter",
                copyOfReservations: []
    		}
    	},
    template: `
    	<div>
    		<nav-bar></nav-bar>
    		<br>
    		<br>
            <div class="my-bungalows">
    			<div class="col-md-4 left-div overflow-auto" v-show="showPage == 0 " style="margin-top:-20px; margin-left: 22%; height:80vh">
    				<form class="justify-content-center">
    					<table class="justify-content-center" style="width:90%; margin-left:5%; table-layout:fixed;" >
    						<tr><td colspan="1"><input v-model="offerName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Offer's name" /></td>
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
                                        <option value="AscPrice">Sort by unit price: low to high</option>
                                        <option value="DescPrice">Sort by unit price: high to low</option>
                                        <option value="AscTotalPrice">Sort by total price: low to high</option>
                                        <option value="DescTotalPrice">Sort by total price: high to low</option>
                                        <option value="AscDuration">Sort by duration (asc)</option>
                                        <option value="DescDuration">Sort by duration (desc)</option>
                                        <option value="AscStartDate">Sort by start date (asc)</option>
                                        <option value="DescStartDate">Sort by start date (desc)</option>
                                        <option value="AscEndDate">Sort by end date (asc)</option>
                                        <option value="DescEndDate">Sort by end date (desc)</option>
    								</select>
    							</td>
    							<td><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Sort" @click="sortedArray"/></td>
    						</tr>
                            <br>
    						<tr>
    							<td colspan="2">
    								<select v-model="filterOptions" class="select-sort" name="select" id="format">
    									<option selected value="noFilter">No filter applied</option>
                                        <option value="BUNGALOW" >Bungalows</option>
                                        <option value="BOAT">Boats</option>
                                        <option value="COURSE">Courses</option>
    								</select>
    							</td>
    							<td><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Filter" @click="filterArray"/></td>
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
                                        <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Duration: {{reservation.duration}}</p>
                                        <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{reservation.offer.rating}}</p>
    									<button class="float-end btn btn-light" @click="showMore(reservation)">Show more</button>
    									<button class="float-end btn btn-light" style="margin-right:2.5%;" @click="cancelReservation(reservation)">Cancel reservation</button>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
    		    </div>
                   	<div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh" v-show="showPage == 1">
                        <div class="container" v-show="showPage == 1">
                            <div class="container align-items-start">
                                <input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: gray" @click="showPage = 0"/><br><br><br>
                                <p class="title-text-bold" style="margin-top:10px; text-align:center;"> {{bungalowToShow.offerName}} </p>
                                <form class="justify-content-center">
                                    <table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
                                        <tr class="d-flex justify-content-evenly">
                                            <td><input type="text" placeholder="   Country" class="input-text"  v-model="bungalowToShow.location.country"/></td>
                                            <td><input type="text" placeholder="   City" class="input-text"  v-model="bungalowToShow.location.city"/></td></tr><br>
                                        <tr><td><input type="text" placeholder="   Street" class="input-text"  v-model="bungalowToShow.location.street"/></td></tr><br>
                                        <tr><td><input type="text" placeholder="   Street number" class="input-text"  v-model="bungalowToShow.location.streetNumber"/></td></tr><br>
                                        <tr><td><input type="text" placeholder="   Unit price" class="input-text"  v-model="bungalowToShow.unitPrice"/></td></tr><br>
                                        <tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area"  v-model="bungalowToShow.description" ></textarea></tr><br>
                                        <tr><td><input type="text" placeholder="   Maximum capacity" class="input-text"  v-model="bungalowToShow.maxCustomerCapacity"/></td></tr><br>
                                        <tr><textarea rowspan="3"name="text" placeholder="   Additional services (Wi-fi, Parking, etc.)" class="input-text-area"  v-model="bungalowToShow.additionalServices" ></textarea></tr><br>
                                        <tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="bungalowToShow.rulesOfConduct" ></textarea></tr><br>
                                        <tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="bungalowToShow.cancellationPolicy" ></textarea></tr><br>
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
              }
          }
          ,
          methods : {
            showMore : function(bung){
               this.bungalowToShow = bung.offer;
               let addServices = "";
               for(let i = 0; i < this.bungalowToShow.additionalServices.length; i++){
                addServices = addServices + " " + this.bungalowToShow.additionalServices[i].name;
               }
               this.bungalowToShow.additionalServices = addServices;
               this.showPage = 1;
            },
            search : function(){
                let newArray = this.reservations.filter(el => {
                    let text = this.offerName;
                    return el.offer.offerName.toLowerCase().includes(text);
                })
                this.reservations = newArray;
            },
            cancelReservation : function(reservation){
                axios.post("/api/cancelReservation", {"id" : reservation.id})
                     .then((response)=>{
                        if(response.data){
                            axios.defaults.headers.common["Authorization"] =
                                           localStorage.getItem("user");
                            axios.get("/api/upcomingReservationsForCustomer")
                                 .then((response) => {this.reservations = response.data})
                        }else{
                            Swal.fire('Ooops, something went wrong!',
                	                  'Please, try again later',
                	                  'error')
                        }
                     })
            },
            filterArray: function(){
                if(this.filterOptions === "noFilter"){
                    this.reservations = this.copyOfReservations;
                }else{
                    this.reservations = this.copyOfReservations;
                    let newArray = this.reservations.filter(el => {
                        return el.offer.offerType === this.filterOptions;
                    })

                    this.reservations = newArray;
                }
            },
            sortedArray: function() {
                if(this.sortOption === 'DescAlpha'){
                                   function compare(a, b) {
                                     if (a.offer.offerName > b.offer.offerName)
                                       return -1;
                                     if (a.offer.offerName < b.offer.offerName)
                                       return 1;
                                    return 0;
                                  }
                                   return this.reservations.sort(compare);
                               }
                                if(this.sortOption === 'AscAlpha'){
                                    function compare(a, b) {
                                        if (a.offer.offerName < b.offer.offerName)
                                           return -1;
                                        if (a.offer.offerName > b.offer.offerName)
                                           return 1;
                                        return 0;
                                    }
                                    return this.reservations.sort(compare);
                                }
                                if(this.sortOption === 'DescRating'){
                                   function compare(a, b) {
                                     if (a.offer.rating > b.offer.rating)
                                       return -1;
                                     if (a.offer.rating < b.offer.rating)
                                       return 1;
                                    return 0;
                                  }
                                   return this.reservations.sort(compare);
                               }
                                if(this.sortOption === 'AscRating'){
                                    function compare(a, b) {
                                        if (a.offer.rating < b.offer.rating)
                                           return -1;
                                        if (a.offer.rating > b.offer.rating)
                                           return 1;
                                        return 0;
                                    }
                                    return this.reservations.sort(compare);
                                }
                                if(this.sortOption === 'DescPrice'){
                                   function compare(a, b) {
                                     if (a.offer.unitPrice > b.offer.unitPrice)
                                       return -1;
                                     if (a.offer.unitPrice < b.offer.unitPrice)
                                       return 1;
                                    return 0;
                                  }
                                   return this.reservations.sort(compare);
                               }
                                if(this.sortOption === 'AscPrice'){
                                    function compare(a, b) {
                                        if (a.offer.unitPrice < b.offer.unitPrice)
                                           return -1;
                                        if (a.offer.unitPrice > b.offer.unitPrice)
                                           return 1;
                                        return 0;
                                    }
                                    return this.reservations.sort(compare);
                                }
                                if(this.sortOption === 'DescTotalPrice'){
                                   function compare(a, b) {
                                     if (a.totalPrice > b.totalPrice)
                                       return -1;
                                     if (a.totalPrice < b.totalPrice)
                                       return 1;
                                    return 0;
                                  }
                                   return this.reservations.sort(compare);
                               }
                                if(this.sortOption === 'AscTotalPrice'){
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
                                if(this.sortOption === 'DescStartDate'){
                                   function compare(a, b) {
                                     if (a.startDate > b.startDate)
                                       return -1;
                                     if (a.startDate < b.startDate)
                                       return 1;
                                    return 0;
                                  }
                                   return this.reservations.sort(compare);
                               }
                                if(this.sortOption === 'AscStartDate'){
                                    function compare(a, b) {
                                        if (a.startDate < b.startDate)
                                           return -1;
                                        if (a.startDate > b.startDate)
                                           return 1;
                                        return 0;
                                    }
                                    return this.reservations.sort(compare);
                                }
                                if(this.sortOption === 'DescEndDate'){
                                   function compare(a, b) {
                                     if (a.endDate > b.endDate)
                                       return -1;
                                     if (a.endDate < b.endDate)
                                       return 1;
                                    return 0;
                                  }
                                   return this.reservations.sort(compare);
                               }
                                if(this.sortOption === 'AscEndDate'){
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
            axios.defaults.headers.common["Authorization"] =
                                            localStorage.getItem("user");
            axios.get("/api/upcomingReservationsForCustomer")
                 .then((response) => {this.reservations = response.data; this.copyOfReservations = response.data;})
        }

});