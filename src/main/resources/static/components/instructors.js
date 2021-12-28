Vue.component('instructors', {
	data: function(){
		return{
			instructors: null
		};
	},
template: `	
			<div>
			<nav-bar></nav-bar>
			<br>
			<div class="div" v-if="instructors != ''">
				<div class="col-md-4 lists" v-for="instructor in instructors">
						<p>Instructor: {{instructor.firstName}} {{instructor.lastName}}</p>
						<p>{{instructor.biography}}</p>
				</div>
			</div>
			<div v-if="instructors === ''">
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
