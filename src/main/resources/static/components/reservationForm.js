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
                duration : "",
                numberOfPeople: "",
                additionalServices: ""
            }
		};
	},
template: `
	<div>
        <nav-bar></nav-bar>
        <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh">
            <form class="justify-content-center">
                <p class="title-text-bold" style="margin-top:10px; text-align:center;"> {{term.offer.offerName}} </p>
                <p class="title-text-bold" style="margin-top:10px; text-align:center;">Available from: {{term.startDate}} to: {{term.endDate}} </p>
                <p class="title-text-bold" style="margin-top:10px; text-align:center;">Unit price: {{term.offer.unitPrice}} </p>
                <p class="title-text-bold" style="margin-top:10px; text-align:center;">Customer capacity: {{term.offer.maxCustomerCapacity}} </p>
                <table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;">
                   <tr>
                       <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Start date: </p></td>
                       <td><input class="input-text" type="datetime-local" v-model="dto.startDate" /></td>
                   </tr>
                   <tr>
                       <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Duration: </p></td>
                       <td><input class="input-text" type="number" min="1" v-model="dto.duration"/></td>
                   </tr>
                   <tr>
                      <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Number of people: </p></td>
                      <td><input class="input-text" type="number" min="1" onKeyDown="return false" v-model="dto.numberOfPeople" :max="term.offer.maxCustomerCapacity"/></td>
                   </tr>
                   <td v-for="a in term.offer.additionalServices">
                       <input type="checkbox" style="color: white" v-model="a.id" checked />
                       <label style="color: white">{{a.name}}</label>
                   </td>
                   <tr>
                       <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Total price: {{dto.numberOfPeople * term.offer.unitPrice}}</p></td>
                   </tr>
                   <tr><td><input type="button"  class="confirm-profile" value="Book!" @click="makeReservation"/></td></tr>
               </table>
            </form>
        </div>
    </div>
`,
    methods: {
        makeReservation : function(){
            if(/\S/.test(this.dto.start) && /\S/.test(this.dto.duration) && /\S/.test(this.dto.numberOfPeople)){
                let start = new Date(this.dto.startDate);
                let startTerm = new Date(this.term.startDate);
                let endTerm = new Date(this.term.endDate);
                let newDate = moment(start, "DD-MM-YYYY").add(this.dto.duration, 'days');
                if(start >= startTerm && start <= endTerm && newDate._d >= startTerm && newDate <= endTerm){
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
                                           'error')
                             }
                         })
                }else{
                Swal.fire('Please, check the dates!',
                          '',
                          'error')
                }
            }else{
                Swal.fire('Please, fill all fields!',
                          '',
                          'error')
            }
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