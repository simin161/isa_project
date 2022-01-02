Vue.component('profile', {
	data: function(){
		return{
			dto: null,
			enable: true,
			confirmPassword: '',
			passwordDTO: {
			           id: null,
			           newPassword: ''
			},
			showForm: 1,
			requestDTO:{
			    id: null,
			    explanation: ''
			}
		};
	}
	,
	template: `
		<div>
		<nav-bar></nav-bar>
         <div class="containter">
             <div class="row">
                  <form v-show="showForm == 2" class="col-md-2 reg-form">
                       <table style="margin-top: 10%;">
                         <tr>
                            <td><input class="confirm" type="button" value="Show Profile!" @click="showForm = 1"/></td>
                         </tr>
                         <tr>
                            <td><input type="password" placeholder="Password" class="input-text" v-model="passwordDTO.newPassword"/></td>
                         </tr>
                         <br>
                         <tr>
                            <td><input type="password" placeholder="Confirm password" class="input-text" v-model="confirmPassword"/></td>
                         </tr>
                         <tr>
                            <td><input :disabled="!isCompletePassword" class="confirm" type="button" value="Save!" @click="savePassword"/></td>
                         </tr>
                       </table>
                  </form>
                  <form v-show="showForm == 3" class="col-md-2 reg-form">
                       <table style="margin-top: 10%;">
                           <tr>
                               <td><input class="confirm" type="button" value="Show Profile!" @click="showForm = 1"/></td>
                           </tr>
                           <tr>
                                <td><input type="text" placeholder="Explanation" class="input-text" v-model="requestDTO.explanation"/></td>
                           </tr>
                           <tr>
                                <td><input class="confirm" type="button" value="Send!" @click="sendRequest"/></td>
                           </tr>
                      </table>
                  </form>
                         <form v-show="showForm == 1" class="col-md-2 reg-form">
                             <table style="margin-top: 10%;">
                                 <tr>
                                    <td><input class="confirm" type="button" value="Edit!" @click="enable = !enable"/></td>
                                 </tr>
                                 <tr>
                                    <td><input class="confirm" type="button" value="Change password!" @click="showForm = 2"/></td>
                                 </tr>
                                 <tr>
                                    <td><input class="confirm" type="button" value="Delete profile!" @click="showForm = 3"/></td>
                                 </tr>

                                 <tr>
                                     <td><input placeholder="First name" :disabled="enable" type="text" class="input-text" v-model="dto.firstName"/></td>
                                 </tr>
                                 <br>
                                 <tr>
                                     <td><input :disabled="enable" placeholder="Last name" type="text" class="input-text" v-model="dto.lastName"/></td>
                                 </tr>
                                 <br>
                                  <tr>
                                     <td><input :disabled="enable" placeholder="Address" type="text" class="input-text" v-model="dto.address"/></td>
                                  </tr>
                                 <br>
                                  <tr>
                                     <td><input :disabled="enable" placeholder="City" type="text" class="input-text" v-model="dto.city"/></td>
                                  </tr>
                                 <br>
                                  <tr>
                                     <td><input :disabled="enable" placeholder="Country" type="text" class="input-text" v-model="dto.country"/></td>
                                  </tr>
                                 <br>
                                 <tr>
                                     <td><input :disabled="enable" placeholder="Phone number" type="text" class="input-text" v-model="dto.phoneNumber" /></td>
                                 </tr>
                                 <br>
                                 <tr>
                                     <td><input :disabled="true" type="text" placeholder="E-mail" class="input-text" v-model="dto.email" /></td>
                                 </tr>
                                 <br>
                                 <tr v-if="dto.userType == 'CUSTOMER' && dto.loyaltyProgram != null">
                                    <td style="font-size:20px;">Category: {{dto.loyaltyProgram.categoryName}}</td>
                                 </tr>
                                 <tr v-else-if="dto.loyaltyProgram == null">
                                    <td style="font-size:20px;">No category</td>
                                 </tr>
                                 <tr>
                                    <td style="font-size:20px;">Points: {{dto.earnedPoints}}</td>
                                 </tr>
                                 <tr>
                                     <td><input v-show="!enable" :disabled="!isComplete" class="confirm" type="button" value="Save!" @click="saveProfile"/></td>
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


                this.backgroundColor = flag ? "seagreen" : "#2e4f3c";
                this.cursorStyle = flag ? "pointer" : "default";
                return flag;
        },
        isCompletePassword () {
                flag = /\S/.test(this.passwordDTO.newPassword) && /\S/.test(this.confirmPassword);

                return flag;
        }
    },
    methods : {
        savePassword : function(){
            if(this.passwordDTO.newPassword != this.dto.password && this.passwordDTO.newPassword == this.confirmPassword){
                this.passwordDTO.id = this.dto.id;
                axios.put('/api/changePassword', this.passwordDTO)
                     .then(response => {console.log(response.data)
                           if(response.data){
                                this.dto.password = this.passwordDTO.newPassword;
                           }
                     })
            }
            else {
                console.log("invalid password")
            }
        },
        saveProfile : function(){
            axios.put('/api/changeProfile', {"id": this.dto.id,
                                             "firstName":this.dto.firstName,
                                             "lastName": this.dto.lastName,
                                             "address": this.dto.address,
                                             "city": this.dto.city,
                                             "country": this.dto.country,
                                             "phoneNumber":this.dto.phoneNumber,
                                             "email":this.dto.email})
            .then((response) => {
                if(response.data){
                    this.$router.go(0)
                }
            })
        },
        sendRequest : function(){
        this.requestDTO.id = this.dto.id;
            axios.post('/api/addDeleteRequest', this.requestDTO)
                 .then((response) => {console.log("finished")})
        }
    },
	mounted(){
	    axios.get("/api/getLoggedUser")
	         .then(response => (this.dto = response.data))
	}
});