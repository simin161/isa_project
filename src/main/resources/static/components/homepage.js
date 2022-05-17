Vue.component('homepage', {

	data: function(){
		return{	
			loggedUser: {
				userType:''
			},
			passwordDTO: {
               id: null,
               oldPassword: '',
               newPassword: ''
            },
			map:{}
		}
	},
template: `

		<div class="homepage">
			<nav-bar></nav-bar>

			<div id="map" class="map" style="width: 100%; height: 300px;"> </div>

			<div class="welcome-text container-fluid justify-content-center">
				<h1 v-if="loggedUser == '' || loggedUser.userType == 'CUSTOMER'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser.userType == 'BUNGALOW_OWNER'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser.userType == 'BOAT_OWNER'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser.userType == 'INSTRUCTOR'">Plan your next trip with confidence!</h1>
				<h1 v-if="loggedUser.userType == 'ADMIN'">Welcome back dear administrator!</h1>
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

                <div class="container align-items-start" v-if="loggedUser.numberOfLogIns == 0">
                    <p class="title-text-bold">Please change your password.</p>
                    <p class="title-text-light" style="font-size:15px;">Since this is your first login on Fishy Finds, we require that you change your password.</p>
                    <form class="justify-content-center">
                        <table class="justify-content-center" style="width:75%; margin: auto;" >
                            <tr>
                            <td><input type="password" placeholder="   Old password" class="update-text-profile" v-model="passwordDTO.oldPassword"/></td>
                            </tr>
                            <br>
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
                    if(this.passwordDTO.newPassword == this.confirmPassword){
                        Swal.fire({
                                      title: 'Are you sure?',
                                      text: "You won't be able to revert this!",
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Yes, change my password!'
                                    }).then((result) => {
                                        if(result.isConfirmed){
                                            axios.put('/api/changePassword', this.passwordDTO)
                                                 .then(response => {
                                                    if(response.data === true){
                                                        Swal.fire('Password changed successfuly!',
                                                                  '',
                                                                  'success')
                                                    }
                                                    else{
                                                        Swal.fire('Ooops, something went wrong!',
                                                                  'Please, try again later!',
                                                                  'error')
                                                    }

                                                 })
                                            }
                                    })
                    }
                    else{

                        Swal.fire('Ooops, looks like your passwords don\'t match!',
                                   'Please, try again later!',
                                   'error')


                    }
                },

			loadMap: function () {
				//this.$nextTick(function () {
					/*
					const iconFeature = new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.fromLonLat([20, 45])),
						name: '',
						});
					*/

					var myView = new ol.View({
						center: [0,0],
						zoom: 4
					})

					var myLayer = new ol.layer.Tile({
						source: new ol.source.OSM()
					})

					var layer = [myLayer]

					this.map = new ol.Map({
						target: 'map',
						layers: layer,
						view: myView,
						// style: myStyle
					})

/*
					this.map = new ol.Map({
					target: 'mapindex',
					layers: [
						new ol.layer.Tile({
						source: new ol.source.OSM()
						}),
						new ol.layer.Vector({
						source: new ol.source.Vector({
							features: [iconFeature]
						}),
						style: new ol.style.Style({
							image: new ol.style.Icon({
							anchor: [0.5, 46],
							anchorXUnits: 'fraction',
							anchorYUnits: 'pixels',
							src: 'icon-marker.png'
							})
						})
						})
					],
					view: new ol.View({
						center: ol.proj.fromLonLat([20, 45]), 
						//center: ol.proj.fromLonLat([this.openLayerMapa.GD, this.openLayerMapa.GS]), 
						zoom: 14
					})
					});

					*/
				}


    },

    mounted(){

		this.loadMap();

        axios.defaults.headers.common["Authorization"] =
                        localStorage.getItem("user");

        axios.get("/api/authenticateUser")
            .then(response =>{this.loggedUser = response.data; console.log(response.data)})
        console.log(this.loggedUser);



    }

});