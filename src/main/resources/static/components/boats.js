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

			<div class="div" v-if="boats != ''">
				<div class="col-md-4 lists" style="margin-left:40%" v-for="boat in boats">
						<p><i>{{boat.offerName}}</i></p>
						<p>Address: {{boat.location.address}}</p>
						<p><i>{{boat.description}}</i></p>
						<p>Rating: {{boat.rating}}</p>
				</div>
			</div>
			<div v-if="boats === ''">
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
