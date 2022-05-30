Vue.component('makeReservation', {
	data: function(){
		return{
			number: "",
			show: false
		};
	},
template: `
	<div>
        <nav-bar></nav-bar>
        <div v-if="number >= 3">
            <p style="color: white">You have more than 3 penals, you cannot make a reservation</p>
        </div>
        <div v-else>
            <select>
                <option>BUNGALOW</option>
                <option>BOAT</option>
                <option>COURSE</option>
            </select>
            <input class="datetime-local" type="datetime-local" id="start-time" name="start-time" />
            <input class="datetime-local" type="datetime-local" id="start-time" name="end-time" />
		<div>
    </div>
`,
    methods: {

    },
    mounted(){
     axios.defaults.headers.common["Authorization"] =
                             localStorage.getItem("user");
        axios.get("/api/getPenalForUser")
            .then(response => this.number = response.data)
    }
});