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

			dtoAddNewBungalow: {
				offerType: "BUNGALOW",
				offerName: "",

				country: "",
				city: "",
				street: "",
				streetNumber:"",

				longitude: 45.24,
				latitude: 19.82,

				description:"",
				unitPrice: 0 ,
				maxCustomerCapacity:0,
				numberOfRooms: 0,
				numberOfBeds: 0,

				rulesOfConduct:"",
				additionalServices: [],
				cancellationPolicy:"",
				image: [],

				imageCount: 0,
				imagesFrontend: []

			},

			dataToSend_AvailbleTimeSlot:{
				startTime:"",
				endTime:""

			},

			map: {},
			backgroundColor: {},
			cursorStyle: {},

		}
	},
template: `	
		<div>
			<nav-bar></nav-bar><br><br>
            <div class="my-bungalows" v-if="loggedUser.userType == 'BUNGALOW_OWNER'">
				<!-- PAGE 0 - List of all bungalows (with search and sort) -->
				<div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; height:80vh">
					<form>
						<!-- PAGE 0-A - Search bungalows-->
						<table class="justify-content-center" style="width:90%; margin-left:5%; table-layout:fixed;" >
							<tr><td colspan="2" rowspan="1"><input v-model="searchParams.bungalowName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="  Bungalow's name" /></td>
								<td colspan="1" rowspan="2"><input @click="search" class="confirm-profile center-text-button" type="button" style="background-color: #1b4560; font-size: 14px; margin:6px; padding:6px; text-align:center;" value="Search" /></td>
								<td colspan="2" rowspan="2"><input class="confirm-profile center-text-button" type="button" style="background-color: #28a745; font-size: 14px; margin:6px; padding:6px; text-align:center;" @click="showAddNewBungalowForm" value="Add a new bungalow"/></td>
							</tr>
							<tr>
								<td colspan="2" rowspan="1"><input v-model="searchParams.bungalowLocation" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="  Bungalow's location"/></td>
							</tr>
						</table> 
						<!-- PAGE 0-B - Sort bungalows-->
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
						<!-- PAGE 0-C - List of all bungalows (sorted, filtered)-->
    				<div class="container mt-5">
						<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="bungalow in myBungalows">

							<div class="row g-0">
								<div class="col-md-4" style="text-align:center; background-color:#1b4560; padding:1px;">
										<div class="overflow-auto pb-2 pt-2" style="height:225px; background-color:#1b4560 margin:5%">
											<div v-if="bungalow.images.length">
												<div v-for="(image, idx) in bungalow.images" >
													<img class="ms-3 me-3 mt-3 img-fluid" v-bind:src="setImage(image)" alt="SomePhoto" style="max-width: 80%;" >
												</div>
											</div>
											<div v-else class="d-flex align-items-center flex-column">
												<p style="text-align:center; color:gray margin-bottom:0px"> There's no picture of this bungalow.  </p>
												<img src="images/no-pictures.jpg" style="width: 90%; height: auto;">
											</div>	
										</div>
								</div> 

								<div class="col-md-8">

									<table class="justify-content-center" style="width:95%; margin: auto; table-layout:fixed;">
										<tr>
											<td colspan="6">
												<p class="card-title text-start mt-1" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{bungalow.offerName}}</p>
											</td>
											<td colspan="2">
												<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-bold; font-size:13px; background-color:#1b4560; border: 2px #123247 solid; border-radius: 5px;"> &nbsp; Rating: {{bungalow.rating}}</p>
											</td>

										</tr>
										<tr>
											<td colspan="6">
												<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:10px;">{{bungalow.location.city}}</p>
											</td>
											<td colspan="2">
												<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-bold; font-size:13px; background-color:#1b4560; border: 2px #123247 solid; border-radius: 5px;"> &nbsp; Price: {{bungalow.unitPrice}} $</p>
											</td>
										</tr>
										<tr>
											<td colspan="8">
												<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:10px;">{{bungalow.description}}</p>
											</td>
										</tr>

									</table>
	
									<div class="card-body" style="padding: 1vh;">
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
				<!-- PAGE [1-6] -->
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
										<td><input type="text" placeholder="   Street number" class="input-text"  v-model="dtoAddNewBungalow.streetNumber" style="margin-top: 5px; margin-bottom: 5px; height:20px; font-size:12px; font-family:'poppins-light'; text-overflow: ellipsis;" required/></td>
									</tr>
									<tr class="d-flex justify-content-evenly"> 
										<td style=" text-align: center;vertical-align: middle;"> <p class="d-inline align-middle" style="margin-top: 5px; font-family: poppins-light; font-size: 12px; text-align: center; color:#fff; margin-top:5px;"> Unit price: </p> </td>
										<td><input type="number" placeholder="   Unit price" class="input-text"  v-model="dtoAddNewBungalow.unitPrice" style="margin-top: 5px; height:20px; width:60px; font-size:12px; font-family:'poppins-light'" required/></td>
										<td style=" text-align: center;vertical-align: middle;"> <p class="d-inline align-middle" style="margin-top: 5px; font-family: poppins-light; font-size: 12px; text-align: center; color:#fff; margin-top:5px;"> Maximum capacity: </p> </td>
										<td><input type="number" placeholder="   Maximum capacity" class="input-text"  v-model="dtoAddNewBungalow.maxCustomerCapacity" style="margin-top:5px;  margin-bottom: 5px; height:20px; width:60px;  font-size:12px; font-family:'poppins-light'; text-overflow: ellipsis;" required/></td>					
									</tr>
									<tr class="d-flex justify-content-evenly"> 
										<td style=" text-align: center;vertical-align: middle;"> <p class="d-inline align-middle" style="margin-top: 5px; font-family: poppins-light; font-size: 12px; text-align: center; color:#fff; margin-top:5px;"> Number of rooms: </p> </td>
										<td><input type="number" placeholder="   Number of rooms" class="input-text"   v-model="dtoAddNewBungalow.numberOfRooms" style="margin-top:5px; height:20px; width:60px; font-size:12px; font-family:'poppins-light'" required/></td>
										<td style=" text-align: center;vertical-align: middle;"> <p class="d-inline align-middle" style="margin-top: 5px; font-family: poppins-light; font-size: 12px; text-align: center; color:#fff; margin-top:5px;"> Number of beds: </p> </td>
										<td><input type="number" placeholder="   Number of beds" class="input-text"   v-model="dtoAddNewBungalow.numberOfBeds" style="margin-top:5px; height:20px; width:60px;  font-size:12px; font-family:'poppins-light'" required/></td>
									</tr>
									<tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area"  v-model="dtoAddNewBungalow.description" style="margin-top:5px; margin-bottom: 5px; height:40px; font-size:12px; font-family:'poppins-light'"  required></textarea></tr>
									<tr> <h3 class="d-inline align-middle" style="font-family: poppins-light; font-size: 12px; text-align: center; color:#fff; margin-top:5px;"> Add additional services to the new bungalow: </h3></tr>
									<tr>
										<div class="list-group text-start overflow-auto card m-2" style="height:60px; max-height:max-content; width: 100%; background-color:#1b4560">
											<label v-for="additionalServ in allAdditionalServices" class="list-group-item" style="font-family: poppins-light; font-size: 12px; color:#fff; background-color:#1b4560">
												<div v-if="additionalServ.type == 'ADDITIONAL_SERVICE' "> 
													<input class="form-check-input me-1" type="checkbox" value="" v-on:click="clickAdditionalServ(additionalServ)"> {{additionalServ.name}}
												</div>
											</label>
										</div>								
									</tr>
									<tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="dtoAddNewBungalow.rulesOfConduct" style="margin-top:5px; height:40px; font-size:12px; font-family:'poppins-light'" required ></textarea></tr>
									<tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="dtoAddNewBungalow.cancellationPolicy" style="margin-top:5px; height:40px; font-size:12px; font-family:'poppins-light'"  required></textarea></tr>
									<tr><td><input type="file" name="file[]" @change="imageSelected" multiple="multiple"></td></tr>
									<tr> 
										<div class="overflow-auto card pb-3" style="height: 200px; background-color:#1b4560 ">
											<div v-for="(image, ind) in dtoAddNewBungalow.imagesFrontend" >
												<button v-on:click="removeImage(image, ind)"  class="btn btn-danger rounded-circle end-0 m-4" style ="position:absolute:">Remove</button>
												<img class="ms-3 me-3 mt-3 img-fluid" v-bind:src="image.path" style="width:400px;" >
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
							<form ref="showBungalowForm">
							<div class="container align-items-start">
								<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;">
									<tr>
										<td colspan="2" style="padding:2.5px; text-align:left; vertical-align:middle;"> <p class="d-inline align-middle" style="font-family:poppins-light; font-size: 12px; text-align:center; color:#fff;"> Bungalow's name: </p> </td>
										<td colspan="5"><input type="text" id="id_bungalowName" placeholder="   Bungalow's name" class="input-text" v-model="this.selectedBungalow.offerName" style="margin:0; height:20px; font-size:12px; font-family:'poppins-light' color:#fff;" disabled/></td>
									</tr>
									<tr>
										<td colspan="2" style="padding:2.5px; text-align:left; vertical-align:middle;"> <p class="d-inline align-middle" style="font-family:poppins-light; font-size: 12px; text-align:center; color:#fff;"> Bungalow's location: </p> </td>
										<td colspan="2"><input type="text" placeholder="   Country" class="input-text"  v-model="this.selectedBungalowsLocation.country" style="margin:0; height:20px; font-size:12px; font-family:'poppins-light'" disabled/></td>
										<td colspan="2"><input type="text" placeholder="   City" class="input-text"  v-model="this.selectedBungalowsLocation.city" style="margin:0; height:20px; font-size:12px; font-family:'poppins-light'" disabled/></td>
										<td colspan="1"><input type="text" placeholder="   Street" class="input-text"  v-model="this.selectedBungalowsLocation.street" style="margin:0; height:20px; font-size:12px; font-family:'poppins-light'" disabled/></td>
										<td colspan="1"><input type="text" placeholder="   Street number" class="input-text"  v-model="this.selectedBungalowsLocation.streetNumber" style="margin:0; height:20px; font-size:12px; font-family:'poppins-light'; text-overflow: ellipsis;" disabled/></td>
									</tr>
									<tr> 
										<td colspan="1" style="padding:2.5px; text-align:center; vertical-align:middle;"> <p class="d-inline align-middle" style="font-family: poppins-light; font-size: 12px; text-align: center; color:#fff;"> Unit price: </p> </td>
										<td colspan="1" > <input type="number" placeholder="   Unit price" class="input-text"  v-model="this.selectedBungalow.unitPrice" style="height:20px; width:45px; font-size:12px; font-family:'poppins-light'" disabled/></td>
										<td colspan="1" style=" padding:2.5px; text-align:center; vertical-align:middle; "> <p class="d-inline align-middle" style="font-family: poppins-light; font-size: 12px; text-align: center; color:#fff;"> Maximum capacity: </p> </td>
										<td colspan="1" ><input type="number" placeholder="   Maximum capacity" class="input-text"  v-model="this.selectedBungalow.maxCustomerCapacity" style="height:20px; width:60px;  font-size:12px; font-family:'poppins-light'; text-overflow: ellipsis;" disabled/></td>					
										<td colspan="1" style=" padding:2.5px; text-align: center;vertical-align: middle; "> <p class="d-inline align-middle" style="font-family: poppins-light; font-size: 12px; text-align: center; color:#fff;"> Number of rooms: </p> </td>
										<td colspan="1" ><input type="number" placeholder="   Number of rooms" class="input-text"   v-model="this.selectedBungalow.numberOfRooms" style="height:20px; width:60px; font-size:12px; font-family:'poppins-light'" disabled/></td>
										<td colspan="1" style=" padding:2.5px; text-align: center;vertical-align: middle;"> <p class="d-inline align-middle" style="font-family: poppins-light; font-size: 12px; text-align: center; color:#fff;;"> Number of beds: </p> </td>
										<td colspan="1" ><input type="number" placeholder="   Number of beds" class="input-text"   v-model="this.selectedBungalow.numberOfBeds" style="height:20px; width:60px;  font-size:12px; font-family:'poppins-light'" disabled/></td>
									</tr>
									<tr> 
										<td colspan="3" style="padding:2.5px; text-align:left; vertical-align:middle;"> <p class="d-inline align-middle" style="font-family:poppins-light; font-size: 12px; text-align:center; color:#fff;"> Bungalow's description: </p> </td>
									</tr>
									<tr>
										<td colspan="8"><textarea  name="text" placeholder="   Description" class="input-text-area"  v-model="this.selectedBungalow.description" style="height:40px; font-size:12px; font-family:'poppins-light'" disabled></textarea></td>
									</tr>
									<tr> 
										<td colspan="3"> <h3 class="d-inline align-middle" style="font-family: poppins-light; font-size: 12px; text-align: center; color:#fff;"> Bungalow's additional services: </h3> </td>
									</tr>
									<tr>
										<td colspan="8">
											<label v-for="additionalServ in this.selectedBungalow.additionalServices" class="list-group-item" style="font-family: poppins-light; font-size: 12px; color:#fff; background-color:#1b4560">
												<input class="form-check-input me-1" type="checkbox" value="" v-on:click="clickAdditionalServ(additionalServ)" checked disabled> {{additionalServ.name}}
											</label>
										</td>					
									</tr>
									<tr> 
										<td colspan="3" style="padding:2.5px; text-align:left; vertical-align:middle;"> <p class="d-inline align-middle" style="font-family:poppins-light; font-size: 12px; text-align:center; color:#fff;"> Bungalow's rules of conduct: </p> </td>
									</tr>
									<tr>
										<td colspan="8">
											<textarea name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="this.selectedBungalow.rulesOfConduct" style="margin-top:5px; height:40px; font-size:12px; font-family:'poppins-light'" disabled ></textarea>
										</td>
									</tr>
									<tr> 
										<td colspan="3" style="padding:2.5px; text-align:left; vertical-align:middle;"> <p class="d-inline align-middle" style="font-family:poppins-light; font-size: 12px; text-align:center; color:#fff;"> Bungalow's cancellation policy: </p> </td>
									</tr>
									<tr>
										<td colspan="8">
											<textarea name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="this.selectedBungalow.cancellationPolicy" style="margin-top:5px; height:40px; font-size:12px; font-family:'poppins-light'"  disabled></textarea>
										</td>
									</tr>

									<tr>
										<td colspan="8">
											<div class="overflow-auto card pb-3" style="height: 200px; background-color:#1b4560 ">
												<div v-for="(image, ind) in this.selectedBungalow.images" style="text-align:center;" >
													<img class="ms-3 me-3 mt-3 img-fluid" v-bind:src="setImage(image)" alt="SomePhoto" style="width: 80%" >
												</div>
											</div>
										</td>
									</tr>
									
								</table>
							</div>
						</form>
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
							<div class="container mt-5 mb-5" style="width: 400px">
								<input type="text" id="picker" name="daterange" class="form-control" style="background-color: #1b4560; color: #fff;" >
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
										<tr> <td>{{ timeSlot.startTime }}</td> 
											 <td>{{ timeSlot.endTime }}</td> </tr>
								</tbody>
							</table>
						</div>
                	</div>
					<!-- PAGE 6 - Make quick reservations -->
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
		this.loadData();
    },
	computed:{
		axiosSearchParams() {
			const params = new URLSearchParams();
			params.append('name', this.searchParams.bungalowName);
			params.append('location', this.searchParams.bungalowLocation);
			params.append('type', 'BUNGALOW');
			return params;
		},
	},
	methods:{
		loadData(){
			this.loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
			this.loadOwnersBungalows();
			this.loadAllAdditionalServices();
			this.initMap();
		}
		,
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
						this.dtoAddNewBungalow.imageCount++;
						this.dtoAddNewBungalow.imagesFrontend.push({id: this.imageCount, name:""+this.imageCount, path: URL.createObjectURL(cFile)})
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
		removeImage: function(image, index){
			this.dtoAddNewBungalow.imageCount--;
			this.dtoAddNewBungalow.imagesFrontend.splice(index,1);
			this.dtoAddNewBungalow.image.splice(index,1);
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
			$('input[name="daterange"]').daterangepicker({
				autoUpdateInput: true,
				//timePicker24Hour: true,
				//timePicker: true,
				autoApply: true,
				minDate: today,
				//startDate: moment().startOf('hour'),
				//endDate: moment().startOf('hour').add(32, 'hour'),
				locale: {
				  format: 'YYYY/MM/DD HH:mm',
				  firstDay: 1
				}}
				,
				function(startDate, endDate, label){
					$('#startDate').text(startDate.format('YYYY-MM-DD'))
					$('#endDate').text(endDate.format('YYYY-MM-DD'))
				});
		},
		loadOwnersBungalows(){
			axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");
			axios.get('/api/allMyBungalows').then(response => {
				this.myBungalows = response.data
				console.log(this.myBungalows)
			})
		},
		setImage(image){
			console.log(image.path)
			return 'http://localhost:8080/api/getImage/'+image.name;
		},
		loadAllAdditionalServices(){
			axios.get('api/getAllAdditionalServicesForBungalows').then(response => {
            this.allAdditionalServices = response.data;
        	});
		},

		resetAddNewBungalow(){
			this.dtoAddNewBungalow = {
				offerType: "BUNGALOW",
				offerName: "",
				country: "",
				city: "",
				street: "",
				streetNumber:"",
				longitude: 45.24,
				latitude: 19.82,
				description:"",
				unitPrice: 0 ,
				maxCustomerCapacity:0,
				numberOfRooms: 0,
				numberOfBeds: 0,
				rulesOfConduct:"",
				additionalServices: [],
				cancellationPolicy:"",
				image: [],
				imageCount: 0,
				imagesFrontend: []
			};
		},
		loadBungalowTimeSlots(bungalow){
			//axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");
			axios.get('/api/getTermsByOfferId/' + bungalow.id)
			.then(response => {
				console.log("EEE - ",response)
				this.bungalowTimeSlots = response.data
				this.bungalowTimeSlots.forEach((element,index) => {
					this.bungalowTimeSlots[index].startTime = element.startTime.replace("T", " ");
					this.bungalowTimeSlots[index].endTime = element.endTime.replace("T", " ");
					this.bungalowTimeSlots[index].endTime = element.endTime.substring(0, element.endTime.indexOf("."))
				});
			})
		},
		backButton: function(){
			this.resetAddNewBungalow();
			this.$router.go(this.$router.currentRoute)
		},
		addNewTimeSlotToBungalow(){
			let startDate = moment($('input[name="daterange"]').data('daterangepicker').startDate).toDate();
			let endDate = moment($('input[name="daterange"]').data('daterangepicker').endDate).toDate();
			this.dataToSend_AvailbleTimeSlot.startTime = startDate;
			this.dataToSend_AvailbleTimeSlot.endTime = endDate;
			var isValidNewTimeSlot = !this.multipleDateRangeOverlaps();
			console.log(isValidNewTimeSlot);
			if(!isValidNewTimeSlot){
				Swal.fire('Invalid new time slot!', 'Timeslots cannot intersect!','error')
			}
			else{
				axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");
				axios.post('/api/addNewTermToOffer/' + this.selectedBungalow.id , this.dataToSend_AvailbleTimeSlot)
				.then(response => { 
					if(response.data === true){ 
						Swal.fire('Added available time slot successfully!', 'Hurray!!', 'success')
						this.showUpdateAvailableTerms(this.selectedBungalow) }
					else{ Swal.fire('Ooops, something went wrong!', 'Please, try again later!', 'error') }
				}).catch( Swal.fire('Ooops, something went wrong!', 'Please, try again later!', 'error') )
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
			if(!this.isValidAddNewBungalowDto()){ 
				Swal.fire('Ooops, you must fill the form properly!', 'Please, try again later!', 'error');
				return;
			}
			axios.defaults.headers.common["Authorization"] = localStorage.getItem("user");
			axios.post('/api/addNewBungalow' , this.dtoAddNewBungalow)
				.then(response => { 
					if(response.data === true){ Swal.fire('Added bungalow successfuly!','Hurray!!', 'success'); this.resetAddNewBungalow();}
					else{ Swal.fire('Ooops, something went wrong!', 'Please, try again later!', 'error')}
				}).catch( Swal.fire('Ooops, something went wrong!', 'Please, try again later!', 'error')
			)
			this.loadOwnersBungalows();
		},
		isValidAddNewBungalowDto() {
			for (const property in this.dtoAddNewBungalow) {
				if (property!=='imageCount' && property!=='image' && property!=='imagesFrontend' && !this.dtoAddNewBungalow[property]) {
					return false;
				}
			}
			return true;
		},
		clickAdditionalServ(additionalServ){
			for (var i = 0; i < this.dtoAddNewBungalow.additionalServices.length; i++) {
				if(this.dtoAddNewBungalow.additionalServices[i].id == additionalServ.id){
					//remove
					this.dtoAddNewBungalow.additionalServices.splice(i, 1);
					console.log("removed element from additionalServ with id="+additionalServ.id);
					return;
				}
			}
			//add
			this.dtoAddNewBungalow.additionalServices.push(additionalServ);
			console.log("added element from additionalServ with id="+additionalServ.id);
		},

		showAddNewBungalowForm: function() {
			this.showPage = 1;
		},
		showDetails: function(bungalow){
			this.selectedBungalow.images = [];
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			this.loadData();
			this.showPage = 2;
		},
		showUpdateDetails: function(bungalow){
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			this.loadData();
			this.showPage = 3;
		},
		showDeleteOffer: function(bungalow){
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			this.loadData();
			this.showPage = 4;
		},
		showUpdateAvailableTerms: function(bungalow){
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			this.loadBungalowTimeSlots(this.selectedBungalow);
			this.loadData();
			this.showPage = 5;
			this.initDateRangePicker();
		},
		showMakeQuickReservation: function(bungalow){
			this.selectedBungalow = bungalow;
			this.selectedBungalowsLocation = bungalow.location;
			this.selectedBungalowsOwner = bungalow.user;
			this.loadData();
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
					if (a.offerName > b.offerName) return -1;
					if (a.offerName < b.offerName) return 1;
				 	return 0;
			   }
				return this.myBungalows.sort(compare);
			}
			if(this.sortOption === 'AscAlpha'){
				 function compare(a, b) {
					if (a.offerName < b.offerName) return -1;
					if (a.offerName > b.offerName) return 1;
				 	return 0;
				 }
				 return this.myBungalows.sort(compare);
			 }
			if(this.sortOption === 'AscRating'){
				function compare(a, b) {
					if (a.rating > b.rating) return -1;
					if (a.rating < b.rating) return 1;
					return 0;
			   }
				return this.myBungalows.sort(compare);
			}
			if(this.sortOption === 'DescRating'){
				function compare(a, b) {
					if (a.rating < b.rating) return -1;
					if (a.rating > b.rating) return 1;
					return 0;
				 }
				 return this.myBungalows.sort(compare);
			 }
			if(this.sortOption === 'AscPrice'){
				function compare(a, b) {
					if (a.unitPrice > b.unitPrice) return -1;
					if (a.unitPrice < b.unitPrice) return 1;
				 	return 0;
			   }
				return this.myBungalows.sort(compare);
			}
			if(this.sortOption === 'DescPrice'){
				function compare(a, b) {
					if (a.unitPrice < b.unitPrice) return -1;
					if (a.unitPrice > b.unitPrice) return 1;
					return 0;
				}
				return this.myBungalows.sort(compare);
			}
	  	}

	}
});