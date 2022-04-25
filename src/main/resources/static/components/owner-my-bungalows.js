Vue.component('owner-my-bungalows', {
	data: function(){
		return{	
			loggedUser: null,
			myBungalows:[],


			showPage: 0,
			sortOption: "",
			searchParams: {
				bungalowName : "",
				bungalowLocation: ""
			},

			selectedBungalow:{},
			selectedBungalowsLocation:{},
			selectedBungalowsOwner:{},

			dtoAddNewBungalow: {
				offerType: "BUNGALOW",
				offerName: "",

				country: "",
				city: "",
				street: "",
				streetNumber:"",

				longitude:"0",
				latitude:"0",

				description:"",
				unitPrice:"",
				maxCustomerCapacity:"",
				numberOfRooms:"",
				numberOfBeds:"",

				maxCustomerCapacity:"",
				rulesOfConduct:"",
				additionalServices:"",
				cancellationPolicy:"",	
			},
			map: {}
		}
	},
template: `	
		<div>
			<nav-bar></nav-bar>
			<br>
			<br>

            <div class="my-bungalows" v-if="loggedUser.userType == 'BUNGALOW_OWNER'">

				<div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; height:80vh">

					<form>

						<table class="justify-content-center" style="width:90%; margin-left:5%; table-layout:fixed;" >

							<tr><td colspan="2" rowspan="1"><input v-model="searchParams.bungalowName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="  Bungalow's name" /></td>
								<td colspan="1" rowspan="2"><input @click="search" class="confirm-profile center-text-button" type="button" style="background-color: #1b4560; font-size: 14px; margin:6px; padding:6px; text-align:center;" value="Search" /></td>
								<td colspan="2" rowspan="2"><input class="confirm-profile center-text-button" type="button" style="background-color: #28a745; font-size: 14px; margin:6px; padding:6px; text-align:center;" @click="showAddNewBungalowForm" value="Add a new bungalow"/></td>
							</tr>
							<tr>
								<td colspan="2" rowspan="1"><input v-model="searchParams.bungalowLocation" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="  Bungalow's location"/></td>
							</tr>

						</table> 

						<div class="justify-content-center" style="width:90%; margin-left:5%; margin-top: 5px;">
							<div class="radio-toolbar" style="display: inline-block;">

								<input type="radio" id="radioAscAlpha" name="radioSort" value="AscAlpha" v-model="sortOption" @change="sortedArray">
								<label for="radioAscAlpha">A➡️Z</label>

								<input type="radio" id="radioDescAlpha" name="radioSort" value="DescAlpha" v-model="sortOption" @change="sortedArray">
								<label for="radioDescAlpha">Z➡️A</label>
					
								<input type="radio" id="radioAscRating"  name="radioSort" value="AscRating" v-model="sortOption" @change="sortedArray">
								<label for="radioAscRating">Good➡️Bad</label>

								<input type="radio" id="radioDescRating" name="radioSort"   value="DescRating" v-model="sortOption" @change="sortedArray">
								<label for="radioDescRating">Bad➡️Good</label>

								<input type="radio" id="radioAscPrice" name="radioSort" value="AscPrice" v-model="sortOption" @change="sortedArray">
								<label for="radioAscPrice">Expensive➡️Cheap</label>

								<input type="radio" id="radioDescPrice" name="radioSort"  value="DescPrice" v-model="sortOption" @change="sortedArray">
								<label for="radioDescPrice">Cheap➡️Expensive</label>

							</div>

						</div>


					</form>
				
    				<div class="container mt-5">
				
							<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="bungalow in myBungalows">
							
								<div class="row g-0">
									<div class="col-md-4" style="text-align:center;
																background-color: #1b4560;
																background-image:url('./images/bungalow-images/bungalow-1-out-1.jpg');
																background-size: contain;
																background-repeat: no-repeat;
																background-position: center;											
																"></div>
									<div class="col-md-8">
										<div class="card-body" style="padding: 1vh;">
											<p class="card-title text-start mt-1" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{bungalow.offerName}}</p>
											<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:10px;">{{bungalow.description}}</p>
											<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Initial price: {{bungalow.unitPrice}}</p>
											<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{bungalow.rating}}</p>

											<button class="float-end btn btn-light button-options" style="background-color: #1b4560; margin-right: 2px;" @click="showDetails(bungalow)">Show details</button>
											<button class="float-end btn btn-light button-options" style="background-color: #1b4560; margin-right: 2px;" @click="updateDetails(bungalow)">Update details</button>
											<button class="float-end btn btn-light button-options" style="background-color: #1b4560; margin-right: 2px;" @click="deleteOffer(bungalow)">Delete offer</button>
											<button class="float-end btn btn-light button-options" style="background-color: #1b4560; margin-right: 2px;" @click="updateFreeTerms(bungalow)">Update free terms</button>
											<button class="float-end btn btn-light button-options" style="background-color: #1b4560; margin-right: 2px;"  @click="updateLastMinuteTerms(bungalow)">Update last minute terms</button>

										</div>
									</div>
								</div>

							</div>
					
    				</div>


            	</div>

            	<div class="col-md-4 right-div overflow-auto" style="margin-top:-20px; height:80vh" v-show="showPage != 0">

					<!-- PAGE 1 - Add a new bungalow -->
                	<div class="container" v-show="showPage == 1">
						
						<form ref="addNewBungalowForm">
							<div class="container align-items-start">

							<img src="images/close-icon.png" style="float:right; width:3vh; height:3vh" @click="backButton()"/><br><br><br>
								<p class="title-text-bold" style="text-align:center;"> Add a new Bungalow </p>

								<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >

									<tr><td><input type="text" id="id_bungalowName" placeholder="   Bungalow's name" class="input-text" v-model="dtoAddNewBungalow.offerName" style="margin-top: 5px; height:20px; font-size:12px; font-family:'poppins-light'" required/></td></tr>
									<tr class="d-flex justify-content-evenly">
										<td><input type="text" placeholder="   Country" class="input-text"  v-model="dtoAddNewBungalow.country" style="margin-top: 5px; margin-right:2px; height:20px; font-size:12px; font-family:'poppins-light'" required/></td>
										<td><input type="text" placeholder="   City" class="input-text"  v-model="dtoAddNewBungalow.city" style="margin-top: 5px; margin-right:2px; height:20px; font-size:12px; font-family:'poppins-light'" required/></td>
										<td><input type="text" placeholder="   Street" class="input-text"  v-model="dtoAddNewBungalow.street" style="margin-top: 5px; margin-right:2px; height:20px; font-size:12px; font-family:'poppins-light'" required/></td>
										<td><input type="text" placeholder="   Street number" class="input-text"  v-model="dtoAddNewBungalow.streetNumber" style="margin-top: 5px; height:20px; font-size:12px; font-family:'poppins-light'; text-overflow: ellipsis;" required/></td>
									</tr>
									<tr class="d-flex justify-content-evenly"> 
										<td><input type="text" placeholder="   Unit price" class="input-text"  v-model="dtoAddNewBungalow.unitPrice" style="margin-top: 5px; height:20px; font-size:12px; font-family:'poppins-light'" required/></td>
										<td><input type="text" placeholder="   Maximum capacity" class="input-text"  v-model="dtoAddNewBungalow.maxCustomerCapacity" style="margin-top:5px; height:20px; font-size:12px; font-family:'poppins-light'; text-overflow: ellipsis;" required/></td>
										<td><input type="text" placeholder="   Number of rooms" class="input-text"   v-model="dtoAddNewBungalow.numberOfRooms" style="margin-top:5px; height:20px; font-size:12px; font-family:'poppins-light'" required/></td>
										<td><input type="text" placeholder="   Number of beds" class="input-text"   v-model="dtoAddNewBungalow.numberOfBeds" style="margin-top:5px; height:20px; font-size:12px; font-family:'poppins-light'" required/></td>
									</tr>
									<tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area"  v-model="dtoAddNewBungalow.description" style="margin-top:5px; height:40px; font-size:12px; font-family:'poppins-light'"  required></textarea></tr>
									<tr><textarea rowspan="3" name="text" placeholder="   Additional services (Add keywords: Wi-fi, Parking, etc.)" class="input-text-area"  v-model="dtoAddNewBungalow.additionalServices" style="margin-top:5px; height:40px; font-size:12px; font-family:'poppins-light'"  required></textarea></tr>
									<tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="dtoAddNewBungalow.rulesOfConduct" style="margin-top:5px; height:40px; font-size:12px; font-family:'poppins-light'" required ></textarea></tr>
									<tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="dtoAddNewBungalow.cancellationPolicy" style="margin-top:5px; height:40px; font-size:12px; font-family:'poppins-light'"  required></textarea></tr>
									<tr class="d-flex justify-content-evenly">
										<td><input  v-bind:style="{'background-color':backgroundColor, 'cursor':cursorStyle}" class="confirm" type="button" value="Add new bungalow"  @click="addNewBungalow()" style="margin-top:5; width:120%;"/></td>
										<td><input  class="confirm-profile" type="reset" value="Reset" style="width:120%; font-size:12px; background-color: gray"/></td>
									</tr>

								</table>

							</div>
						</form>

                	</div>

					<!-- PAGE 2 - Show Details -->

                	<div class="container" v-show="showPage == 2">
						
						<div class="container align-items-start">

							<img src="./images/close.png'" style="float:right;" @click="backButton()"/><br><br><br>
							<p class="title-text-bold" style="text-align:center;"> {{this.selectedBungalow.offerName}}</p>

							<div class="container">
								<div class="row">
									<div class="col" style="text-align:center;
																height:100px;
																background-color: #1b4560;
																background-image:url('./images/bungalow-images/bungalow-1-in-1.jpg');
																background-size: contain;
																background-repeat: no-repeat;
																background-position: center;											
																"></div>
									<div class="col" style="text-align:center;
																height:100px;
																background-color: #1b4560;
																background-image:url('./images/bungalow-images/bungalow-1-out-1.jpg');
																background-size: contain;
																background-repeat: no-repeat;
																background-position: center;											
																"></div>

								</div>
							</div>
	


							<hr>
							<p class="title-text-bold" style="text-align:center; font-size:13px;"> Description: {{this.selectedBungalow.description}}</p>
							<p class="title-text-bold" style="text-align:center; font-size:13px;"> Rules of Conduct: {{this.selectedBungalow.rulesOfConduct}}</p>
							<p class="title-text-bold" style="text-align:center; font-size:13px;"> Cancellation policy: {{this.selectedBungalow.cancellationPolicy}}</p>
							<hr>

							<div class="container">
								<div class="row">
									<div class="col" style="text-align:center;
																height:100px;
																background-color: #1b4560;
																background-image:url('./images/map.jpg');
																background-size: contain;
																background-repeat: no-repeat;
																background-position: center;											
																"></div>
			
							</div>

							<p class="title-text-bold" style="text-align:center; font-size:13px;"> Location: {{this.selectedBungalowsLocation.country}}, 
																							 {{this.selectedBungalowsLocation.city}},
																							 {{this.selectedBungalowsLocation.street}}
																							 {{this.selectedBungalowsLocation.streetNumber}}</p>

							<hr>
							<p class="title-text-bold" style="text-align:center; font-size:13px;"> Rating: {{this.selectedBungalow.rating}}, Initial price: {{this.selectedBungalow.unitPrice}}</p>
							<p class="title-text-bold" style="text-align:center; font-size:13px;"> Maximum customer capacity: {{this.selectedBungalow.maxCustomerCapacity}}, Number of rooms: {{this.selectedBungalow.numberOfRooms}} ,Number of beds: {{this.selectedBungalow.numberOfBeds}}</p>
							<hr>

							<p class="title-text-bold" style="text-align:center; font-size:15px;"> Owner' contact:  {{this.selectedBungalowsOwner.firstName}}
																									{{this.selectedBungalowsOwner.lastName}},
																									{{this.selectedBungalowsOwner.email}},
																									{{this.selectedBungalowsOwner.phoneNumber}}</p>





							</div>

						</div>

                	</div>






					<!-- PAGE 3 - Update Details -->

					<!-- PAGE 4 - Delete Offer -->

					<!-- PAGE 5 - Update free terms -->

					<!-- PAGE 6 - Update last minute terms -->








            	</div>

			</div>
		</div>
		`
	,
    mounted(){

		this.loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
		this.loadOwnersBungalows();
		this.initMap();

    },
	computed:{

		axiosSearchParams() {
			const params = new URLSearchParams();
			params.append('name', this.searchParams.bungalowName);
			params.append('location', this.searchParams.bungalowLocation);
			params.append('type', 'BUNGALOW');
			return params;
		},

		isAddNewBungalowFormFilled() {
			correctOfferName = /\S/.test(this.dtoAddNewBungalow.offerName) && /$/.test(this.dtoAddNewBungalow.offerName);
			correctMaxCustomerCapacity = /\S/.test(this.dtoAddNewBungalow.maxCustomerCapacity) && /^\d+$/.test(this.dtoAddNewBungalow.maxCustomerCapacity);
			correctUnitPrice = /\S/.test(this.dtoAddNewBungalow.unitPrice) && /^\d+$/.test(this.dtoAddNewBungalow.unitPrice);
			flag = correctOfferName && correctMaxCustomerCapacity && correctUnitPrice &&
			/\S/.test(this.dtoAddNewBungalow.country) &&
			/\S/.test(this.dtoAddNewBungalow.city) &&
			/\S/.test(this.dtoAddNewBungalow.street) &&
			/\S/.test(this.dtoAddNewBungalow.streetNumber) &&

			/\S/.test(this.dtoAddNewBungalow.unitPrice) &&
			/\S/.test(this.dtoAddNewBungalow.maxCustomerCapacity) &&
			/\S/.test(this.dtoAddNewBungalow.numberOfRooms) &&
			/\S/.test(this.dtoAddNewBungalow.numberOfBeds) &&

			/\S/.test(this.dtoAddNewBungalow.description) &&
			/\S/.test(this.dtoAddNewBungalow.rulesOfConduct) &&
			/\S/.test(this.dtoAddNewBungalow.additionalServices) &&
			/\S/.test(this.dtoAddNewBungalow.cancellationPolicy);

			this.backgroundColor = flag ? "seagreen" : "#2e4f3c";
			this.cursorStyle = flag ? "pointer" : "default";
			return flag;
		}
	},
	methods:{

		initMap: function(){
			this.map = new ol.Map({
				target: 'map',
				layers: [
				new ol.layer.Tile({
					source: new ol.source.OSM()
				})
				],
				view: new ol.View({
				center: ol.proj.fromLonLat([37.41, 8.82]),
				zoom: 14
				})
			});
			console.log(this.map);
		},

		loadOwnersBungalows(){

			axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");
			axios.get('/api/allMyBungalows')
			.then(response => {
				this.myBungalows = response.data
				console.log(this.myBungalows);
			})


		},

		backButton: function(){
			//this.$ref.addNewBungalowForm.reset();
			this.hideAddNewBungalowForm();
		},

		addNewBungalow: function(){

			axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");
			axios.post('/api/addNewBungalow' , this.dtoAddNewBungalow)
				.then(response => { 
					if(response.data === true){
						Swal.fire('Added bungalow successfuly!',
									'Juhu!!',
									'success')
						}
					else{
						Swal.fire('Ooops, something went wron!',
								'Please, try again later',
								'error')
						}
				}).catch(
						Swal.fire('Ooops, something went wron!',
								'Please, try again later',
								'error')
			)
			this.loadOwnersBungalows();

		},

		showDetails: function(bungalow){
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			console.log(this.selectedBungalow.location.country);
			this.showPage = 2;

		},



		hideAddNewBungalowForm: function() {this.showPage = 0;},
		showAddNewBungalowForm: function() {this.showPage = 1;},

		search : function(){
			axios.get('/api/search/' + this.loggedUser.id.toString(), {params: this.axiosSearchParams})
				.then(response => {
					this.myBungalows = response.data
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
				return this.myBungalows.sort(compare);
			}
			 if(this.sortOption === 'AscAlpha'){
				 function compare(a, b) {
					 if (a.offerName < b.offerName)
						return -1;
					 if (a.offerName > b.offerName)
						return 1;
					 return 0;
				 }
				 return this.myBungalows.sort(compare);
			 }
			 if(this.sortOption === 'AscRating'){
				function compare(a, b) {
				  if (a.rating > b.rating)
					return -1;
				  if (a.rating < b.rating)
					return 1;
				 return 0;
			   }
				return this.myBungalows.sort(compare);
			}
			 if(this.sortOption === 'DescRating'){
				 function compare(a, b) {
					 if (a.rating < b.rating)
						return -1;
					 if (a.rating > b.rating)
						return 1;
					 return 0;
				 }
				 return this.myBungalows.sort(compare);
			 }
			 if(this.sortOption === 'AscPrice'){
				function compare(a, b) {
				  if (a.unitPrice > b.unitPrice)
					return -1;
				  if (a.unitPrice < b.unitPrice)
					return 1;
				 return 0;
			   }
				return this.myBungalows.sort(compare);
			}
			 if(this.sortOption === 'DescPrice'){
				 function compare(a, b) {
					 if (a.unitPrice < b.unitPrice)
						return -1;
					 if (a.unitPrice > b.unitPrice)
						return 1;
					 return 0;
				 }
				 return this.myBungalows.sort(compare);
			 }
	  }



	}

});