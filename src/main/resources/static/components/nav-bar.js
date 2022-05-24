Vue.component('nav-bar', {
	data: function(){
		return{
			loggedUser: {
                userType:''
            },
			show: false
		};
	},
template: `	
		<div>
			<header class="container-fluid">
                <div class="row">   
                    <div class="container">

                        <div v-if="loggedUser.userType == ''">
                            <div class="row">
                                <a class="col-sm-4 text-center" href="#/">
                                    <div class="logo">
                                        <img class="d-inline align-middle" src="images/fishy-finds-logo.png" style="height: 36px; width:auto; margin: auto;">
                                        <h1 class="d-inline align-middle" style="font-family: poppins-bold; font-size: 28px; text-align: center;">FishyFinds</h1>
                                    </div>
                                </a>
                                <nav class="col-sm-8">
                                    <a href="#/register" style="font-family: poppins-bold; font-size: 24px;"> Register </a>
                                    <a href="#/signIn" style="font-family: poppins-bold; font-size: 24px;"> Sign in </a>
                                </nav>
                            </div>
                        </div>
                        <div v-else>
                            <div class="row">
                                <a class="col-sm-4 text-center" href="#/">
                                    <div class="logo">
                                        <img class="d-inline align-middle" src="images/fishy-finds-logo.png" style="height: 36px; width:auto; margin: auto;">
                                        <h1 class="d-inline align-middle" style="font-family: poppins-bold; font-size: 28px; text-align: center;">FishyFinds</h1>
                                    </div>
                                </a>
                            <nav class="col-sm-8">
                                <div v-show="loggedUser.userType == 'CUSTOMER'">
                                    <a href="#/penals" style="font-family: poppins-bold; font-size: 24px;">Penals</a>
                                    <a href="#/following" style="font-family: poppins-bold; font-size: 24px;">Following</a>
                                    <span class="dropdown">
                                    <button class="dropdown-button">Reservations</button>
                                        <div class="dropdown-content">
                                            <a href="#/bungalowReservationHistory">Bungalows</a>
                                            <a href="#/boatReservationHistory">Boats</a>
                                            <a href="#/courseReservationHistory">Instructors</a>
                                            <a href="#/">Upcoming</a>
                                        </div>
                                    </span>
                                    <a href="#/account" style="font-family: poppins-bold; font-size: 24px;">My Account</a>
                                    <a href="#/" @click="signOut" style="font-family: poppins-bold; font-size: 24px;">Sign out</a>
                                </div>
                            </nav>
                        </div>
                    </div>

                    </div>
                </div>
		    </header>

    </div>
`,
    methods: {
        signOut: function(){
            event.preventDefault();
            window.localStorage.setItem("user", "");
            router.push('/signIn');
            console.log(this.loggedUser)
        }
    },
    mounted(){
     axios.defaults.headers.common["Authorization"] =
                             localStorage.getItem("user");
        axios.get("/api/authenticateUser")
            .then(response => this.loggedUser = response.data)
            .catch(error => this.loggedUser.userType = "")
        console.log(this.loggedUser);
    }
});