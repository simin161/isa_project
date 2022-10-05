Vue.component('complaints', {
data: function(){
    		return{
    			showPage: 0,
    			sortOption: "",
    			offerName: "",
    			filterOptions: "noFilter",
    			complaint:{
                    content: "",
                    complaintType: "OWNER_COMPLAINT",
                    reservationId : ""
                },
                choosenOffer: {
                    offerId: "",
                    offerName: "",
                    offerUser: {
                        id: "",
                        firstName: "",
                        lastName: ""
                    }
                },
    			reservations:[],
    			copyOfReservations: []
    		}
    	},
    template: `
    	<div>
    		<nav-bar></nav-bar>
    		<br>
    		<br>
            <div class="my-bungalows">
    			<div class="col-md-4 left-div overflow-auto" style="margin-top: -5px; margin-left: 22%; height: 80vh;" v-show="showPage == 0">
    				<form class="justify-content-center" >
    					<table class="justify-content-center" style="width:90%; margin-left:5%; table-layout:fixed;" >
    						<tr><td colspan="2"><input v-model="offerName" class="update-text-profile" type="text" style="height:20px;  width: 20em; font-size:12px; font-family:'poppins-light'" placeholder="Offer's name" /></td>
    							<td colspan="1"><input @click="search" class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Search" /></td>
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
    				<div class="container mt-5" v-show="showPage == 0">
    					<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="reservation in reservations">
    						<div class="row g-0">
    							<div class="col-md-4" style="text-align:center;">
    								<img :src="reservation.path" class="img-fluid rounded" style="margin:0 auto;"alt="James Bond's Bungalow">
    							</div>
    							<div class="col-md-8">
    								<div class="card-body">
    								    <h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{reservation.startDate}} - {{reservation.endDate}}</h5>
    								    <h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{reservation.offer.offerName}}</h5>
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{reservation.offer.user.firstName}} {{reservation.offer.user.lastName}}</h5>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{reservation.offer.description}}</p>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{reservation.offer.rating}}</p>
    									<input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" @click="showComplaintForm(reservation)" value="Write complaint" />
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>
    		    </div>
    				<div class="col-md-4 left-div overflow-auto" style="margin-top: -5px; margin-left: 22%; height: 80vh;" v-show="showPage == 1">
                          <div class="container" v-show="showPage == 1">
                               <div class="container align-items-start">
                                   <input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: #881A02" @click="showPage = 0"/><br><br><br>
                                   <p class="title-text-bold" style="margin-top:10px; text-align:center;"> Complaint form for owner and offer </p>
                                   <p class="title-text-bold" style="margin-top:10px; font-size: 15px;  text-align:center;"> Please, choose your complaint type: </p>
                                   <form class="justify-content-center">
                                        <table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
                                             <tr>
                                                <td>
                                                    <select style="width: 100%; font-size: 18px;" v-model="complaint.complaintType">
                                                        <option value="OWNER_COMPLAINT">Owner</option>
                                                        <option value="OFFER_COMPLAINT">Offer</option>
                                                        <option value="BOTH_COMPLAINT">Both</option>
                                                    </select>
                                                </td>
                                             </tr>
                                             <tr><td><input type="text" placeholder="   Course's name" disabled style="color: white" class="input-text" v-model="choosenOffer.offerName"/></td></tr><br>
                                             <tr class="d-flex justify-content-evenly">
                                                  <td><input type="text" placeholder="   First name" disabled style="color: white" class="input-text" v-model="choosenOffer.offerUser.firstName"/></td>
                                                  <td><input type="text" placeholder="   Last name" disabled style="color: white" class="input-text" v-model="choosenOffer.offerUser.lastName"/></td>
                                             </tr>
                                             <br>
                                             <br>
                                             <tr><textarea rowspan="3" name="text" v-model="complaint.content" placeholder="   Complaint" class="input-text-area" ></textarea></tr><br>
                                             <tr><input :disabled="isFilled" @click="addComplaint" class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Send"/></tr>
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
                return !/\S/.test(this.complaint.content);
              }
          }
          ,
          methods : {
            showComplaintForm : function(reservation){
                this.choosenOffer.offerId = reservation.id;
                this.choosenOffer.offerName = reservation.offer.offerName;
                this.choosenOffer.offerUser.id = reservation.offer.user.id;
                this.choosenOffer.offerUser.firstName = reservation.offer.user.firstName;
                this.choosenOffer.offerUser.lastName = reservation.offer.user.lastName;
                this.showPage = 1;
            },
            search : function(){
                let newArray = this.reservations.filter(el => {
                    let text = this.offerName;
                    return el.offer.offerName.toLowerCase().includes(text);
                })
                this.reservations = newArray;
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
            addComplaint : function(){
                axios.defaults.headers.common["Authorization"] =
                                       localStorage.getItem("user");
                 axios.post('/api/addComplaint', {"content": this.complaint.content,
                                                  "reservationId": this.choosenOffer.offerId,
                                                  "complaintType": this.complaint.complaintType})
                     .then(response => {
                         if(response.data){
                             Swal.fire(
                                 'Complaint sent successfuly!',
                                 '',
                                 'success'
                             )
                             axios.defaults.headers.common["Authorization"] =
                                                                         localStorage.getItem("user");
                             axios.get("/api/allPassedReservationsForCustomerWithoutDuplicatedOffers")
                                   .then((response) => {this.reservations = response.data; this.showPage = 0; this.copyOfReservations = response.data})

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
            const id = window.location.hash.split('/')[2];
            axios.defaults.headers.common["Authorization"] =
                                            localStorage.getItem("user");
            axios.get("/api/allPassedReservationsForCustomerWithoutDuplicatedOffers")
                 .then((response) => {this.reservations = response.data; this.copyOfReservations = response.data;})
        }

});