Vue.component('courseReservationHistory', {
	data: function(){
		return{
			reservations: null,
			courseToShow: {
			     offerType: "COURSE",
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
                 courseName : "",
                 instructorsName: ""
            },
			showPage: 0,
			sortOption: "",
            feedback:{
                contentForOffer: "",
                contentForOwner: "",
                id: null,
                rateForOffer: null,
                rateForOwner: null
            },
            offerType: "COURSE",
            additionalServices: "",
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
                	<div class="col-md-4 left-div overflow-auto" v-show="showPage == 0" style="margin-top:-20px; margin-left: 22%; height:80vh">
                		<form class="justify-content-center">
                			<table class="justify-content-center" style="width:90%; margin-left:5%; table-layout:fixed;" >
                				<tr><td colspan="1"><input v-model="searchParams.courseName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Course's name" /></td>
                					<td colspan="1"><input v-model="searchParams.instructorsName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Instructor's name"/></td>
                					<td colspan="1"><input class="confirm-profile" @click="search" type="button" style="background-color: #1b4560; font-size: 15px;" value="Search" /></td>
                				</tr>
                				<br>
                				<tr>
                					<td colspan="2">
                    					<select v-model="sortOption" class="select-sort" name="select" id="format">
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
                					<td><input @click="sortedArray" class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Sort"/></td>
                				</tr>
                                <br>
                                <tr>
                                    <td colspan="2">
                                        <select v-model="filterOptions" class="select-sort" name="select" id="format">
                                            <option selected value="noFilter">No filter</option>
                                            <option value="CANCELLED" >Cancelled</option>
                                            <option value="FAIL">Failed (did not show up)</option>
                                            <option value="ACTIVE">Successful</option>
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
                						<img :src="reservation.path" class="img-fluid rounded" style="margin:0 auto;"alt="Instructor">
                					</div>
                					<div class="col-md-8">
                						<div class="card-body">
                						   <h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{reservation.startDate}} - {{reservation.endDate}}</h5>
                                               									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{reservation.offer.offerName}}</h5>
                                               									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{reservation.offer.description}}</p>
                                                                                   <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Number of people: {{reservation.numberOfPeople}}</p>
                                                                                   <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Unit price: {{reservation.offer.unitPrice}}</p>
                                                                                   <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Discount: {{reservation.discount}}</p>
                                               									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Total price: {{reservation.totalPrice}}</p>
                                               									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Duration: {{reservation.duration}}</p>
                                                  									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{reservation.offer.rating}}</p>
                                                  									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Additional services: {{reservation.additionalServices}}</p>
                                                  									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rules of conduct: {{reservation.offer.rulesOfConduct}}</p>
                                                  									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Cancellation policy: {{reservation.offer.cancellationPolicy}}</p>
                                               									<p v-if="reservation.reservationStatus == 'ACTIVE'" class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Reservation status: SUCCESS</p>
                                               									<p v-if="reservation.reservationStatus != 'ACTIVE'" class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Reservation status: {{reservation.reservationStatus}}</p>
                                               									<button v-show="!reservation.hasFeedback" class="float-end btn btn-light" style="margin-right: 2.5%;" @click="showFeedback(reservation)">Add feedback</button>
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
                				<p class="title-text-bold" style="margin-top:10px; text-align:center;"> {{courseToShow.offerName}} </p>
                				<form class="justify-content-center">
                                    <table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
                                        <tr class="d-flex justify-content-evenly">
                                            <td><input type="text" placeholder="   First Name" disabled style="color: white" class="input-text"  v-model="courseToShow.user.firstName"/></td>
                                            <td><input type="text" placeholder="   Last Name" disabled style="color: white" class="input-text"  v-model="courseToShow.user.lastName"/></td></tr><br>
                                        <tr>
                                        <tr class="d-flex justify-content-evenly">
                                            <td><input type="text" placeholder="   E-mail" disabled style="color: white" class="input-text"  v-model="courseToShow.user.email"/></td>
                                            <td><input type="text" placeholder="   Phone number" disabled style="color: white" class="input-text"  v-model="courseToShow.user.phoneNumber"/></td></tr><br>
                                        <tr>
                                        <tr><textarea rowspan="3"name="text" placeholder="   Biography" disabled style="color: white" class="input-text-area"  v-model="courseToShow.user.biography" ></textarea></tr><br>
                                        <tr class="d-flex justify-content-evenly">
                                             <td><input type="text" placeholder="   Country" class="input-text" disabled style="color: white" v-model="courseToShow.location.country"/></td>
                                             <td><input type="text" placeholder="   City" class="input-text" disabled style="color: white" v-model="courseToShow.location.city"/></td></tr><br>
                                        <tr><td><input type="text" placeholder="   Street" class="input-text" disabled style="color: white" v-model="courseToShow.location.street"/></td></tr><br>
                                        <tr><td><input type="text" placeholder="   Street number" class="input-text" disabled style="color: white" v-model="courseToShow.location.streetNumber"/></td></tr><br>
                                        <tr><td><input type="text" placeholder="   Unit price" class="input-text" disabled style="color: white" v-model="courseToShow.unitPrice"/></td></tr><br>
                                        <tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area" disabled style="color: white" v-model="courseToShow.description" ></textarea></tr><br>
                                        <tr><td><input type="text" placeholder="   Maximum capacity" class="input-text" disabled style="color: white" v-model="courseToShow.maxCustomerCapacity"/></td></tr><br>
                                        <tr><textarea rowspan="3"name="text" placeholder="   Additional services (Wi-fi, Parking, etc.)" disabled style="color: white" class="input-text-area"  v-model="additionalServices" ></textarea></tr><br>
                                        <tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area" disabled style="color: white" v-model="courseToShow.rulesOfConduct" ></textarea></tr><br>
                                        <tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area" disabled style="color: white" v-model="courseToShow.cancellationPolicy" ></textarea></tr><br>
                                    </table>
                                </form>
                			 </div>
                         </div>
                    </div>
                    <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left:22%; height:80vh" v-show="showPage == 2">
                         <div class="container" v-show="showPage == 2">
                              <div class="container align-items-start">
                                	<input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: gray" @click="showPage = 0"/><br><br><br>
                                	<p class="title-text-bold" style="margin-top:10px; text-align:center;"> Feedback for course and instructor </p>
                                	<form class="justify-content-center">
                                		<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
                                			<tr><td><input type="text" placeholder="   Course's name" disabled style="color: white" class="input-text" v-model="courseToShow.offerName"/></td></tr><br>
                                			<tr class="d-flex justify-content-evenly">
                                			    <td><input type="text" placeholder="   First name" disabled style="color: white" class="input-text" v-model="courseToShow.user.firstName"/></td>
                                				<td><input type="text" placeholder="   Last name" disabled style="color: white"  class="input-text" v-model="courseToShow.user.lastName"/></td>
                                			</tr><br>
                                			<tr class="d-flex justify-content-evenly">
                                				<td style="width: 100%"><input type="number" onKeyDown="return false" placeholder="   Rating for offer" min="1" max = "5" class="input-text" v-model="feedback.rateForOffer"/></td>
                                				<td style="width: 100%"><input type="number" onKeyDown="return false" placeholder="   Rating for owner" min="1" max = "5" class="input-text" v-model="feedback.rateForOwner"/></td>
                                			</tr> <br>
                                				<tr><textarea rowspan="3" name="text" placeholder="   Feedback for offer" class="input-text-area" v-model="feedback.contentForOffer"></textarea></tr><br>
                                				<tr><textarea rowspan="3" name="text" placeholder="   Feedback for owner" class="input-text-area" v-model="feedback.contentForOwner"></textarea></tr><br>
                                				<tr><button type="button" @click="addFeedback" class="confirm">Send</button></tr>
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
                  params.append('name', this.searchParams.courseName);
                  params.append('location', this.searchParams.courseLocation);
                  params.append('type', 'COURSE');
                  params.append('firstLastName', this.searchParams.instructorsName);
                  return params;
              }
          }
          ,
          methods : {
            showMore : function(course){
                this.courseToShow = course.offer;
                this.courseToShow.user = course.offer.user;
                this.additionalServices = course.additionalServices;
                this.showPage = 1;
            },
            showFeedback : function(reservation){
                this.courseToShow = reservation.offer;
                this.courseToShow.user = reservation.offer.user;
                this.feedback.id = reservation.id;
                this.showPage = 2;
            },
            filterArray : function(){
                if(this.filterOptions === "noFilter"){
                    this.reservations = this.copyOfReservations;
                }else{
                    this.reservations = this.copyOfReservations;
                    let newArray = this.reservations.filter(el => {
                        return el.reservationStatus === this.filterOptions;
                    })

                    this.reservations = newArray;
                }
            },
            addFeedback : function(){
                if(this.feedback.contentForOffer == "" && this.feedback.contentForOwner == "" && this.feedback.rateForOffer == null && this.feedback.rateForOwner == null){
                                    Swal.fire(
                                          'Fields are empty!',
                                          'Please, fill the fields in order to send feedback!',
                                          'error'
                                          )
                               }else if(this.feedback.rateForOffer != null && Number(this.feedback.rateForOffer) <= 0 || Number(this.feedback.rateForOffer > 5)){
                                    Swal.fire(
                                           'Invalid values for rate for offer!',
                                           'Number must be from 1 to 5!',
                                           'error'
                                           )
                               }else if(this.feedback.rateForOwner != null && Number(this.feedback.rateForOwner) <= 0 || Number(this.feedback.rateForOwner > 5)){
                                     Swal.fire(
                                           'Invalid values for rate for owner!',
                                           'Number must be from 1 to 5!',
                                           'error'
                                     )
                               }else{
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
                                           axios.post("/api/historyOfReservationsForCustomer", {"offerType" : this.offerType})
                                                .then((response) => {this.reservations = response.data; this.showPage = 0;})
                         }else{
                             Swal.fire(
                                 'Ooops, something went wrong!',
                                 'Please, try again later!',
                                 'error'
                             )
                         }
                     })
                }
            }
            ,
            search : function(){
                if(this.searchParams.courseName != "" && this.searchParams.instructorsName == ""){
                    let newArray = this.reservations.filter(el => {
                         let text = this.searchParams.courseName;
                         return el.offer.offerName.toLowerCase().includes(text);
                     })
                     this.reservations = newArray;
                }else if(this.searchParams.courseName == "" && this.searchParams.instructorsName != ""){
                    let newArray = this.reservations.filter(el => {
                         let text = this.searchParams.instructorsName;
                         return el.offer.user.firstName.toLowerCase().includes(text) ||
                                el.offer.user.lastName.toLowerCase().includes(text);
                     })
                     this.reservations = newArray;
                }else if(this.searchParams.courseName != "" && this.searchParams.instructorsName != ""){
                    let newArray = this.reservations.filter(el => {
                         let courseText = this.searchParams.courseName;
                         let instructorText = this.searchParams.instructorsName;
                         return el.offer.offerName.toLowerCase().includes(courseText) ||
                                el.offer.user.firstName.toLowerCase().includes(instructorText) ||
                                el.offer.user.lastName.toLowerCase().includes(instructorText);
                     })
                     this.reservations = newArray;
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
              axios.post("/api/historyOfReservationsForCustomer", {"offerType" : this.offerType})
                   .then((response) => {this.reservations = response.data; this.copyOfReservations = response.data;})
          }
});
