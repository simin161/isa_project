Vue.component('instructor-my-courses', {
	data: function(){
		return{	
			loggedUser: null,
		}
	},
template: `	
		<div>
			<nav-bar></nav-bar>
			<br>
			<br>
            <div class="my-courses" v-if="loggedUser.userType == 'INSTRUCTOR'">
				<h1> MY-COURSES-WORKS </h1>
			</div>
		</div>
		`
	,
    mounted(){
        axios.get("/api/authenticateUser")
            .then(response => this.loggedUser = response.data)
        console.log(this.loggedUser);
    }

});