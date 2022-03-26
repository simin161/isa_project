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
    			dto: {

    			    firstName: "",
    			    lastName: "",
    			    email: ""

    			},
    			showDeny: 0,
    			deny: {

                    requestId: null,
                    id: null,
    			    explanation: ''

    			}
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
    									<br>
    								</div>
    							</div>
    						</div>
    					</div>
    				</div>

                   	</div>
                   	<div class="col-md-4 right-div overflow-auto" style="margin-top:-20px; height:80vh" v-show="showPage != 0">
                   	<div class="container" v-show="showPage == 1">
    					<div class="container align-items-start">
    					    <br>
    						<input class="confirm-profile" type="button" value="Close" style="width:20%; float:left; font-size:12px; background-color: gray" @click="showPage = 0"/><br><br><br>
    						<p class="title-text-bold" style="margin-top:10px; text-align:center;"> </p>
    						<form class="justify-content-center">
    							<table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;" >
    								<tr class="d-flex justify-content-evenly">
    									<td><input type="text" placeholder="   First name" class="input-text"  v-model="requestToShow.firstName"/></td>
    									<td><input type="text" placeholder="   Last name" class="input-text"  v-model="requestToShow.lastName"/></td></tr><br>
    								<tr><td><input type="text" placeholder="   Email" class="input-text"  v-model="requestToShow.email"/></td></tr><br>
    								<tr><textarea rowspan="3" name="text" placeholder="   Explanation" class="input-text-area"  v-model="requestToShow.explanation" ></textarea></tr><br>
    							    <br>
    							    <tr>
    							        <td><input class="confirm-profile" type="button" value="Approve request" @click="approveRequest"/></td>
    							    </tr>
    							    <br>
    							    <tr>
                                        <td><input class="confirm-profile" type="button" value="Deny request" @click="showDeny = 1"/></td>
                                    </tr>
                                    <br>
                                    <tr v-show="showDeny == 1">
                                        <textarea rowspan="3" name="text" placeholder="   Reasoning for rejection" class="input-text-area"  v-model="deny.explanation" ></textarea>
                                    </tr>
                                    <br>
                                    <tr v-show="showDeny == 1">
                                        <td><input class="confirm-profile" type="button" value="Confirm" @click="denyRequest"/></td>
                                    </tr>
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

            axiosParams(){

                const params = new URLSearchParams();
                params.append('id', this.requestToShow.id);
                return params;

            }

          }
          ,
          methods : {
            showMore : function(request){
               this.showPage = 1;
               this.requestToShow.id = request.id;
               this.deny.id = request.user.id;
               this.deny.requestId = request.id;
               this.requestToShow.explanation = request.explanation;

               axios.get("/api/findUser", {

                params: this.axiosParams

               })
               .then(response => {this.dto = response.data;
                                  this.requestToShow.firstName = this.dto.firstName;
                                  this.requestToShow.lastName = this.dto.lastName;
                                  this.requestToShow.email = this.dto.email;
                                  console.log(this.requestToShow);})

               console.log(this.requestToShow);

            },

            approveRequest : function(){

                Swal.fire({

                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm'

                }).then((result) => {

                    if(result.isConfirmed){

                        axios.post('/api/approveDeleteRequest', this.deny)
                            .then(response=> {

                                if(response.data === true){

                                    Swal.fire('Deletion request approved successfuly!',
                                                '',
                                                'success')

                                }
                                else{

                                    Swal.fire('Ooops, something went wrong!',
                                               'Please, try again later!',
                                               'error')

                                }

                            })

                    }

                })

            },

            denyRequest : function(){



            }
          }
          ,
          mounted(){
            axios.get("/api/allPendingDeletionRequests")
                 .then(response => (this.requests = response.data))
          }
});
