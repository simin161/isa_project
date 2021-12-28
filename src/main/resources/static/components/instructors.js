Vue.component('instructors', {
	data: function(){
		return{
			instructors: null
		};
	},
template: `	
			<div>
			<nav-bar></nav-bar>
			<div class="div" v-if="instructors != null">
				<div class="col-md-4 lists" v-for="instructor in instructors">
						<p>{{instructor}}</p>
				</div>
			</div>
			<div v-if="instructors === null">
				<p>Nothing to show</p>
			</div>
            </div>
          `
          ,
          mounted(){
            axios.get("/api/allInstructors")
                 .then(response => (this.instructors = response.data))
          }

});
