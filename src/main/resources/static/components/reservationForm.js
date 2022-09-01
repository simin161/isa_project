Vue.component('reservationForm', {
	data: function(){
		return{
			term: {
			    id: "",
			    offer: {
			        id: "",
			        offerName: "",
			        location: {
			            country: "",
			            city: "",
			            street: "",
			            streetNumber: ""
			        },
			        unitPrice: "",
			        rating: "",
			        maxCustomerCapacity: "",
			        rulesOfConduct: "",
			        additionalServices: [],
			        cancellationPolicy: ""
			    },
			    startDate: "",
			    endDate: ""
			},
            dto: {
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
        <div>
            <form class="justify-content-center">
               <table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
                   <tr><td><input type="text" placeholder="   Bungalow's name" class="input-text" v-model="term.offer.offerName"/></td></tr><br>
                   <tr class="d-flex justify-content-evenly">
                        <td><input type="text" placeholder="   Country" class="input-text"  v-model="term.offer.location.country"/></td>
                        <td><input type="text" placeholder="   City" class="input-text"  v-model="term.offer.location.city"/></td></tr><br>
                   <tr><td><input type="text" placeholder="   Street" class="input-text"  v-model="term.offer.location.street"/></td></tr><br>
                   <tr><td><input type="text" placeholder="   Street number" class="input-text"  v-model="term.offer.location.streetNumber"/></td></tr><br>
                   <tr><td><input type="text" placeholder="   Unit price" class="input-text"  v-model="term.offer.unitPrice"/></td></tr><br>
                   <tr><textarea rowspan="3" name="text" placeholder="   Description" class="input-text-area"  v-model="term.offer.description" ></textarea></tr><br>
                   <tr><td><input type="text" placeholder="   Maximum capacity" class="input-text"  v-model="term.offer.maxCustomerCapacity"/></td></tr><br>
                   <tr><textarea rowspan="3" name="text" placeholder="   Rules of Conduct" class="input-text-area"  v-model="term.offer.rulesOfConduct" ></textarea></tr><br>
                   <tr><textarea rowspan="3" name="text" placeholder="   Cancellation policy" class="input-text-area"  v-model="term.offer.cancellationPolicy" ></textarea></tr><br>
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
                   <tr><td><input type="button" value="Book!" @click="makeReservation"/></td></tr>
               </table>
            </form>
        </div>
    </div>
`,
    methods: {
        makeReservation : function(){
            this.dto.termId = this.term.id;
            this.dto.offerId = this.term.offer.id;
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
        }
    },
    mounted(){
     const id = window.location.hash.split('/')[2];
     axios.defaults.headers.common["Authorization"] =
                            localStorage.getItem("user");
     axios.post("/api/getTermById", {"id" : id})
          .then(response => this.term = response.data)
    }
});