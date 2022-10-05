Vue.component('admin-reg-req-complaints', {

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
                    <img src="images/register-admin.jpg">
                    <div class="info">
                        <h1>Register a new admin!</h1>
                        <p>Here you can register a new administrator of the Fishy Finds system.</p>
                        <a class="btn btn-light" href="#/admin-register" role="button">Show more</a>
                    </div>
                </div>

                <div class="card">
                    <img src="images/admin-user-requests.jpg">
                    <div class="info">
                        <h1>User requests</h1>
                        <p>View and manage various user requests.</p>
                        <a class="btn btn-light" href="#/admin-user-requests" role="button">Show more</a>
                    </div>
                </div>

                <div class="card">
                    <img src="images/admin-user-complaints.jpg">
                    <div class="info">
                        <h1>User complaints</h1>
                        <p>View and manage various user complaints and account deletion requests.</p>
                        <a class="btn btn-light" href="#/admin-user-complaints" role="button">Show more</a>
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