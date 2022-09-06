fetch('https://fakestoreapi.com/products').then((data)=>{
    // console.log(data)
    return data.json();
}).then((completedata)=>{
    // console.log(completedata)
    let dataval="";
    completedata.map((val)=>{
        dataval+=`<div class="card">
        <h1 class="title">${val.title.substring(0,12)}</h1>
          <img src=${val.image} alt="img" class="images" />
          <p class="desc">${val.description.substring(0,100)}</p>
          <p class="price">ETH ${((val.price)/10).toFixed(2)}</p>
          <button onclick="App.buyItem()" id="btn">BUY</button>
          <a href="transaction.html"><button  id="view" style="display: none; margin:auto">Show</button></a>
      </div>`;
    });
    document.getElementById("main").innerHTML=dataval;


}).catch((error)=>{
    console.log(error)
})