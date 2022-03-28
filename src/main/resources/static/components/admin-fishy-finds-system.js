Vue.component('admin-fishy-finds-system', {

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
                    <img src="images/admin-users-offers.jpg">
                    <div class="info">
                        <h1>Users and Offers</h1>
                        <p>View and manage all users and their offers!</p>
                        <a class="btn btn-light" href="#/admin-users-offers" role="button">Show more</a>
                    </div>
                </div>

                <div class="card">
                    <img src="images/admin-budget.jpg">
                    <div class="info">
                        <h1>Budget</h1>
                        <p>View and manage budget. </p>
                        <a class="btn btn-light" href="#/admin-budget" role="button">Show more</a>
                    </div>
                </div>

                <div class="card">
                    <img src="images/admin-loyalty-program.jpg">
                    <div class="info">
                        <h1>Loyalty Program</h1>
                        <p>View and manage loyalty program for users.</p>
                        <a class="btn btn-light" href="#/admin-loyalty-program" role="button">Show more</a>
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