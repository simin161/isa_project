Vue.component('following', {
	data: function(){
		return{
            offers: [],
            copyOfOffers: [],
            sortOption: "",
            searchName: "",
            filterOptions: "noFilter"
		}
	},
template: `
		<div>
            <nav-bar></nav-bar>
            <div class="my-bungalows">
                <div class="col-md-4 left-div overflow-auto" style="margin-left:22%;">
                    <div class="container">
                        <form class="justify-content-center">
                            <table class="justify-content-center" style="width:90%; margin-left:5%; table-layout:fixed;" >
                                <tr><td colspan="2"><input  v-model="searchName" class="update-text-profile" type="text" style="height:20px; font-size:12px; font-family:'poppins-light'; width: 20em;" placeholder="Offer's name" /></td>
                                    <td ><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" @click="search" value="Search"/></td>
                                </tr>
                                <br>
                                <tr>
                                    <td colspan="2">
                                        <select class="select-sort" v-model="sortOption" name="select" id="format">
                                            <option selected disabled>Sort by</option>
                                            <option value="AscAlpha">Sort alphabetically (A-Z)</option>
                                            <option value="DescAlpha">Sort alphabetically (Z-A)</option>
                                            <option value="AscRating">Sort by average rating (Asc)</option>
                                            <option value="DescRating">Sort by average rating (Desc)</option>
                                            <option value="AscPrice">Sort by price: low to high</option>
                                            <option value="DescPrice">Sort by price: hight to low</option>
                                        </select>
                                    </td>
                                    <td><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" @click="sortedArray" value="Sort"/></td>
                                </tr>
                                <br>
                                <tr>
                                    <td colspan="2">
                                    	<select v-model="filterOptions" class="select-sort" name="select" id="format">
                                    		<option selected value="noFilter">No filter applied</option>
                                            <option value="BUNGALOW" >Bungalows</option>
                                            <option value="BOAT">Boats</option>
                                            <option value="COURSE">Courses</option>
                                    	</select>
                                    </td>
                                    <td><input class="confirm-profile" type="button" style="background-color: #1b4560; font-size: 15px;" value="Filter" @click="filterArray"/></td>
                                </tr>
                            </table>
                        </form>
                        <div class="container mt-5">
                            <div class="card mb-3" style="width: 96%; margin-left:2%; background-color:#225779;" v-for="o in offers">
                                <div class="row g-0">
                                    <div class="col-md-4" style="text-align:center;">
                                        <img src="../images/bungalow-images/bungalow-1-out-1.jpg" class="img-fluid rounded" style="margin:0 auto;"alt="James Bond's Bungalow">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title text-start mt-3" style="color:#fff;font-family:poppins-bold; font-size:15px;">{{o.offer.offerName}}</h5>
                                            <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">{{o.offer.description}}</p>
                                            <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Unit price: {{o.offer.unitPrice}}</p>
                                            <p class="card-text line-clamp-2" style="color:#fff;font-family:poppins-light; font-size:12px;">Rating: {{o.offer.rating}}</p>
                                            <button v-show="o.followed" class="float-end btn btn-light" style="backgorund-color: #DED528" @click="follow(o.offer)">Unfollow</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
		`
        ,
        methods : {
            follow : function(offer){
                axios.defaults.headers.common["Authorization"] =
                                      localStorage.getItem("user");
                axios.post("/api/addFollower", {"id" : offer.id})
                     .then(response => {
                          axios.defaults.headers.common["Authorization"] =
                                                 localStorage.getItem("user");
                          axios.get("/api/getSubscriptionsByUser")
                               .then(response => {
                                     this.offers = response.data;
                               })
                          });
            },
            filterArray: function(){
                if(this.filterOptions === "noFilter"){
                    this.offers = this.copyOfOffers;
                }else{
                    this.offers = this.copyOfOffers;
                    let newArray = this.offers.filter(el => {
                        return el.offer.offerType === this.filterOptions;
                    })
                    this.offers = newArray;
                }
            },
            search: function(){
                this.offers = this.copyOfOffers;
                let newArray = this.offers.filter(el => {
                    let text = this.searchName;
                    return el.offer.offerName.toLowerCase().includes(text);
                })
                this.offers = newArray;
                if(this.searchName === "")
                    this.offers = this.copyOfOffers;
            },
            sortedArray: function() {
                   if(this.sortOption === 'DescAlpha'){
                       function compare(a, b) {
                         if (a.offer.offerName > b.offer.offerName)
                           return -1;
                         if (a.offer.offerName < b.offer.offerName)
                           return 1;
                        return 0;
                      }
                       return this.offers.sort(compare);
                   }
                    if(this.sortOption === 'AscAlpha'){
                        function compare(a, b) {
                            if (a.offer.offerName < b.offer.offerName)
                               return -1;
                            if (a.offer.offerName > b.offer.offerName)
                               return 1;
                            return 0;
                        }
                        return this.offers.sort(compare);
                    }
                    if(this.sortOption === 'DescRating'){
                       function compare(a, b) {
                         if (a.offer.rating > b.offer.rating)
                           return -1;
                         if (a.offer.rating < b.offer.rating)
                           return 1;
                        return 0;
                      }
                       return this.offers.sort(compare);
                   }
                    if(this.sortOption === 'AscRating'){
                        function compare(a, b) {
                            if (a.offer.rating < b.offer.rating)
                               return -1;
                            if (a.offer.rating > b.offer.rating)
                               return 1;
                            return 0;
                        }
                        return this.offers.sort(compare);
                    }
                    if(this.sortOption === 'DescPrice'){
                       function compare(a, b) {
                         if (a.offer.unitPrice > b.offer.unitPrice)
                           return -1;
                         if (a.offer.unitPrice < b.offer.unitPrice)
                           return 1;
                        return 0;
                      }
                       return this.offers.sort(compare);
                   }
                    if(this.sortOption === 'AscPrice'){
                        function compare(a, b) {
                            if (a.offer.unitPrice < b.offer.unitPrice)
                               return -1;
                            if (a.offer.unitPrice > b.offer.unitPrice)
                               return 1;
                            return 0;
                        }
                        return this.offers.sort(compare);
                    }
             }
        },
        mounted(){
             axios.defaults.headers.common["Authorization"] =
                                    localStorage.getItem("user");
             axios.get("/api/getSubscriptionsByUser")
                  .then(response => {
                      this.offers = response.data;
                      this.copyOfOffers = response.data
                  })
        }
});