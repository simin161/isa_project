Vue.component('sign-in', {
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
                            <td><input style="margin-left:23%;" class="confirm" type="button" value="Sign in!"/></td>
                        </tr>
                    </table>
                </form>
            </div>

        </div>

		</div>
		`

});