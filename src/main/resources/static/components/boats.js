Vue.component('boats', {
	data: function(){
		return{
			boats: null
		};
	}
	,
	template: `
		<div>
		<nav-bar></nav-bar>

			<div class="div" v-if="boats != null">
				<div class="col-md-4 lists" v-for="boat in boats">
						<p>{{boat}}</p>
				</div>
			</div>
			<div v-if="boats === null">
				<p>Nothing to show</p>
			</div>
		</div>
		`
	,
	mounted(){
	    axios.get("/api/allBoats")
	         .then(response => (this.boats = response.data))
	}
});
