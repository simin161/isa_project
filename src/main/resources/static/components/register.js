Vue.component('register', {
	data: function(){
		return{	}
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
                            <td><input type="text" class="input-text" /></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Last name:</td>
                        </tr>
                        <tr>
                            <td><input type="text" class="input-text" /></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Date of birth:</td>
                        </tr>
                        <tr>
                            <td><input type="date" class="input-text" style="width:239px;"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Gender:</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" id="radio" class="input-radio" name="gender" label="Female"/> <label style="font-size:18px;">Female </label>
                                <input type="radio" id="radio" class="input-radio" style="margin-left:7%" name="gender" label="Male"/> <label style="font-size:18px;">Male </label>
                                <input type="radio" id="radio" class="input-radio" style="margin-left:7%" name="gender" label="Other"/> <label style="font-size:18px;">Other </label>
                            </td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Phone number:</td>
                        </tr>
                        <tr>
                            <td><input type="text" class="input-text" /></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">E-mail:</td>
                        </tr>
                        <tr>
                            <td><input type="text" class="input-text" /></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Password:</td>
                        </tr>
                        <tr>
                            <td><input type="password" class="input-text"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td style="font-size:20px;">Confirm password:</td>
                        </tr>
                        <tr>
                            <td><input type="password" class="input-text"/></td>
                        </tr>
                        <br>
                        <tr>
                            <td><input style="margin-left:23%;" class="confirm" type="button" value="Register!"/></td>
                        </tr>
                    </table>
                </form>
            </div>

        </div>

		</div>
		`

});