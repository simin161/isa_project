Vue.component('offer-horizontal-card', {
	data: function(){
		return{

		};
	},
template: `	
		<div>
            <div class="container mt-5">

                <div class="card mb-3" style="max-width: 630px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="..." class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" style="mt-3">Bungalow's name</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            <button class="btn">Show more</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `
    ,
    components:{},
    methods: {},
    mounted(){}
});