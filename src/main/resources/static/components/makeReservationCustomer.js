Vue.component('makeReservation', {
	data: function(){
		return{
			number: "",
            filterDto: {
                offerType: 'BUNGALOW',
                start: '',
                end: ''
            },
            allTerms: {}
		};
	},
template: `
	<div>
        <nav-bar></nav-bar>
        <div v-if="number >= 3">
            <p style="color: white">You have more than 3 penals, you cannot make a reservation</p>
        </div>
        <div style="margin-left: 35%; margin-top: 2.5%">
            <select v-model="filterDto.offerType">
                <option>BUNGALOW</option>
                <option>BOAT</option>
                <option>COURSE</option>
            </select>
            <input v-model="filterDto.start" style="margin-left: 15px;" class="datetime-local" type="datetime-local" id="start-time" name="start-time" />
            <input v-model="filterDto.end" style="margin-left: 15px" class="datetime-local" type="datetime-local" id="start-time" name="end-time" />
            <input :disabled="isComplete" type="button" value="Go!" @click="filterTerms"/>
        <div class="col-md-1 left-div overflow-auto" style="margin-top: 60px; height:60vh">
            <div class="container" v-for="term in allTerms">
               <div class="container align-items-start">
                    <form class="justify-content-center">
                        <table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
                            <tr><td><input type="text" placeholder="   Bungalow's name" class="input-text" v-model="term.offer.offerName"/></td></tr><br>
                            <tr class="d-flex justify-content-evenly">
                            <tr><td> Start date: {{term.startDate}}</td> <td>End date: {{term.endDate}}</td></tr>
                            <td><input type="text" placeholder="   Country" class="input-text"  v-model="term.offer.location.country"/></td>
                            <td><input type="text" placeholder="   City" class="input-text"  v-model="term.offer.location.city"/></td></tr><br>
                            <tr><td><input type="text" placeholder="   Street" class="input-text"  v-model="term.offer.location.street"/></td></tr><br>
                            <tr><td><input type="text" placeholder="   Street number" class="input-text"  v-model="term.offer.location.streetNumber"/></td></tr><br>
                            <tr><td><input type="text" placeholder="   Unit price" class="input-text"  v-model="term.offer.unitPrice"/></td></tr><br>
                            <tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area"  v-model="term.offer.description" ></textarea></tr><br>
                            <tr><td><input type="text" placeholder="   Maximum capacity" class="input-text"  v-model="term.offer.maxCustomerCapacity"/></td></tr><br>
                            <tr><textarea rowspan="3"name="text" placeholder="   Additional services (Wi-fi, Parking, etc.)" class="input-text-area"  v-model="term.offer.additionalServices" ></textarea></tr><br>
                            <tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="term.offer.rulesOfConduct" ></textarea></tr><br>
                            <tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="term.offer.cancellationPolicy" ></textarea></tr><br>
                        </table>
                    </form>
                 </div>
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