Vue.component('nav-bar', {
	data: function(){
		return{
			loggedUser: type: Object, default: () => ({})}
	},
template: `	
			<div>
			<header class="container-fluid">
			<div class="row">
				<div class="container">
					<div class="row" v-if="loggedUser === null">
						<a class="logo" href="#/"><h1 class="col-sm-4">FishyFinds</h1></a>
						<nav class="col-sm-8">
							<a href="#/signIn">Sign in</a>
							<a href="#/register">Register</a>
							<a href="">menu 3</a>
							<a href="">menu 4</a>
						</nav>
					</div>
					<div class="row" v-if="loggedUser != null">
                        <a class="logo" href="#/"><h1 class="col-sm-4">FishyFinds</h1></a>
						<nav class="col-sm-8">
							<a href="#/signIn">Sign out</a>
							<a href="">menu 2</a>
							<a href="">menu 3</a>
							<a href="">menu 4</a>
						</nav>
					</div>
				</div>
			</div>
		    </header>

		<div class="container-fluid main-image hidden-xs" >
			<div class="row">
				<div class="container"> 
					<div class="row">
						<div class="col-xs-12"> 
							<p class="title"> FishyFinds </p>
							<p class="slogan"> Plan your next trip with confidence</p>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
`,
    mounted(){
    axios.get("/api/getLoggedUser")
    		.then(response => (this.loggedUser = response.data))
    }
});