Vue.component('newCourse', {
	data: function(){
		return{
            dto: {
                offerName: "",
                country: "",
                city: "",
                street: "",
                streetNumber:"",
                description: "",
                rulesOfConduct: "",
                additional: ""

            }
		};
	},
template: `
	<div>
        <nav-bar></nav-bar>
        <div class="col-md-4 left-div overflow-auto" style="margin-top:-20px; margin-left: 22%; height:80vh">
            <br><br><br>
            <form class="justify-content-center">
                <table class="justify-content-center" style="width:75%; margin: auto; table-layout:fixed;">
                   <tr>
                       <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Course title </p></td>
                       <td><input class="input-text" type="text" v-model="dto.offerName" /></td>
                   </tr>
                   <tr>
                       <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Country: </p></td>
                       <td><input class="input-text" type="text" v-model="dto.country" /></td>
                   </tr>
                   <tr>
                       <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">City: </p></td>
                       <td><input class="input-text" type="text" v-model="dto.city"/></td>
                   </tr>
                   <tr>
                        <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Street: </p></td>
                        <td><input class="input-text" type="text" v-model="dto.street"/></td>
                   </tr>
                   <tr>
                        <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Street number: </p></td>
                        <td><input class="input-text" type="text" v-model="dto.streetNumber"/></td>
                   </tr>
                   <tr>
                        <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Description: </p></td>
                        <td><input class="input-text" type="text" v-model="dto.description"/></td>
                   </tr>
                   <tr>
                        <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Unit price: </p></td>
                        <td><input class="input-text" type="text"  v-model="dto.unitPrice"/></td>
                   </tr>
                   <tr>
                        <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Maximum capacity: </p></td>
                        <td><input class="input-text" type="text"  v-model="dto.maxCapacity"/></td>
                   </tr>
                   <tr>
                        <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Rules of conduct: </p></td>
                        <td><input class="input-text" type="text"  v-model="dto.rulesOfConduct"/></td>
                   </tr>
                   <tr>
                        <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Cancellation policy: </p></td>
                        <td><input class="input-text" type="text"  v-model="dto.cancellationPolicy"/></td>
                   </tr>
                   <tr>
                        <td><p style="color:#fff;font-family:poppins-bold; font-size:15px;">Additional services: </p></td>
                        <td><input class="input-text" type="text"  v-model="dto.additional"/></td>
                   </tr>
                   <tr><td><input type="button"  class="confirm-profile" value="Create offer!" @click="addNewCourse"/></td></tr>
               </table>
            </form>
        </div>
    </div>
`,
    methods: {
         addNewCourse : function(){
            axios.defaults.headers.common["Authorization"] =
                localStorage.getItem("user");
            axios.post("/api/newCourse", this.dto)
            .then(response=> {
                console.log(response.data);
            })
         }
    },
    mounted(){
     const id = window.location.hash.split('/')[2];
     axios.defaults.headers.common["Authorization"] =
                            localStorage.getItem("user");

    }
});