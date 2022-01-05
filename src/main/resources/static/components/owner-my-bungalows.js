Vue.component('owner-my-bungalows', {
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
            <div class="my-bungalows" v-if="loggedUser.userType == 'BUNGALOW_OWNER'">
				<h1> MY-BUNGALOWS-WORKS </h1>
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