Vue.component('register', {
	data: function(){
		return{
		    dto : {firstName: "",
		           lastName: "",
		           dateOfBirth: "",
		           address: "",
		           city: "",
		           country: "",
		           phoneNumber: "",
		           email: "",
		           password: ""
		    },
		    confirmPassword : "",
		    enabled: false,
		    backgroundColor: "seagreen",
		    cursorStyle: "default"
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
                            <td><input type="text" placeholder="First name" class="input-text" v-model="dto.firstName"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td><input type="text" placeholder="Last name" class="input-text" v-model="dto.lastName"/></td>
                        </tr>
                        <br>
                         <tr>
                            <td><input type="text" placeholder="Address" class="input-text" v-model="dto.address"/></td>
                         </tr>
                        <br>
                         <tr>
                            <td><input type="text" placeholder="City" class="input-text" v-model="dto.city"/></td>
                         </tr>
                        <br>
                         <tr>
                            <td><input type="text" placeholder="Country"class="input-text" v-model="dto.country"/></td>
                         </tr>
                        <br>
                        <tr>
                            <td><input type="text" placeholder="Phone number" class="input-text" v-model="dto.phoneNumber" /></td>
                        </tr>
                        <br>
                        <tr>
                            <td><input type="text" placeholder="E-mail" class="input-text" v-model="dto.email" /></td>
                        </tr>
                        <br>
                        <tr>
                            <td><input type="password" placeholder="Password" class="input-text"  v-model="dto.password"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td><input type="password" placeholder="Confirm password" class="input-text" v-model="confirmPassword"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td><input v-bind:style="{'background-color':backgroundColor, 'cursor':cursorStyle}" :disabled="!isComplete" class="confirm" type="button" value="Register!" @click="registerUser"/></td>
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
        		    correctFirstName = /\S/.test(this.dto.firstName) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.dto.firstName);
        		    correctLastName = /\S/.test(this.dto.lastName) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.dto.lastName);
                    correctPhoneNumber = /\S/.test(this.dto.phoneNumber) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,A-Za-z]{8,10}$/.test(this.dto.phoneNumber);
        		    flag = correctFirstName && correctLastName && correctPhoneNumber &&
        		    /\S/.test(this.dto.address) &&
        		    /\S/.test(this.dto.city) &&
        		    /\S/.test(this.dto.country) &&
        		    /\S/.test(this.dto.email) &&
        		    /\S/.test(this.dto.password) &&
        		    /\S/.test(this.confirmPassword);

        		    this.backgroundColor = flag ? "seagreen" : "#f8f1f1";
        		    this.cursorStyle = flag ? "pointer" : "default";
        		    return flag;
        		  }
	},
    methods: {
        registerUser : function(){
            if(this.confirmPassword == this.dto.password){
                axios.post('/api/registerUser', this.dto)
                	 .then(response => console.log(response.data))
            }
            else{
                console.log("Invalid password")
            }
        }

    }

});