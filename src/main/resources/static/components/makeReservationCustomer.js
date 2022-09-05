Vue.component('makeReservation', {
	data: function(){
		return{
			number: "",
            filterDto: {
                offerType: 'BUNGALOW',
                start: '',
                duration: ''
            },
            allTerms: {},
            dto : {
                termId : "",
                offerId : "",
                startDate : "",
                duration : "",
                numberOfPeople: "",
                additionalServices: ""
            },
            choosenOfferTerm: null,
            showPage: 0
		};
	},
template: `
	<div>
        <nav-bar></nav-bar>
        <div style="margin-left: 29%; margin-top: 2.5%">
            <select  v-model="filterDto.offerType">
                <option>BUNGALOW</option>
                <option>BOAT</option>
                <option>COURSE</option>
            </select>
            <input v-model="filterDto.start" style="margin-left: 15px;" class="datetime-local" type="datetime-local" id="start-time" name="start-time" />
            <input type="number" min="1" v-model="filterDto.duration" onKeyDown="return false" style="margin-left: 15px" placeholder="Duration" />
            <input type="number" min="1" v-model="filterDto.numberOfPeople" onKeyDown="return false" style="margin-left: 15px" placeholder="Number of people" />
            <input type="button" value="Search!" @click="filterTerms"/>
        </div>
        <div class="col-md-1 left-div overflow-auto" style="margin-top: 60px; margin-left: 22%; height:60vh" v-show="showPage == 0">
            <div class="container mt-5">
    			<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="b in allTerms">
    				<div class="row g-0">
    					<div class="col-md-4" style="text-align:center;">
    						<img :src="b.path" class="img-fluid rounded" style="margin:0 auto;"alt="James Bond's Bungalow">
    					</div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{b.offer.offerName}}</h5>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{b.offer.description}}</p>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{b.offer.location.street}} {{b.offer.location.streetNumber}} {{b.offer.location.city}} {{b.offer.location.country}}</p>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{b.offer.description}}</p>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Unit price: {{b.offer.unitPrice}}</p>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{b.offer.rating}}</p>
                                <button class="float-end btn btn-light"  style="margin-left: 5px;">Show more</button>
                                <button class="float-end btn btn-light" @click="showMakeReservation(b)" style="margin-left: 5px;">Make reservation</button>
                            </div>
                        </div>
    			    </div>
    			</div>
    		</div>
    	</div>
        <div class="col-md-1 left-div overflow-auto" style="margin-top: 60px; margin-left: 22%; height:60vh" v-show="showPage == 1">
            <div class="container mt-5">
    			<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="b in allTerms">
    				<div class="row g-0">
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">Make reservation form</h5>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Start: {{filterDto.start}}</p>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Duration: {{filterDto.duration}}</p>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Number of people: {{filterDto.numberOfPeople}}</p>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Unit price: {{choosenOfferTerm.offer.unitPrice}}</p>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Total price: {{choosenOfferTerm.offer.unitPrice * filterDto.numberOfPeople}}</p>
                                <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Choose additional services: </p>
                                <div v-for="a in choosenOfferTerm.offer.additionalServices">
                                    <input type="checkbox" name="addService" :id="a.name"/>
                                    <label :for="a.name"> {{a.name}}</label><br>
                                </div>
                                <button class="float-end btn btn-light" @click="makeReservation" style="margin-left: 5px;">Book!</button>
                            </div>
                        </div>
    			    </div>
    			</div>
    		</div>
    	<div>
    </div>
`,
    methods: {
        showMakeReservation : function(term){
            this.choosenOfferTerm = term;
            this.showPage = 1;
        },
        makeReservation : function(){
            this.dto.termId = this.choosenOfferTerm.id;
            this.dto.offerId = this.choosenOfferTerm.offer.id;
            this.dto.duration = this.filterDto.duration;
            this.dto.startDate = this.filterDto.start;
            this.dto.numberOfPeople = this.filterDto.numberOfPeople;

            var checkboxes = document.getElementsByName('addService');
              var checkboxesChecked = "";
              // loop over them all
              for (var i=0; i<checkboxes.length; i++) {
                 // And stick the checked ones onto an array...
                 if (checkboxes[i].checked) {
                    checkboxesChecked = checkboxesChecked + " " + checkboxes[i].id;
                 }
              }
            this.dto.additionalServices = checkboxesChecked;
            axios.defaults.headers.common["Authorization"] =
                                         localStorage.getItem("user");
            axios.post("/api/makeReservation", this.dto)
                 .then((response) => {
                    if(response.data){
                        Swal.fire('Reservation made successfuly!',
                                  '',
                                 'success')
                    }else{
                        Swal.fire('Ooops, something went wrong!',
                                  'Please, try again later.',
                                  'failure')
                    }
                 })
        },
        filterTerms : function(){
            if(/\S/.test(this.filterDto.start) && /\S/.test(this.filterDto.duration) && /\S/.test(this.filterDto.numberOfPeople)){
                let start = new Date(this.filterDto.start);
                let today = new Date();
                if(start >= today){
                    axios.post("/api/filterAvailableTerms", this.filterDto)
                         .then((response) =>{
                            this.allTerms = response.data;
                            this.choosenOfferTerm = this.allTerms[0];
                         })
                }else{
                    Swal.fire('Date cannot be in the past!',
                              '',
                              'error')
                }
            }else{
                    Swal.fire('Please, fill all fields!',
                              '',
                              'error')
            }
        }
    }
});