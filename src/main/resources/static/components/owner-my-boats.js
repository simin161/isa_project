Vue.component('owner-my-boats', {
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
            <div class="my-boats" v-if="loggedUser.userType == 'BOAT_OWNER'">
				<h1> MY-BOATS-WORKS </h1>
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