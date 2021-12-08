Vue.component('courses', {
	data: function(){
		return{
			courses: ['1', '2']
		};
	},
template: `	
			<div>
			<nav-bar></nav-bar>
			<div class="div" v-if="courses != null">
				<div class="col-md-4 lists" v-for="course in courses">
						<p>{{course}}</p>
				</div>
			</div>
			<div v-if="courses === null">
				<p>Nothing to show</p>
			</div>
            </div>
`
});
