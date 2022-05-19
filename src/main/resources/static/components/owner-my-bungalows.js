// import $ from 'jquery'
Vue.component('owner-my-bungalows', {
	data: function(){
		return{	
			loggedUser: null,
			myBungalows:[],
			allImages:[],

			allAdditionalServices: [],
			bungalowTimeSlots: [],

			showPage: 0,
			sortOption: "",
			searchParams: {
				bungalowName : "",
				bungalowLocation: ""
			},

			selectedBungalow:{},
			selectedBungalowsLocation:{},
			selectedBungalowsOwner:{},

            dataToSend: {
                offerType: [],
				offerName: [],

				country: [],
				city: [],
				street: [],
				streetNumber:[],

				longitude:[],
				latitude:[],

				description:[],
				unitPrice:[],
				maxCustomerCapacity:[],
				numberOfRooms:[],
				numberOfBeds:[],

				maxCustomerCapacity:[],
				rulesOfConduct:[],
				additionalServices:[],
				cancellationPolicy:[],
				image: []

            },

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
				image: []

			},

			dataToSend_AvailbleTimeSlot:{
				startTime:"",
				endTime:""
			},


			map: {},
			backgroundColor: {},
			cursorStyle: {},

			// New Bungalow
			imagesFrontend:[],
			imagesBackend:[],
			imageCount: 0

		}
	},
template: `	
		<div>
			<nav-bar></nav-bar><br><br>

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
								<!--
								<div class="col-md-4" style="text-align:center;
																background-color: #1b4560;
																background-image:url('./images/bungalow-images/bungalow-1-out-1.jpg');
																background-size: contain;
																background-repeat: no-repeat;
																background-position: center;											
																">
								</div> -->
								<div class="col-md-4" style="text-align:center; background-color: #1b4560;">
									<div v-for="image in allImages">
										<div v-if="image.offer.id == bungalow.id"> 
											<p> BungalowId: {{bungalow.id}} - ImageId: {{image.id}} </p>
											<!-- <img :src=" './upload/' + image.id" style="height:auto; width:auto;" alt=" 'bungalowpic-' + image.id + '-' + bungalow.id "/> -->
											<img v-bind:src="getBungalowImg(image)"/>
										</div>
									</div>
								</div> 



								<div class="col-md-8">
									<div class="card-body" style="padding: 1vh;">
										<p class="card-title text-start mt-1" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{bungalow.offerName}}</p>
										<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:10px;">{{bungalow.description}}</p>
										<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Initial price: {{bungalow.unitPrice}}</p>
										<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{bungalow.rating}}</p>

										<button class="float-end btn btn-light button-options" style="background-color: #1b4560; margin-right: 2px;" @click="showDetails(bungalow)">Show details</button>
										<button class="float-end btn btn-light button-options" style="background-color: #1b4560; margin-right: 2px;" @click="showUpdateDetails(bungalow)">Update details</button>
										<button class="float-end btn btn-light button-options" style="background-color: #1b4560; margin-right: 2px;" @click="showDeleteOffer(bungalow)">Delete offer</button>
										<button class="float-end btn btn-light button-options" style="background-color: #1b4560; margin-right: 2px;" @click="showUpdateAvailableTerms(bungalow)">Update available terms</button>
										<button class="float-end btn btn-light button-options" style="background-color: #1b4560; margin-right: 2px;" @click="showMakeQuickReservation(bungalow)">Make quick reservations</button>
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
								<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;">
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
									<tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area"  v-model="dtoAddNewBungalow.description" style="margin-top:5px; margin-bottom: 5px; height:40px; font-size:12px; font-family:'poppins-light'"  required></textarea></tr>
									<tr> <h3 class="d-inline align-middle" style="font-family: poppins-light; font-size: 12px; text-align: center; color:#fff; margin-top:5px;"> Add additional services to the new bungalow: </h3></tr>
									<tr>

										<div class="list-group text-start overflow-auto card m-2" style="height:60px; max-height:max-content; width: 100%; background-color:#1b4560">
											<label v-for="additionalServ in allAdditionalServices" :key="additionalServ" class="list-group-item" style="font-family: poppins-light; font-size: 12px; color:#fff; background-color:#1b4560">
												<div v-if="additionalServ.type == 'ADDITIONAL_SERVICE' "> 
													<input class="form-check-input me-1" type="checkbox" value="" > {{additionalServ.name}}
											</label>
										</div>								
									</tr>
									<tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="dtoAddNewBungalow.rulesOfConduct" style="margin-top:5px; height:40px; font-size:12px; font-family:'poppins-light'" required ></textarea></tr>
									<tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="dtoAddNewBungalow.cancellationPolicy" style="margin-top:5px; height:40px; font-size:12px; font-family:'poppins-light'"  required></textarea></tr>
									<tr><td><input type="file" name="file[]" @change="imageSelected" multiple="multiple"></input></td></tr>

									<tr> 
										<div class="overflow-auto card pb-3" style="height: 200px; background-color:#1b4560 ">
											<div v-for="(image, index) in imagesFrontend" :key="(image, index)">
												<button v-on:click="removeImage(image, index)" class="btn btn-danger rounded-circle removeImageBtn end-0 m-4">Remove</button>
												<img class="ms-3 me-3 mt-3 newImage img-fluid" v-bind:src="image.path" >
											</div>
										</div>
									</tr>

									<tr class="d-flex justify-content-evenly">
										<td><input  v-bind:style="{'background-color':backgroundColor, 'cursor':cursorStyle}" class="confirm" type="button" value="Add new bungalow"  @click="addNewBungalow()" style="margin-top:5; width:120%;"/></td>
									</tr>
								</table>
							</div>
						</form>
                	</div>
					<!-- PAGE 2 - Show Details -->
                	<div class="container" v-show="showPage == 2">
						<div class="container align-items-start">
							<img src="images/close-icon.png" style="float:right; width:3vh; height:3vh" @click="backButton()"/><br><br><br>
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
																">
									</div>
									<div class="col" style="text-align:center;
																height:100px;
																background-color: #1b4560;
																background-image:url('./images/bungalow-images/bungalow-1-out-1.jpg');
																background-size: contain;
																background-repeat: no-repeat;
																background-position: center;											
																">
									</div>
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
																">
									</div>
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
					<div class="container" v-show="showPage == 3">
						<div class="container align-items-start">
							<img src="images/close-icon.png" style="float:right; width:3vh; height:3vh" @click="backButton()"/><br><br><br>
							<p class="title-text-bold" style="text-align:center;"> Update:</p>
							<p class="title-text-bold" style="text-align:center;"> {{this.selectedBungalow.offerName}}</p>
						</div>
                	</div>
					<!-- PAGE 4 - Delete Offer -->
					<div class="container" v-show="showPage == 4">
						<div class="container align-items-start">
							<img src="images/close-icon.png" style="float:right; width:3vh; height:3vh" @click="backButton()"/><br><br><br>
							<p class="title-text-bold" style="text-align:center;"> Delete:</p>
							<p class="title-text-bold" style="text-align:center;"> {{this.selectedBungalow.offerName}}</p>
						</div>
                	</div>
					<!-- PAGE 5 - Update free terms -->
					<div class="container" v-show="showPage == 5">
						<div class="container align-items-start">
							<img src="images/close-icon.png" style="float:right; width:3vh; height:3vh" @click="backButton()"/><br><br><br>
							<p class="title-text-bold" style="text-align:center;"> Update available terms:</p>
							<p class="title-text-bold" style="text-align:center;"> {{this.selectedBungalow.offerName}}</p>
							<hr>
							<!--
							<form ref="addNewTimeSlotToBungalow">
							
								<label for="start-time" style="font-family:poppins-bold; color:#fff;">Choose a start time for available terms:</label>
								<span><input class="datetime-local" type="datetime-local" id="start-time" name="start-time" 
												value="2022-05-07T19:30" min="2022-05-07T00:00" max="2022-12-12T00:00"></span>
								<br><br>
								<label for="end-time"style="font-family:poppins-bold; color:#fff;">Choose an end time for available terms:</label>
								<span><input class="datetime-local" type="datetime-local" id="end-time"name="end-time" 
												value="2022-05-07T19:30" min="2022-05-07T00:00" max="2022-12-12T00:00"></span>
								<br><br><br>
								<input  v-bind:style="{'background-color':backgroundColor, 'cursor':cursorStyle}" 
										class="confirm" type="button" value="Add new available time slot"  @click="addNewTimeSlotToBungalow(this.selectedBungalow)" 
										style=""/>	
								<input type="text" name="datetimes" />
							</form>
							-->
							<div class="container mt-5 mb-5" style="width: 400px">
								<input type="text" id="picker" name="datetimes" class="form-control" style="background-color: #1b4560; color: #fff;" >
								<br>
								<p style="font-family:poppins-light; color:#fff"> Start date: <b id="startDate"> ...... </b></p>
								<p style="font-family:poppins-light; color:#fff"> End date:   <b id="endDate"> ...... </b></p>
								<input  v-bind:style="{'background-color':backgroundColor, 'cursor':cursorStyle}" 
										class="confirm" type="button" value="Add new available time slot"  
										@click="addNewTimeSlotToBungalow(this.selectedBungalow)" 
										style=""/>	
							</div>
							<br><br><br>
							<p class="title-text-bold" style="text-align:center;"> Available terms:</p>
							<table class="flat-table flat-table-1">
								<thead> <th>Start time</th> <th>End time</th> </thead>
								<tbody v-for="timeSlot in bungalowTimeSlots"> 
										<tr> <td>{{timeSlot.startTime }}</td> 
											 <td>{{timeSlot.endTime }}</td> </tr>
								</tbody>
							</table>
						</div>
                	</div>
					<!-- PAGE 6 - Update last minute terms -->
					<div class="container" v-show="showPage == 6">
						<div class="container align-items-start">
							<img src="images/close-icon.png" style="float:right; width:3vh; height:3vh" @click="backButton()"/><br><br><br>
							<p class="title-text-bold" style="text-align:center;"> Make quick reservation:</p>
							<p class="title-text-bold" style="text-align:center;"> {{this.selectedBungalow.offerName}}</p>
						</div>
                	</div>
            	</div>
			</div>
		</div>
		`
	,
    mounted(){

		this.loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
		this.loadOwnersBungalows();
		this.loadAllAdditionalServices();
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
			/\S/.test(this.dtoAddNewBungalow.cancellationPolicy);

			this.backgroundColor = flag ? "seagreen" : "#2e4f3c";
			this.cursorStyle = flag ? "pointer" : "default";
			return flag;
		}
	},
	methods:{

        imageSelected(event){
        	const file = document.querySelector('input[type=file]')
			var readers = new Array(file.files.length)
			for(var i = 0; i < file.files.length; ++i){
				readers[i] = new FileReader();
				readers[i].name = i;
			}
			var i = 0;
			var j = 0;
			while(i < file.files.length){
				var cFile = file.files[i];
				if(cFile != null){
					let rawImg;
					this.imagePath = true;
					readers[i].onloadend = () => {
						this.dtoAddNewBungalow.image.push(readers[j].result);
						this.imageCount++;
						this.imagesFrontend.push({id: this.imageCount, name:""+this.imageCount, path: URL.createObjectURL(cFile)})
						alreadyLoaded = false;
						++j;     
					}
					readers[i].readAsDataURL(cFile);
					++i;
				}
				else{
					this.imagePath = false
				}
			}
        },

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

		initDateRangePicker(){
			var today = new Date();
			$('input[name="datetimes"]').daterangepicker({
				autoUpdateInput: true,
				timePicker24Hour: true,
				timePicker: true,
				autoApply: true,
				minDate: today,
				startDate: moment().startOf('hour'),
				endDate: moment().startOf('hour').add(32, 'hour'),
				locale: {
				  format: 'YYYY/MM/DD HH:mm',
				  "weekLabel": "W",
				  "daysOfWeek": [
					  "Su",
					  "Mo",
					  "Tu",
					  "We",
					  "Th",
					  "Fr",
					  "Sa"
				  ],
				  firstDay: 1

				}}
				,
				function(startDate, endDate, label){
					$('#startDate').text(startDate.format('YYYY-MM-DD HH:mm'))
					$('#endDate').text(endDate.format('YYYY-MM-DD HH:mm'))
				});
		},

		loadOwnersBungalows(){

			axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");
			axios.get('/api/allMyBungalows').then(response => {
				this.myBungalows = response.data
				// console.log(response.data)
				axios.get('/api/getAllImages').then(response => {
					this.allImages = response.data
					console.log(this.allImages);
				})

				//console.log(this.myBungalows);
			})

		},

		loadAllAdditionalServices(){
			axios.get('api/getAllAdditionalServicesForBungalows').then(response => {
            this.allAdditionalServices = response.data;
            //console.log(response.data);
        });


		},

		resetAddNewBungalow(){
			this.imagesFrontend = [];
			this.dtoAddNewBungalow = {};
			this.$router.go(this.$router.currentRoute)

		},

		getBungalowImg(image){
	
			console.log(image.id);
			return 'http://localhost:8080/api/getImage/'+ image.id;

		},

		loadBungalowTimeSlots(bungalow){
			//axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");
			axios.get('/api/bungalow/getBungalowTimeSlots/' + bungalow.id)
			.then(response => {
				this.bungalowTimeSlots = response.data
				//console.log(this.bungalowTimeSlots);
			})

		},

		backButton: function(){
			this.$router.go(this.$router.currentRoute)
			this.hideAddNewBungalowForm();
		},

		addNewTimeSlotToBungalow(){
			console.log("AddNewTimeSlotToBungalow(bungalow)... START")
			let startDate = moment($('input[name="datetimes"]').data('daterangepicker').startDate).toDate();
			let endDate = moment($('input[name="datetimes"]').data('daterangepicker').endDate).toDate();
			//console.log(startDate);
			//console.log(endDate);
			this.dataToSend_AvailbleTimeSlot.startTime = startDate;
			this.dataToSend_AvailbleTimeSlot.endTime = endDate;
			var isValidNewTimeSlot = !this.multipleDateRangeOverlaps();
			console.log(isValidNewTimeSlot);
			if(!isValidNewTimeSlot){
				Swal.fire('Invalid new time slot!', 'Timeslots cannot intersect!','error')
			}
			else{
				axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");
				axios.post('/api/bungalow/addNewTimeSlotToBungalow/' + this.selectedBungalow.id , this.dataToSend_AvailbleTimeSlot)
				.then(response => { 
					if(response.data === true){ 
						Swal.fire('Added available time slot successfully!', 'Hurray!!', 'success')
						this.showUpdateAvailableTerms(this.selectedBungalow) }
					else{ Swal.fire('Ooops, something went wrong!', 'Please, try again later', 'error') }
				}).catch( Swal.fire('Ooops, something went wrong!', 'Please, try again later', 'error') )
				
			}
		},
		multipleDateRangeOverlaps(){
			let timeIntervals = this.bungalowTimeSlots
			let newStartTime = this.dataToSend_AvailbleTimeSlot.startTime;
			let newEndTime = this.dataToSend_AvailbleTimeSlot.endTime;
			if(timeIntervals.length>0){
				for(let i = 0; i < timeIntervals.length; i++){
					if (this.dateRangeOverlaps(
							Date.parse(timeIntervals[i].startTime), Date.parse(timeIntervals[i].endTime),
							Date.parse(newStartTime), Date.parse(newEndTime)
							)
						) return true;
				}
			}
			return false;
		},
		dateRangeOverlaps(a_start, a_end, b_start, b_end) {
			if((a_end < b_start) || (b_end < a_start)) return false;
			return true;
		},

		addNewBungalow: function(){
		    this.dataToSend.offerType.push(this.dtoAddNewBungalow.offerType);
		    this.dataToSend.offerName.push(this.dtoAddNewBungalow.offerName);
		    this.dataToSend.country.push(this.dtoAddNewBungalow.country);
            this.dataToSend.city.push(this.dtoAddNewBungalow.city);
            this.dataToSend.street.push(this.dtoAddNewBungalow.street);
            this.dataToSend.streetNumber.push(this.dtoAddNewBungalow.streetNumber);
            this.dataToSend.longitude.push(this.dtoAddNewBungalow.longitude);
            this.dataToSend.latitude.push(this.dtoAddNewBungalow.latitude);
            this.dataToSend.description.push(this.dtoAddNewBungalow.description);
            this.dataToSend.unitPrice.push(this.dtoAddNewBungalow.unitPrice);
            this.dataToSend.maxCustomerCapacity.push(this.dtoAddNewBungalow.maxCustomerCapacity);
            this.dataToSend.numberOfRooms.push(this.dtoAddNewBungalow.numberOfRooms);
			this.dataToSend.numberOfBeds.push(this.dtoAddNewBungalow.numberOfBeds);
			this.dataToSend.maxCustomerCapacity.push(this.dtoAddNewBungalow.maxCustomerCapacity);
            this.dataToSend.rulesOfConduct.push(this.dtoAddNewBungalow.rulesOfConduct);
            this.dataToSend.additionalServices.push(this.dtoAddNewBungalow.additionalServices);
            this.dataToSend.cancellationPolicy.push(this.dtoAddNewBungalow.cancellationPolicy);
            this.dataToSend.image = this.dtoAddNewBungalow.image;
			axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");
			axios.post('/api/addNewBungalow' , this.dataToSend)
				.then(response => { 
					if(response.data === true){
						Swal.fire('Added bungalow successfuly!',
									'Juhu!!',
									'success')
						}
					else{
						Swal.fire('Ooops, something went wrongg!',
								'Please, try again later',
								'error')
						}
				}).catch(
						Swal.fire('Ooops, something went wrong!',
								'Please, try again later',
								'error')
			)
			this.location.reload();
			this.loadOwnersBungalows();

		},

		hideAddNewBungalowForm: function() {this.showPage = 0;},


		showAddNewBungalowForm: function() {
			this.showPage = 1;},

		showDetails: function(bungalow){
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			console.log(this.selectedBungalow.location.country);
			this.showPage = 2;
		},

		showUpdateDetails: function(bungalow){
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			console.log(this.selectedBungalow.location.country);
			this.showPage = 3;
		},

		showDeleteOffer: function(bungalow){
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			console.log(this.selectedBungalow.location.country);
			this.showPage = 4;
		},

		showUpdateAvailableTerms: function(bungalow){
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			console.log(this.selectedBungalow.location.country);
			this.loadBungalowTimeSlots(this.selectedBungalow)
			this.showPage = 5;
			this.initDateRangePicker();
		},

		showMakeQuickReservation: function(bungalow){
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			console.log(this.selectedBungalow.location.country);
			this.showPage = 6;
		},


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