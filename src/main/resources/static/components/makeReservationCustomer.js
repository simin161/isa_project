Vue.component('makeReservation', {
	data: function(){
		return{
			number: "",
            filterDto: {
                offerType: 'BUNGALOW',
                start: '',
                end: ''
            }
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
                 .this((response) => console.log(response.data))
        }
    },
    mounted(){
     axios.defaults.headers.common["Authorization"] =
                             localStorage.getItem("user");
        axios.get("/api/getPenalForUser")
            .then(response => this.number = response.data)
    }
});