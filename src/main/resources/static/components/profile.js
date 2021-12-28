Vue.component('profile', {
	data: function(){
		return{
			dto: null,
			enable: true,
			showProfile: true,
			confirmPassword: ''
		};
	}
	,
	template: `
		<div>
		<nav-bar></nav-bar>
         <div class="containter">
             <div class="row">
                  <form v-show="!showProfile" class="col-md-2 reg-form">
                       <table style="margin-top: 10%;">
                         <tr>
                            <td><input class="confirm" type="button" value="Show Profile!" @click="showProfile = true"/></td>
                         </tr>
                         <tr>
                            <td style="font-size:20px;">Password:</td>
                         </tr>
                         <tr>
                            <td><input type="password" class="input-text" v-model="dto.password"/></td>
                         </tr>
                         <br>
                         <tr>
                            <td style="font-size:20px;">Confirm password:</td>
                         </tr>
                         <tr>
                            <td><input type="password" class="input-text" v-model="confirmPassword"/></td>
                         </tr>
                         <tr>
                            <td><input :disabled="!isCompletePassword" class="confirm" type="button" value="Save!"/></td>
                         </tr>
                       </table>
                  </form>
                         <form v-show="showProfile" class="col-md-2 reg-form">
                             <table style="margin-top: 10%;">
                                 <tr>
                                    <td><input class="confirm" type="button" value="Edit!" @click="enable = !enable"/></td>
                                 </tr>
                                 <tr>
                                    <td><input class="confirm" type="button" value="Change password!" @click="showProfile = false"/></td>
                                 </tr>
                                 <tr>
                                     <td style="font-size:20px;">First name:</td>
                                 </tr>
                                 <tr>
                                     <td><input :disabled="enable" type="text" class="input-text" v-model="dto.firstName"/></td>
                                 </tr>
                                 <br>
                                 <tr>
                                     <td style="font-size:20px;">Last name:</td>
                                 </tr>
                                 <tr>
                                     <td><input :disabled="enable" type="text" class="input-text" v-model="dto.lastName"/></td>
                                 </tr>
                                 <br>
                                  <tr>
                                     <td style="font-size:20px;">Address:</td>
                                  </tr>
                                  <tr>
                                     <td><input :disabled="enable" type="text" class="input-text" v-model="dto.address"/></td>
                                  </tr>
                                 <br>
                                  <tr>
                                     <td style="font-size:20px;">City:</td>
                                  </tr>
                                  <tr>
                                     <td><input :disabled="enable" type="text" class="input-text" v-model="dto.city"/></td>
                                  </tr>
                                 <br>
                                  <tr>
                                     <td style="font-size:20px;">Country:</td>
                                  </tr>
                                  <tr>
                                     <td><input :disabled="enable" type="text" class="input-text" v-model="dto.country"/></td>
                                  </tr>
                                 <br>
                                 <tr>
                                     <td style="font-size:20px;">Phone number:</td>
                                 </tr>
                                 <tr>
                                     <td><input :disabled="enable" type="text" class="input-text" v-model="dto.phoneNumber" /></td>
                                 </tr>
                                 <br>
                                 <tr>
                                     <td style="font-size:20px;">E-mail:</td>
                                 </tr>
                                 <tr>
                                     <td><input :disabled="true" type="text" class="input-text" v-model="dto.email" /></td>
                                 </tr>
                                 <br>
                                 <tr>
                                     <td><input v-show="!enable" :disabled="!isComplete" class="confirm" type="button" value="Save!" /></td>
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
                /\S/.test(this.dto.email);


                this.backgroundColor = flag ? "seagreen" : "#f8f1f1";
                this.cursorStyle = flag ? "pointer" : "default";
                return flag;
        },
        isCompletePassword () {
                flag = /\S/.test(this.dto.password) && /\S/.test(this.confirmPassword);

                return flag;
        }
    },
	mounted(){
	    axios.get("/api/getLoggedUser")
	         .then(response => (this.dto = response.data))
	}
});