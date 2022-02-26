Vue.component('instructors', {
	data: function(){
		return{
			instructors: null,
			instructorToShow: {
			    firstName: "",
			    lastName: "",
			    email: "",
			    phoneNumber: "",
			    biography: "",
			    courses: []
			},
			showPage: 0,
			sortOption: ""
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
                				<tr><td colspan="1"><input class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Instructor's name" /></td>
                					<td colspan="1"><input class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Instructor's xy?"/></td>
                					<td rowspan="2"><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Search" /></td>
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
                					    <td><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Sort"/></td>
                					</tr>
                				</tr>
                			</table>
                		</form>
                		<div class="container mt-5">
                			<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="instructor in instructors">
                				<div class="row g-0">
                					<div class="col-md-4" style="text-align:center;">
                						<img src="../images/bungalow-images/register-instructor.png" class="img-fluid rounded" style="margin:0 auto;"alt="Instructor">
                					</div>
                					<div class="col-md-8">
                						<div class="card-body">
                							<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{instructor.firstName}} {{instructor.lastName}}</h5>
    									    <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">E-mail:{{instructor.email}}</p>
    									    <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Phone number: {{instructor.phoneNumber}}</p>
                							<button class="float-end btn btn-light" @click="showMore(instructor)">Show more</button>
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
                						<p class="title-text-bold" style="margin-top:10px; text-align:center;"> Show instructor </p>
                						<form class="justify-content-center">
                							<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
                								<tr><td><input type="text" placeholder="   First name" class="input-text" v-model="instructorToShow.firstName"/></td></tr><br>
                								<tr><td><input type="text" placeholder="   Last name" class="input-text"  v-model="instructorToShow.lastName"/></td></tr><br>
                								<tr><td><input type="text" placeholder="   E-mail" class="input-text" v-model="instructorToShow.email"/></td></tr>
                								<tr><td><input type="text" placeholder="   Phone number" class="input-text" v-model="instructorToShow.phoneNumber"/></td></tr>
                								<tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area"  v-model="instructorToShow.biography" ></textarea></tr><br>
                  							</table>
                						</form>
                					</div>
                               	</div>
                           	</div>
                        </div>
                    </div>
          `
          ,
          methods : {
            showMore : function(instructor){
                this.instructorToShow = instructor;
                this.showPage = 1;
            }
          }
          ,
          mounted(){
            axios.get("/api/allInstructors")
                 .then(response => (this.instructors = response.data))
          }

});
