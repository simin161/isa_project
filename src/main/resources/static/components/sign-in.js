Vue.component('sign-in', {
	data: function(){
		return{
		    user: {
		        email : "",
		        password : ""
		    },
		    backgroundColor : "seagreen",
            cursorStyle : "default"
		}
	},
template: `	
		<div>
            <nav-bar></nav-bar>
            <div class="container">
                <div class="row">
                    <div class="d-flex justify-content-evenly align-items-center reg-form">
                        <img  src="images/fishy-finds-logo.png" style="height: 36px; width:auto; margin-top:45px;">
                    </div>
                </div>
                <div class="row">
                    <div class="d-flex justify-content-evenly align-items-center reg-form"> 
                        <h1 class="d-inline align-middle" style="font-family: poppins-bold; font-size: 20px; text-align: center; color:#fff;">Hello Again!</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="d-flex justify-content-evenly align-items-center reg-form"> 
                        <h3 class="d-inline align-middle" style="font-family: poppins-light; font-size: 12px; text-align: center; color:#fff;"> Welcome back, you've <br> been missed!</h3>
                    </div>
                </div>
                <div class="row">
                    <form class="d-flex justify-content-evenly align-items-center reg-form">    
                        <table style="margin-top: 10px;">
                            <tr>
                                <td><input type="text" placeholder="   E-mail" class="input-text" v-model="user.email"/></td>
                            </tr>
                            <br>
                            <tr>
                                <td><input type="password" placeholder="   Password" class="input-text" v-model="user.password"/></td>
                            </tr>
                            <br>
                            <tr>
                                <td><input :disabled="!isComplete" @click="signIn" v-bind:style="{'background-color':backgroundColor, 'cursor':cursorStyle}"  class="confirm" type="button" value="Sign in" /></td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>
		</div>
		`
        ,
        computed : {
            isComplete () {
                flag = /\S/.test(this.user.email) && /\S/.test(this.user.password);
                this.backgroundColor = flag ? "seagreen" : "#2e4f3c";
                this.cursorStyle = flag ? "pointer" : "default";
                return flag;
            }
        },
        methods : {
            signIn : function(){
                axios.post('/api/signIn', this.user)
                     .then(response =>{
                           window.localStorage.setItem('user',JSON.stringify(response.data))
                           
                           axios.defaults.headers.common["Authorization"] =localStorage.getItem("user");
                           axios.get("/api/authenticateUser")
                           .then(response => {
                            window.localStorage.setItem('loggedUser',JSON.stringify(response.data));
                            router.push('/')
                           })

                     })
             }
        }
});