Vue.component('bungalows', {
	data: function(){
		return{
			bungalows: null
		};
	},
template: `	
			<div>
			<nav-bar></nav-bar>
			<br>
			<br>
			<div class="div" style="margin-left: 40%" v-if="bungalows != ''">
				<div class="col-md-4 lists" v-for="bungalow in bungalows">
						<p><i>{{bungalow.offerName}}</i></p>
						<p>Address: {{bungalow.location.address}}</p>
						<p><i>{{bungalow.description}}</i></p>
						<p>Rating: {{bungalow.rating}}</p>
				</div>
			</div>
			<div v-if="bungalows === ''">
				<p>Nothing to show</p>
			</div>
            </div>
          `
          ,
          mounted(){
            axios.get("/api/allBungalows")
                 .then(response => (this.bungalows = response.data))
          }
});
