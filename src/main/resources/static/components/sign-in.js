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
                            console.log(response.data)
                     })
            }
        }
});