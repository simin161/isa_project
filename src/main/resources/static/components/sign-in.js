Vue.component('sign-in', {
	data: function(){
		return{
		    dto: {
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
                                <td><input type="text" placeholder="   E-mail" class="input-text" v-model="dto.email"/></td>
                            </tr>
                            <br>
                            <tr>
                                <td><input type="password" placeholder="   Password" class="input-text" v-model="dto.password"/></td>
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
                flag = /\S/.test(this.dto.email) && /\S/.test(this.dto.password);
                this.backgroundColor = flag ? "seagreen" : "#2e4f3c";
                this.cursorStyle = flag ? "pointer" : "default";
                return flag;
            }
        },
        methods : {
            signIn : function(){
                axios.post('/api/signIn', this.dto)
                     .then(response =>{
                            if(response.data === true){
                                router.push('/')
                            }
                            else{
                                console.log("Nije uspesna prijava")
                            }
                     })
            }
        }
});