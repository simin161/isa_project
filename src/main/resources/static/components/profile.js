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
		<p style="margin-left: 6.5%; font-family: Poppins; font-style: normal; font-weight: bold; font-size: 36px; line-height: 54px; align-items: center; text-align: center; letter-spacing: -0.017em; color: #FFFFFF;">
		    Hello, {{dto.firstName}} {{dto.lastName}}
		</p>
         <div class="containter">
             <div class="col-md-4 left-div">
                <p style="margin-left: 6.5%; font-family: Poppins; font-style: normal; font-weight: bold; font-size: 36px; line-height: 54px; align-items: center; text-align: center; letter-spacing: -0.017em; color: #FFFFFF;">
                    Your profile
                </p>
                <svg style="margin-left: 47%" width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <rect width="96" height="96" fill="url(#pattern0)"/>
                    <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_50_417" transform="scale(0.0104167)"/>
                    </pattern>
                    <image id="image0_50_417" width="96" height="96" xlink:href="data:image/png;base64,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"/>
                    </defs>
                </svg>
                 <input type="text" class="input-text-profile" placeholder="E-mail" v-model="dto.email" :disabled="true"/>
                 <br>
                 <input type="text" style="margin-left:5%; margin-top: 3%;"class="input-text-profile-small" v-model="dto.firstName" :disabled="true" placeholder="First name"/>
                 <br>
                 <input type="text" class="input-text-profile-small" v-model="dto.lastName" :disabled="true" placeholder="Last name"/>
                 <br>
                 <input type="text" style="margin-top: 3%" class="input-text-profile" v-model="dto.address" :disabled="true" placeholder="Address"/>
                 <br>
                 <input type="text" style="margin-left:5%; margin-top: 3%;" class="input-text-profile-small" v-model="dto.city" placeholder="City" :disabled="true"/>
                 <br>
                 <input type="text" class="input-text-profile-small" v-model="dto.country" placeholder="Country" :disabled="true"/>
                 <br>
                 <input type="text" style="margin-top: 3%;" class="input-text-profile" v-model="dto.phoneNumber" placeholder="Phone number" :disabled="true"/>
                 <br>
                 <div v-if="dto.userType == 'CUSTOMER' && dto.loyaltyProgram != null">
                    <input type="text" style="margin-left:5%; margin-top: 3%;" class="input-text-profile-small" v-model="dto.loyaltyProgram.categoryName" :disabled="true" placeholder="Category name"/>
                 </div>
                 <div v-else-if="dto.userType == 'CUSTOMER' && dto.loyaltyProgram == null">
                    <input type="text" style="margin-left:5%; margin-top: 3%;" class="input-text-profile-small" :disabled="true" placeholder="No category"/>
                 </div>
                 <input type="text" style="margin-top: 3%;" class="input-text-profile-small" v-model="dto.earnedPoints" :disabled="true"/>
                 <div>
                   <p style="margin-left: 6.5%; font-family: Poppins; font-style: normal; font-weight: bold; font-size: 36px; line-height: 54px; align-items: center; text-align: center; letter-spacing: -0.017em; color: #FFFFFF;">
                        Options
                   </p>
                   <div class="change-data" @click="showForm = 1">
                        <img class="image" src="images/update.png">
                   </div>
                   <div class="change-pass" @click="showForm = 2">
                        <img class="image" src="images/change-pass.png">
                   </div>
                   <div class="delete-acc" @click="showForm = 3">
                        <img class="image" src="images/delete.png">
                   </div>
                 </div>
             </div>
             <div class="col-md-4 right-div">
                  <form style="margin-left: 15%;" v-show="showForm == 2" class="col-md-2">
                       <table style="margin-top: 10%;">
                         <tr>
                            <td><input type="password" placeholder="New password" class="input-text" v-model="passwordDTO.newPassword"/></td>
                         </tr>
                         <br>
                         <tr>
                            <td><input type="password" placeholder="Confirm new password" class="input-text" v-model="confirmPassword"/></td>
                         </tr>
                         <br>
                         <tr>
                            <td><input :disabled="!isCompletePassword" class="confirm" type="button" value="Update your password" @click="savePassword"/></td>
                         </tr>
                       </table>
                  </form>
                  <form v-show="showForm == 3" style="margin-left: 15%;" class="col-md-2">
                       <table style="margin-top: 10%;">
                           <tr>
                                <td><input type="text" placeholder="Explanation" class="input-text" v-model="requestDTO.explanation"/></td>
                           </tr>
                           <br>
                           <tr>
                                <td><input style="background-color: red" class="confirm" type="button" value="Send request" @click="sendRequest"/></td>
                           </tr>
                      </table>
                  </form>
                         <form v-show="showForm == 1" style="margin-left: 15%;" class="col-md-2">
                             <table style="margin-top: 10%;">
                                 <tr>
                                     <td><input placeholder="First name"  type="text" class="input-text" v-model="dto.firstName"/></td>
                                 </tr>
                                 <br>
                                 <tr>
                                     <td><input placeholder="Last name" type="text" class="input-text" v-model="dto.lastName"/></td>
                                 </tr>
                                 <br>
                                  <tr>
                                     <td><input  placeholder="Address" type="text" class="input-text" v-model="dto.address"/></td>
                                  </tr>
                                 <br>
                                  <tr>
                                     <td><input  placeholder="City" type="text" class="input-text" v-model="dto.city"/></td>
                                  </tr>
                                 <br>
                                  <tr>
                                     <td><input  placeholder="Country" type="text" class="input-text" v-model="dto.country"/></td>
                                  </tr>
                                 <br>
                                 <tr>
                                     <td><input  placeholder="Phone number" type="text" class="input-text" v-model="dto.phoneNumber" /></td>
                                 </tr>
                                 <br>
                                 <tr>
                                     <td><input :disabled="!isComplete" class="confirm" type="button" value="Update your data" @click="saveProfile"/></td>
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