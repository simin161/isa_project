Vue.component('admin-user-complaints', {
	data: function(){
    		return{
    			showPage: 0,
    			sortOption: "",
    			requestToShow: {
    			    id: null,
    			    explanation: '',
    			    firstName: "",
    			    lastName: "",
    			    email: ""
                    },
    			requests:[],
    			dto: null
    		}
    	},
    template: `
    	<div>
    		<nav-bar></nav-bar>
    		<br>
    		<br>
            <div class="my-bungalows">
    			<div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; height:80vh">

    				<div class="container mt-5">
    					<div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="request in requests">
    						<div class="row g-0">
    							<div class="col-md-4" style="text-align:center;">

    							</div>
    							<div class="col-md-8">
    								<div class="card-body">
    									<h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">Request ID: {{request.id}}</h5>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Explanation: {{request.explanation}}</p>
    									<button class="float-end btn btn-light" @click="showMore(request)">Show more</button>
    									<p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">   </p>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>

                   	</div>
                   	<div class="col-md-4 right-div overflow-auto" style="margin-top:-20px; height:80vh" v-show="showPage != 0">
                   	<div class="container" v-show="showPage == 1">
    					<div class="container align-items-start">
    						<input class="confirm-profile" type="button" value="Close" style="width:20%; float:left; font-size:12px; background-color: gray" @click="showPage = 0"/><br><br><br>
    						<p class="title-text-bold" style="margin-top:10px; text-align:center;"> </p>
    						<form class="justify-content-center">
    							<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
    								<tr class="d-flex justify-content-evenly">
    									<td><input type="text" placeholder="   First name" class="input-text"  v-model="requestToShow.firstName"/></td>
    									<td><input type="text" placeholder="   Last name" class="input-text"  v-model="requestToShow.lastName"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Email" class="input-text"  v-model="requestToShow.email"/></td></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Explanation" class="input-text-area"  v-model="requestToShow.explanation" ></textarea></tr><br>
    							</table>
    						</form>
    					</div>
                   	</div>
               	</div>
    		</div>
    	</div>
    		`
          ,
          computed: {

          }
          ,
          methods : {
            showMore : function(request){
               this.requestToShow.id = request.id;
               this.requestToShow.explanation = request.explanation;

               axios.get("/api/findUser", request.id)
               .then(response => (this.dto = response.data))

               this.requestToShow.firstName = this.dto.firstName;
               this.requestToShow.lastName = this.dto.lastName;
               this.requestToShow.email = this.dto.email;
               this.showPage = 1;
            }
          }
          ,
          mounted(){
            axios.get("/api/allDeletionRequests")
                 .then(response => (this.requests = response.data))
          }
});
