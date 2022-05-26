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
            <p style="color: white">Number of penals: {{number.number}}</p>
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