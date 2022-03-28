Vue.component('admin-users-offers', {

    data: function(){
        return{
            loggedUser: null,
        }
    },

    template: `

        <div class="homepage">
            <nav-bar></nav-bar>

            <div class="welcome-text container-fluid justify-content-center">

            </div>

            <div class="wrapper">
                <div class="card">
                    <img src="images/admin-users.jpg">
                    <div class="info">
                        <h1>Users</h1>
                        <p>View and manage all users.</p>
                        <a class="btn btn-light" href="#/admin-users" role="button">Show more</a>
                    </div>
                </div>

                <div class="card">
                    <img src="images/admin-offers.jpg">
                    <div class="info">
                        <h1>Offers</h1>
                        <p>View and manage all offers. </p>
                        <a class="btn btn-light" href="#/admin-offers" role="button">Show more</a>
                    </div>
                </div>
            </div>
        </div>

    `
    ,

    mounted(){

        axios.defaults.headers.common["Authorization"] =
                                     localStorage.getItem("user");
        axios.get("/api/authenticateUser")
            .then(response => this.loggedUser = response.data)
        console.log(this.loggedUser);

    }

})