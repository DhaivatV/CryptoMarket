// const params = new Proxy(new URLSearchParams(window.location.search), {
//     get: (searchParams, prop) => searchParams.get(prop),
//   });

//   let value = params.some_key;
//   console.log("id=",value)

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var value = getParameterByName('_id');
console.log("id=",value)


fetch('https://fakestoreapi.com/products').then((data)=>{
    // console.log(data)
    return data.json();
}).then((completedata)=>{
    console.log(completedata)
    // console.log(completeda)
    let dataval="";
    
        dataval+=`
        <div class="product-box">
                <img src=${completedata[value-1].image} alt="" class="product-img">
            </div>
            <div class="desc-box">
                <div>
                <h2 class="product-title">${completedata[value-1].title.substring(0,12)}</h2>
                <p class="desc">${completedata[value-1].description}</p>
                <p class="product-price">ETH ${((completedata[value-1].price)/10).toFixed(2)}</p>
            </div>
            <div class="prod-cart">
                <i class='bx bx-shopping-bag add-cart'></i>
            </div>
            </div>
        `;
    
    // document.getElementById("main").innerHTML=dataval;
    
  document.getElementById("prod").innerHTML=dataval;

}).catch((error)=>{
    console.log(error)
})