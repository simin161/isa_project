Vue.component('bungalows', {
	data: function(){
		return{
			bungalows: ['1', '2']
		};
	},
template: `	
			<div>
			<nav-bar></nav-bar>
			<div class="div" v-if="bungalows != null">
				<div class="col-md-4 lists" v-for="bungalow in bungalows">
						<p>{{bungalow}}</p>
				</div>
			</div>
			<div v-if="bungalows === null">
				<p>Nothing to show</p>
			</div>
            </div>
`
});
