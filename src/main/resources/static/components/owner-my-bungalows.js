Vue.component('owner-my-bungalows', {
	data: function(){
		return{	
			loggedUser: null,
			showPage: 0,
			bungalows:[],
			dtoAddNewBungalow: {
				offerType: "BUNGALOW",
				offerName: "",
				userID: "",

				country: "",
				city: "",
				street: "",
				streetNumber:"",
				longitude:"",
				latitude:"",

				description:"",
				unitPrice:"",
				maxCustomerCapacity:"",

				maxCustomerCapacity:"",
				rulesOfConduct:"",
				additionalServices:"",
				cancellationPolicy:"",
			},
			item: null,
			bungalows:[]
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
            						<tr><td colspan="1"><input v-model="searchParams.bungalowName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Bungalow's name" /></td>
            							<td colspan="1"><input v-model="searchParams.bungalowLocation" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'" placeholder="Bungalow's location"/></td>
            							<td rowspan="2"><input @click="search" class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Search" /></td>
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
            							    <td><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Sort" @click="sortedArray"/></td>
            							</tr>
            						</tr>
            					</table>
            				</form>
            				<div class="container mt-5">
            					<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="bungalow in bungalows">
            						<div class="row g-0">
            							<div class="col-md-4" style="text-align:center;">
            								<img src="../images/bungalow-images/bungalow-1-out-1.jpg" class="img-fluid rounded" style="margin:0 auto;"alt="James Bond's Bungalow">
            							</div>
            							<div class="col-md-8">
            								<div class="card-body">
            									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{bungalow.offerName}}</h5>
            									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{bungalow.description}}</p>
            									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Unit price: {{bungalow.unitPrice}}</p>
            									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{bungalow.rating}}</p>
            									<button class="float-end btn btn-light" @click="showMore(bungalow)">Show more</button>
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
            						<p class="title-text-bold" style="margin-top:10px; text-align:center;"> Show a new Bungalow </p>
            						<form class="justify-content-center">
            							<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
            								<tr><td><input type="text" placeholder="   Bungalow's name" class="input-text" v-model="bungalowToShow.offerName"/></td></tr><br>
            								<tr class="d-flex justify-content-evenly">
            									<td><input type="text" placeholder="   Country" class="input-text"  v-model="bungalowToShow.location.country"/></td>
            									<td><input type="text" placeholder="   City" class="input-text"  v-model="bungalowToShow.location.city"/></td></tr><br>
            								<tr><td><input type="text" placeholder="   Street" class="input-text"  v-model="bungalowToShow.location.street"/></td></tr><br>
            								<tr><td><input type="text" placeholder="   Street number" class="input-text"  v-model="bungalowToShow.location.streetNumber"/></td></tr><br>
            								<tr><td><input type="text" placeholder="   Unit price" class="input-text"  v-model="bungalowToShow.unitPrice"/></td></tr><br>
            								<tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area"  v-model="bungalowToShow.description" ></textarea></tr><br>
            								<tr><td><input type="text" placeholder="   Maximum capacity" class="input-text"  v-model="bungalowToShow.maxCustomerCapacity"/></td></tr><br>
            								<tr><textarea rowspan="3"name="text" placeholder="   Additional services (Wi-fi, Parking, etc.)" class="input-text-area"  v-model="bungalowToShow.additionalServices" ></textarea></tr><br>
            								<tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="bungalowToShow.rulesOfConduct" ></textarea></tr><br>
            								<tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="bungalowToShow.cancellationPolicy" ></textarea></tr><br>
            							</table>
            						</form>
            					</div>
                           	</div>
                       	</div>
            		</div>
            	</div>
		`
	,
    mounted(){

        axios.get("/api/authenticateUser")
            .then(response => {
				this.loggedUser = response.data;
				this.dtoBungalow.userID = this.loggedUser.id;

				axios.get("/api/allOwnerBungalows")
				    .then(response => {

				        this.bungalows = response.data;

				    })

			})
        console.log(this.loggedUser);

    },
	computed:{

		isAddNewBungalowFormFilled: function() {
			correctOfferName = /\S/.test(this.dtoAddNewBungalow.offerName) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.dtoAddNewBungalow.offerName);
			correctMaxCustomerCapacity = /\S/.test(this.dtoAddNewBungalow.maxCustomerCapacity) && /^\d+$/.test(this.dtoAddNewBungalow.maxCustomerCapacity);
			correctUnitPrice = /\S/.test(this.dtoAddNewBungalow.unitPrice) && /^\d+$/.test(this.dtoAddNewBungalow.unitPrice);
			flag = correctOfferName && correctMaxCustomerCapacity && correctUnitPrice &&
			/\S/.test(this.dtoAddNewBungalow.country) &&
			/\S/.test(this.dtoAddNewBungalow.city) &&
			/\S/.test(this.dtoAddNewBungalow.street) &&
			/\S/.test(this.dtoAddNewBungalow.streetNumber) &&
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

		addNewBungalow: function(){
			axios.post('/api/addNewBungalow', this.dtoAddNewBungalow)
				.then(response => console.log(response.data))
		}
            
		,
		showAddNewBungalowForm: function(){
			this.showPage = 1;

		},

		selectBungalow: function(){

		    axios.post("/api/ownerSelectBungalow", item)
            				.then(response =>(router.push("my-bungalow-page")))

		}

	}

});