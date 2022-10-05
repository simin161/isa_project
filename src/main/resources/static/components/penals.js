Vue.component('penals', {
	data: function(){
		return{
			number: "",
			show: false
		};
	},
template: `
	<div>
        <nav-bar></nav-bar>
        <div>
            <h5 class="card-title text-start mt-3" style="color: #881A02; font-family: poppins-bold; font-size: 25px; margin-left: 30%">If you have more than 3 penalties, you cannot make a reservation!</h5>
            <h6 class="card-title text-start mt-3" style="color: white;  font-family: poppins-bold; font-size: 20px; margin-left: 47%">You have{{number.number}} penalties</h6>
            <h6 class="card-title text-start mt-3" style="color: white;  font-family: poppins-bold; font-size: 15px; margin-left: 43%">Do not worry! Penalties are deleted every month!</h6>
        </div>
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