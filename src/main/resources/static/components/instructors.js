Vue.component('instructors', {
	data: function(){
		return{
		    loggedUser: {
                userType:''
            },
			courses: null,
			courseToShow: {
			    offer: null,
			    followed: false
			},
            searchParams: {
                 courseName : "",
                 courseLocation: "",
                 instructorsName: "",
                 startDate: "",
                 endDate: ""
            },
			showPage: 0,
			sortOption: "",
			terms: []
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
                				<tr><td colspan="1"><input v-model="searchParams.courseName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Course's name" /></td>
                					<td colspan="1"><input v-model="searchParams.courseLocation" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Course's location"/></td>
                					<td colspan="1"><input v-model="searchParams.instructorsName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Instructor's name"/></td>
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
                							<option value="AscAlpha" >Sort alphabetically (A-Z)</option>
                							<option value="DescAlpha">Sort alphabetically (Z-A)</option>
                							<option value="AscRating">Sort by average rating (Asc)</option>
                	    					<option value="DescRating">Sort by average rating (Desc)</option>
                							<option value="AscPrice">Sort by price: low to high</option>
                							<option value="DescPrice">Sort by price: hight to low</option>
                						</select>
                					</td>
                					<tr>
                					    <td><input @click="sortedArray" class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Sort"/></td>
                					</tr>
                				</tr>
                			</table>
                		</form>
                		<div class="container mt-5">
                			<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="course in courses">
                				<div class="row g-0">
                					<div class="col-md-4" style="text-align:center;">
                						<img src="../images/bungalow-images/register-instructor.png" class="img-fluid rounded" style="margin:0 auto;"alt="Instructor">
                					</div>
                			    </div>
                				<div class="col-md-8">
                				    <div class="card-body">
                                        <h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{course.offer.offerName}}</h5>
                                        <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Instructor: {{course.offer.user.firstName}} {{course.offer.user.lastName}}</p>
                                        <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{course.offer.description}}</p>
                                        <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Unit price: {{course.offer.unitPrice}}</p>
                                        <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{course.offer.rating}}</p>
                                        <button class="float-end btn btn-light" @click="showMore(course)" style="margin-left: 5px;">Show more</button>
                                        <span v-show="loggedUser.userType === 'CUSTOMER'">
                                            <button v-show="!course.followed" class="float-end btn btn-light" style="background-color: #DED528; margin-left: 5px; margin-right: 5px;" @click="follow(course.offer)">Follow</button>
                                        </span>
                                    </div>
                				</div>
                			</div>
                	    </div>
                    </div>
                    <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh" v-show="showPage == 1">
                         <div class="container" v-show="showPage == 1">
                		    <div class="container align-items-start">
                				<input class="confirm-profile" type="button" value="Back" style="width:15%; float:left; font-size:12px; background-color: #881A02" @click="showPage = 0"/>
                				<input type="button" class="confirm-profile" value="Show terms" style="width:15%; float:left; margin-left: 8px; margin-right: 8px; font-size:12px; background-color: white; color: black;" @click="showTerms(courseToShow.offer)"/>
                				<input class="confirm-profile" type="button" value="Show gallery" style="width:15%; float:left; margin-left: 8px; margin-right: 8px; font-size:12px; background-color: white; color: black;" @click="showPage = 3"/>
                                <input class="confirm-profile" type="button" value="Show reviews" style="width:15%; float:left; margin-left 8px; margin-right: 8px; font-size:12px; background-color: white; color: black;" @click="showPage = 4"/>
                                <span v-show="loggedUser.userType === 'CUSTOMER'">
                                    <input type="button" v-show="!courseToShow.followed" class="confirm-profile" style="width:15%; float:left; margin-left 8px; font-size:12px; background-color: white; color: black;" @click="follow(courseToShow.offer)" value="Follow"/>
                                    <input class="confirm-profile" type="button" style="width:15%; float:left; margin-left: 8px; font-size:12px; background-color: white; color: black;" @click="showActions(courseToShow.offer.id)" value="Show actions"/>
                                </span>
                                <br><br><br>
                				<p class="title-text-bold" style="margin-top:10px; text-align:center;"> Show instructor </p>
                				<form class="justify-content-center">
                                     <table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
                                         <p>{{courseToShow.offerName}}</p>
                                         <tr class="d-flex justify-content-evenly">
                                             <td><input type="text" placeholder="   First Name" disabled style="color:white" class="input-text"  v-model="courseToShow.offer.user.firstName"/></td>
                                             <td><input type="text" placeholder="   Last Name" disabled style="color:white" class="input-text"  v-model="courseToShow.offer.user.lastName"/></td>
                                         </tr><br>
                                         <tr class="d-flex justify-content-evenly">
                                              <td><input type="text" placeholder="   E-mail" disabled style="color:white" class="input-text"  v-model="courseToShow.offer.user.email"/></td>
                                              <td><input type="text" placeholder="   Phone number" disabled style="color:white" class="input-text"  v-model="courseToShow.offer.user.phoneNumber"/></td>
                                         </tr><br>
                                        <tr><textarea rowspan="3"name="text" placeholder="   Biography" disabled style="color:white" class="input-text-area"  v-model="courseToShow.offer.user.biography" ></textarea></tr><br>
                                        <tr class="d-flex justify-content-evenly">
                                            <td><input type="text" placeholder="   Country" class="input-text" disabled style="color:white"  v-model="courseToShow.offer.location.country"/></td>
                                            <td><input type="text" placeholder="   City" class="input-text" disabled style="color:white"  v-model="courseToShow.offer.location.city"/></td></tr><br>
                                        <tr><td><input type="text" placeholder="   Street" class="input-text" disabled style="color:white"  v-model="courseToShow.offer.location.street"/></td></tr><br>
                                        <tr><td><input type="text" placeholder="   Street number" class="input-text" disabled style="color:white"  v-model="courseToShow.offer.location.streetNumber"/></td></tr><br>
                                        <tr><td><input type="text" placeholder="   Unit price" class="input-text" disabled style="color:white"  v-model="courseToShow.offer.unitPrice"/></td></tr><br>
                                        <tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area" disabled style="color:white"  v-model="courseToShow.offer.description" ></textarea></tr><br>
                                        <tr><td><input type="text" placeholder="   Maximum capacity" class="input-text" disabled style="color:white"  v-model="courseToShow.offer.maxCustomerCapacity"/></td></tr><br>
                                        <tr><textarea rowspan="3"name="text" placeholder="   Additional services (Wi-fi, Parking, etc.)" disabled style="color:white" class="input-text-area"  v-model="courseToShow.offer.additionalServices" ></textarea></tr><br>
                                        <tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area" disabled style="color:white"  v-model="courseToShow.offer.rulesOfConduct" ></textarea></tr><br>
                                        <tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area" disabled style="color:white"  v-model="courseToShow.offer.cancellationPolicy" ></textarea></tr><br>
                                     </table>
                                </form>
                			</div>
                       	</div>
                    </div>
                    <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh" v-show="showPage == 2">
                        <div class="container" v-show="showPage == 2">
                            <div class="container align-items-start">
                                 <input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: #881A02" @click="showPage = 0"/><br><br><br>
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
                  params.append('startDate', this.searchParams.startDate);
                  params.append('endDate', this.searchParams.endDate);
                  return params;
              }
          }
          ,
          methods : {
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
            showMore : function(course){
                this.courseToShow = course;
                this.showPage = 1;
            }
            ,
            follow : function(bung){
                axios.defaults.headers.common["Authorization"] =
                                       localStorage.getItem("user");
                axios.post("/api/addFollower",{"id" : bung.id})
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
                   }).then(response => {this.courses = response.data; console.log(this.courses)})
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
                      return this.courses.sort(compare);
                  }
                   if(this.sortOption === 'AscAlpha'){
                       function compare(a, b) {
                           if (a.offerName < b.offerName)
                              return -1;
                           if (a.offerName > b.offerName)
                              return 1;
                           return 0;
                       }
                       return this.courses.sort(compare);
                   }
                   if(this.sortOption === 'DescRating'){
                      function compare(a, b) {
                        if (a.rating > b.rating)
                          return -1;
                        if (a.rating < b.rating)
                          return 1;
                       return 0;
                     }
                      return this.courses.sort(compare);
                  }
                  if(this.sortOption === 'AscRating'){
                       function compare(a, b) {
                           if (a.rating < b.rating)
                              return -1;
                           if (a.rating > b.rating)
                              return 1;
                           return 0;
                       }
                       return this.courses.sort(compare);
                   }
                   if(this.sortOption === 'DescPrice'){
                      function compare(a, b) {
                        if (a.unitPrice > b.unitPrice)
                          return -1;
                        if (a.unitPrice < b.unitPrice)
                          return 1;
                       return 0;
                     }
                      return this.courses.sort(compare);
                  }
                  if(this.sortOption === 'AscPrice'){
                     function compare(a, b) {
                          if (a.unitPrice < b.unitPrice)
                             return -1;
                          if (a.unitPrice > b.unitPrice)
                             return 1;
                          return 0;
                     }
                      return this.courses.sort(compare);
                 }
             }

          }
          ,
          mounted(){
            axios.get("/api/allCourses")
                 .then(response => {this.courses = response.data;
                    this.courseToShow = this.courses[0];
                    axios.defaults.headers.common["Authorization"] =
                                   localStorage.getItem("user");
                    axios.get("/api/authenticateUser")
                         .then(response => this.loggedUser = response.data);
                    })
          }

});
