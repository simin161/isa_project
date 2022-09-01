Vue.component('makeReservation', {
	data: function(){
		return{
			number: "",
            filterDto: {
                offerType: 'BUNGALOW',
                start: '',
                end: ''
            },
            allTerms: {},
            dto : {
                termId : "",
                offerId : "",
                startDate : "",
                endDate : "",
                numberOfPeople: ""
            }
		};
	},
template: `
	<div>
        <nav-bar></nav-bar>
        <div style="margin-left: 35%; margin-top: 2.5%">
            <select v-model="filterDto.offerType">
                <option>BUNGALOW</option>
                <option>BOAT</option>
                <option>COURSE</option>
            </select>
            <input v-model="filterDto.start" style="margin-left: 15px;" class="datetime-local" type="datetime-local" id="start-time" name="start-time" />
            <input v-model="filterDto.end" style="margin-left: 15px" class="datetime-local" type="datetime-local" id="start-time" name="end-time" />
            <input :disabled="isComplete" type="button" value="Go!" @click="filterTerms"/>
        </div>
        <div class="col-md-1 left-div overflow-auto" style="margin-top: 60px; height:60vh">
            <div class="container" v-for="term in allTerms">
               <div class="container align-items-start" style="border-bottom: solid thick white">
                    <form class="justify-content-center">
                        <table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
                            <tr><td><input disabled style="color:white" type="text" placeholder="   Bungalow's name" class="input-text" v-model="term.offer.offerName"/></td></tr><br>
                            <tr class="d-flex justify-content-evenly">
                            <tr><td style="color: white"> Start date: {{term.startTime}}</td> <td style="color: white">End date: {{term.endTime}}</td></tr>
                            <td><input disabled type="text" style="color:white" placeholder="   Country" class="input-text"  v-model="term.offer.location.country"/></td>
                            <td><input disabled type="text" style="color:white" placeholder="   City" class="input-text"  v-model="term.offer.location.city"/></td></tr><br>
                            <tr><td><input disabled type="text" style="color:white" placeholder="   Street" class="input-text"  v-model="term.offer.location.street"/></td></tr><br>
                            <tr><td><input disabled type="text" style="color:white" placeholder="   Street number" class="input-text"  v-model="term.offer.location.streetNumber"/></td></tr><br>
                            <tr><td><input disabled type="text" style="color:white" placeholder="   Unit price" class="input-text"  v-model="term.offer.unitPrice"/></td></tr><br>
                            <tr><textarea disabled rowspan="3" style="color:white" name="text" placeholder="   Description" class="input-text-area"  v-model="term.offer.description" ></textarea></tr><br>
                            <tr><td><input disabled type="text" style="color:white" placeholder="   Maximum capacity" class="input-text"  v-model="term.offer.maxCustomerCapacity"/></td></tr><br>
                            <tr><textarea disabled rowspan="3" style="color:white" name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="term.offer.rulesOfConduct" ></textarea></tr><br>
                            <tr><textarea disabled rowspan="3" style="color:white" name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="term.offer.cancellationPolicy" ></textarea></tr><br>
                            <tr>
                                <td v-for="a in term.offer.additionalServices">
                                    <input type="checkbox" style="color: white" v-model="a.id" checked />
                                    <label>{{a.name}}</label>
                                </td>
                            </tr><br>
                            <tr>
                                <td><p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Number of people:</p></td>
                                <td><input type="number" min="1" :max="term.offer.maxCustomerCapacity" v-model="dto.numberOfPeople"/></td>
                            </tr>
                            <tr>
                                <td><p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Start date: </p></td>
                                <td><input class="datetime-local" type="datetime-local" v-model="dto.startDate" :min="term.startDate" /></td>
                            </tr>
                            <tr>
                                <td><p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">End date: </p></td>
                                <td><input class="datetime-local" type="datetime-local" :max="dto.endDate" v-model="dto.endDate"/></td>
                            </tr>
                            <tr>
                                <td><p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Total price: {{dto.numberOfPeople * term.offer.unitPrice}}</p></td>
                            </tr>
                            <tr><td><input type="button" value="Book!" @click="makeReservation(term)"/></td></tr>

                        </table>
                    </form>
               </div>
          	</div>>
		<div>
    </div>
`,
    computed: {
        isComplete(){
            return !(/\S/.test(this.filterDto.offerType) && /\S/.test(this.filterDto.start) && /\S/.test(this.filterDto.end));
        }
    },
    methods: {
        makeReservation : function(term){
            this.dto.termId = term.id;
            this.dto.offerId = term.offer.id;
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
            axios.post("/api/filterAvailableTerms", this.filterDto)
                 .then((response) =>
                    this.allTerms = response.data
                 )
        }
    },
    mounted(){
     axios.defaults.headers.common["Authorization"] =
                             localStorage.getItem("user");
        axios.get("/api/getPenalForUser")
            .then(response => this.number = response.data)
    }
});