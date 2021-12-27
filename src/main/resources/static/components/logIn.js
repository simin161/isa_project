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
            <div class="containter">
                <div class="row">
                    <form class="col-md-2 reg-form">    
                        <table style="margin-top: 10%;">
                            <tr>
                                <td style="font-size:20px;">E-mail:</td>
                            </tr>
                            <tr>
                                <td><input type="text" class="input-text" v-model="dto.email"/></td>
                            </tr>
                            <br>
                            <tr>
                                <td style="font-size:20px;">Password:</td>
                            </tr>
                            <tr>
                                <td><input type="password" class="input-text" v-model="dto.password"/></td>
                            </tr>
                            <br>
                            <tr>
                                <td><input :disabled="!isComplete" @click="logInUser" v-bind:style="{'margin-left':'23%', 'background-color':backgroundColor, 'cursor':cursorStyle}"  class="confirm" type="button" value="Sign in!" /></td>
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
                this.backgroundColor = flag ? "seagreen" : "#f8f1f1";
                this.cursorStyle = flag ? "pointer" : "default";
                return flag;
            }
        },
        methods : {
            logInUser : function(){
                axios.post('/api/logIn', this.dto)
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