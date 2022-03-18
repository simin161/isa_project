Vue.component('homepage', {
	data: function(){
		return{	
			loggedUser: null,
			passwordDTO: {
            			           id: null,
            			           newPassword: ''
            			}
		}
	},
template: `	
		<div class="homepage">
			<nav-bar></nav-bar>

			<div class="welcome-text container-fluid justify-content-center">
				<h1 v-if="loggedUser == '' || loggedUser == 'CUSTOMER'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser == 'BUNGALOW_OWNER'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser == 'BOAT_OWNER'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser == 'INSTRUCTOR'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser == 'ADMIN'">Welcome back dear administrator!</h1>
			</div>

			<div class="wrapper" v-if="loggedUser == '' || loggedUser.userType == 'CUSTOMER'">

				<div class="card">
					<img src="images/homepage-bungalows.jpg">
					<div class="info">
						<h1>Bungalows</h1>
						<p>Perfect places to rest after a day full of fishing!</p>
						<a class="btn btn-light" href="#/bungalows" role="button">Read More</a>
					</div>
				</div>

				<div class="card">
					<img src="images/homepage-boats.jpg">
					<div class="info">
						<h1>Boats</h1>
						<p>The easiest way to get around here</p>
						<a class="btn btn-light" href="#/boats" role="button">Read More</a>
					</div>
				</div>		

				<div class="card">
					<img src="images/homepage-courses.jpg">
					<div class="info">
						<h1>Courses</h1>
						<p>Get prepared for the best adventures!</p>
						<a class="btn btn-light" href="#/instructors" role="button">Read More</a>
					</div>
				</div>
			
			</div>

			<div class="wrapper" v-if="loggedUser.userType == 'BUNGALOW_OWNER'">

				<div class="card">
					<img src="images/homepage-bungalows.jpg">
					<div class="info">
						<h1>My Bungalows</h1>
						<p>Manage your bungalows!</p>
						<a class="btn btn-light" href="#/my-bungalows" role="button">My bungalows</a>
					</div>
				</div>
			
			</div>

			<div class="wrapper" v-if="loggedUser.userType == 'BOAT_OWNER'">

				<div class="card">
					<img src="images/homepage-boats.jpg">
					<div class="info">
						<h1>My Boats</h1>
						<p>Manage your boats!</p>
						<a class="btn btn-light" href="#/my-boats" role="button">My boats</a>
					</div>
				</div>

			</div>

			<div class="wrapper" v-if="loggedUser.userType == 'INSTRUCTOR'">

				<div class="card">
					<img src="images/homepage-courses.jpg">
					<div class="info">
						<h1>My Courses</h1>
						<p>Manage your courses!</p>
						<a class="btn btn-light" href="#/my-courses" role="button">My courses</a>
					</div>
				</div>

			</div>

			<div class="wrapper" v-if="loggedUser.userType == 'ADMIN'">



			    <div class="card" v-if="loggedUser.numberOfLogIns > 0">
			        <img src="images/admin-registrations.jpg">
			        <div class="info">
			            <h1>Registrations, Requests and Complaints</h1>
			            <p>Manage new registrations, user requests and complaints!</p>
			            <a class="btn btn-light" href="#/admin-reg-req-complaints" role="button">Show more</a>
			        </div>
			    </div>

			    <div class="card" v-if="loggedUser.numberOfLogIns > 0">
			        <img src="images/admin-settings.jpg">
			        <div class="info">
			            <h1>Fishy Finds' System</h1>
			            <p>Track all users, their actions and manage your budget and statistics.</p>
			            <a class="btn btn-light" href="#/admin-fishy-finds-system" role="button">Show more</a>
			        </div>
			    </div>

			    <div class="card" v-if="loggedUser.numberOfLogIns > 0">
			        <img src="images/admin-profile.jpg">
			        <div class="info">
			            <h1>Your Profile</h1>
			            <p>Access and manage your own profile on Fishy Finds!</p>
			            <a class="btn btn-light" href="#/account" role="button">Show more</a>
			        </div>
			    </div>

                <div class="container align-items-start" v-else>
                    <p class="title-text-bold">Please change your password.</p>
                    <p class="title-text-light" style="font-size:15px;">Since this is your first login on Fishy Finds, we require that you change your password.</p>
                    <form class="justify-content-center">
                        <table class="justify-content-center" style="width:75%; margin: auto;" >
                            <tr>
                            <td><input type="password" placeholder="   New password" class="update-text-profile" v-model="passwordDTO.newPassword"/></td>
                            </tr>
                            <br>
                            <tr>
                            <td><input type="password" placeholder="   Confirm new password" class="update-text-profile" v-model="confirmPassword"/></td>
                            </tr>
                            <br>
                            <tr>
                            <td><input :disabled="!isCompletePassword" class="confirm-profile" type="button" value="Update your password" @click="savePassword"/></td>
                            </tr>
                            <br>
                        </table>
                    </form>
                </div>
			</div>
		</div>
		`
	,

	computed : {
            isCompletePassword () {
                    flag = /\S/.test(this.passwordDTO.newPassword) && /\S/.test(this.confirmPassword);

                    return flag;
            }
        },

    methods : {

        savePassword : function(){
                    if(this.passwordDTO.newPassword != this.loggedUser.password &&
                       this.passwordDTO.newPassword == this.confirmPassword){
                        this.passwordDTO.id = this.loggedUser.id;
                        axios.put('/api/changePassword', this.passwordDTO)
                             .then(response => {console.log(response.data)
                                   if(response.data){
                                        this.loggedUser.password = this.passwordDTO.newPassword;
                                        console.log("SUCCESS - User's password has been changed!");
                                        this.$router.go();
                                   }
                             })
                    }
                    else {
                        console.log("ERROR - User's password hasn't been changed!")
                    }
                }


    },

    mounted(){
        axios.get("/api/authenticateUser")
            .then(response => this.loggedUser = response.data)
        console.log(this.loggedUser);
    }

});