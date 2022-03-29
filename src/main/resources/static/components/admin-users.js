Vue.component('admin-users', {
	data: function(){
    		return{
    			showPage: 0,
    			users: [],
    			userToShow: {

    			    id: null,
    			    name: "",
    			    surname: "",
    			    email: "",
    			    phoneNumber: "",
    			    userType: "",
    			    address: "",
    			    city: "",
    			    country: ""

    			}
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
    						<tr><td colspan="1"><input class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="" /></td>
    							<td colspan="1"><input class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder=""/></td>
    							<td rowspan="2"><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Search" /></td>
    						</tr>
    						<br>
    						<tr>
    							<td colspan="2">
    								<select class="select-sort" name="select" id="format">
    									<option selected disabled>Sort by</option>
    									<option value="AscAlpha" >Sort alphabetically (A-Z)</option>
    									<option value="DescAlpha">Sort alphabetically (Z-A)</option>
    								</select>
    							</td>
    							<tr>
    							    <td><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Sort"/></td>
    							</tr>
    						</tr>
    					</table>
    				</form>
    				<div class="container mt-5">
    					<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="user in users">
    						<div class="row g-0">
    							<div class="col-md-4" style="text-align:center;">

    							</div>
    							<div class="col-md-8">
    								<div class="card-body">
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{user.firstName}} {{user.lastName}}</h5>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Email: {{user.email}}</p>
    									<button class="float-end btn btn-light" @click="showMore(user)">Show more</button>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>

                   	</div>
                   	<div class="col-md-4 right-div overflow-auto" style="margin-top:-20px; height:80vh" v-show="showPage != 0">
                   	<div class="container" v-show="showPage == 1">
    					<div class="container align-items-start">
    						<input class="confirm-profile" type="button" value="Back" style="width:20%; float:left; font-size:12px; background-color: gray" @click="showPage = 0"/><br><br><br>
    						<p class="title-text-bold" style="margin-top:10px; text-align:center;"> Show selected user </p>
    						<form class="justify-content-center">
    							<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
    								<tr><td><input type="text" placeholder="   User ID" class="input-text" v-model="userToShow.id"/></td></tr><br>
    								<tr class="d-flex justify-content-evenly">
    									<td><input type="text" placeholder="   First Name" class="input-text"  v-model="userToShow.name"/></td>
    									<td><input type="text" placeholder="   Last name" class="input-text"  v-model="userToShow.surname"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Email" class="input-text"  v-model="userToShow.email"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Phone number" class="input-text"  v-model="userToShow.phoneNumber"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   User Type" class="input-text"  v-model="userToShow.userType"/></td></tr><br>
    							    <tr>
                                        <td><input style="background-color: red" class="confirm-profile" type="button" value="Delete user" @click="deleteUser"/></td>
                                    </tr>
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
                  params.append('id', this.userToShow.id);
                  return params;
              }
          }
          ,
          methods : {
            showMore : function(user){

               this.userToShow.id = user.id;
               this.userToShow.name = user.firstName;
               this.userToShow.surname = user.lastName;
               this.userToShow.email = user.email;
               this.userToShow.phoneNumber = user.phoneNumber;
               switch(user.userType){

                case "CUSTOMER": this.userToShow.userType = "Customer"; break;
                case "BUNGALOW_OWNER": this.userToShow.userType = "Bungalow owner"; break;
                case "BOAT_OWNER": this.userToShow.userType = "Boat owner"; break;
                case "INSTRUCTOR": this.userToShow.userType = "Instructor"; break;
                case "ADMIN": this.userToShow.userType = "Admin"; break;
                default: this.userToShow.userType = "";

               }
               this.showPage = 1;

            },

            deleteUser : function(){

                Swal.fire({

                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm'

                }).then((result)=> {

                    if(result.isConfirmed){

                        axios.post('/api/adminDeleteUser', this.userToShow)
                        .then(response=> {

                            if(response.data === true){

                                Swal.fire('User successfuly deleted!',
                                          '',
                                          'success'
                                          )

                            } else {

                                Swal.fire('Ooops, something went wrong!',
                                          'Please, try again later!',
                                          'error'
                                          )
                            }
                        })
                    }
                })
            }
          }
          ,
          mounted(){
            axios.get("/api/allUsersExceptAdmins")
                 .then(response => (this.users = response.data))
          }
});
