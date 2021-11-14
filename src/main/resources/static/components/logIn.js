Vue.component('sign-in', {
	data: function(){
		return{	}
	},
template: `	
			<div>
			<header class="container-fluid">
			<div class="row">
				<div class="container">
					<div class="row">
                    <a href="#/" class="logo"><h1 class="col-sm-4">FishyFinds</h1></a>
						<nav class="col-sm-8">
							<a href="#/signIn">Sign in</a>
							<a href="">Register</a>
						</nav>
					</div>
				</div>
			</div>
		</header>

		<div class="container-fluid main-image hidden-xs" >
			<div class="row">
				<div class="container"> 
					<div class="row">
						<div class="col-xs-12"> 
							<p class="title"> FishyFinds </p>
							<p class="slogan"> Plan your next trip with confidence</p>
						</div>
					</div>
				</div>
			</div>
		</div>

        <div class="containter">
            <div class="row">
                <form class="col-md-2 reg-form">    
                    <table style="margin-top: 10%;">
                        <tr>
                            <td style="font-size:20px;">Username:</td>
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