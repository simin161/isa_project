Vue.component('register', {
	data: function(){
		return{
		    dto : {firstName: "",
		           lastName: "",
		           dateOfBirth: "",
		           gender: "",
		           phoneNumber: "",
		           email: "",
		           password: ""
		    },
		    confirmPassword : "",
		    enabled: false,
		    backgroundColor: "seagreen",
		    cursorStyle: 'default'

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
                            <td style="font-size:20px;">First name:</td>
                        </tr>
                        <tr>
                            <td><input type="text" class="input-text" v-model="dto.firstName"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Last name:</td>
                        </tr>
                        <tr>
                            <td><input type="text" class="input-text" v-model="dto.lastName"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Date of birth:</td>
                        </tr>
                        <tr>
                            <td><input type="date" class="input-text" style="width:239px;" v-model="dto.dateOfBirth"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Gender:</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" id="radio" class="input-radio" name="gender" v-model="dto.gender" label="Female"/> <label style="font-size:18px;">Female </label>
                                <input type="radio" id="radio" class="input-radio" style="margin-left:7%" v-model="dto.gender" name="gender" label="Male"/> <label style="font-size:18px;">Male </label>
                                <input type="radio" id="radio" class="input-radio" style="margin-left:7%" v-model="dto.gender" name="gender" label="Other"/> <label style="font-size:18px;">Other </label>
                            </td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Phone number:</td>
                        </tr>
                        <tr>
                            <td><input type="text" class="input-text" v-model="dto.phoneNumber" /></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">E-mail:</td>
                        </tr>
                        <tr>
                            <td><input type="text" class="input-text" v-model="dto.email" /></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Password:</td>
                        </tr>
                        <tr>
                            <td><input type="password" class="input-text"  v-model="dto.password"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Confirm password:</td>
                        </tr>
                        <tr>
                            <td><input type="password" class="input-text" v-model="confirmPassword"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td><input v-bind:style="{'margin-left':'23%', 'background-color':backgroundColor, 'cursor':cursorStyle}" :disabled="!isComplete" class="confirm" type="button" value="Register!"/></td>
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
        		    /\S/.test(this.dto.dateOfBirth) &&
        		    /\S/.test(this.dto.gender) &&
        		    /\S/.test(this.dto.email) &&
        		    /\S/.test(this.dto.password) &&
        		    /\S/.test(this.confirmPassword);

        		    this.backgroundColor = flag ? "seagreen" : "#f8f1f1";
        		    this.cursorStyle = flag ? "pointer" : "default";
        		    return flag;
        		  }
	},
    methods: {
        checkPasswords : function(){
            return confirmPassword == dto.password;
        }
    }

});