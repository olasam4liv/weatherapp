if ('serviceWorker' in navigator){
    window.addEventListener('load', () =>{
        navigator.serviceWorker
        .register('./serviceworker.js')
        .then(reg => console.log('ServiceWorker: Registered'))
        .catch(err => console.log(`Service Worker: Error ${err}`))
    })
}



function firstLoad(){
    const btnSearch = document.querySelector('.btnSearch');
    btnSearch.addEventListener('click', fetcheWeatherApi, false)
    fetchBookmarkedData();

}
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();   
    fetcheWeatherApi()
    
})

function fetcheWeatherApi(e){         
    if(!inputValue.value){
        alert('Please Input a City to Search')
        return false;
    }else{
     console.log(inputValue.value)
    
   
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=ffa6eee22fc7610b1ab4d5856bbcd7e2')
    .then(response => response.json())
    // .then(data => console.log(data)) 
    .then(data => {
        console.log(data)
        const cityValue = data['name'];
        const tempValue  = data['main']['temp'];
        const descValue = data['weather'][0]['description'];         
        const tim = new Date().toUTCString();
        // const cityName = document.querySelector('.name');
        // const desc = document.querySelector('.desc');
        // const temp = document.querySelector('.temp');
        // cityName.innerHTML = cityValue;
        // desc.innerHTML =  descValue;
        // temp.innerHTML =  tempValue + '&#8451';    
        const weatherData = {
            cityValue,
            descValue,
            tempValue,
            tim
            }          
           
        if (localStorage.getItem('bookmarkedData') === null){
            const bookmarkedData =[];
            bookmarkedData.push(weatherData)   
            localStorage.setItem('bookmarkedData', JSON.stringify(bookmarkedData))
        } else{
            const bookmarkedData = JSON.parse(localStorage.getItem('bookmarkedData'))
            bookmarkedData.push(weatherData)
            localStorage.setItem('bookmarkedData', JSON.stringify(bookmarkedData))
        }         
     })      
    .catch(err => {
         if (err){
         alert('Inavalid City or Internet Connection is not Available')  
         searchForm.inputValue.value ='';
         return false; 
        }            
    })
     
 }
 location.reload()

}

function fetchBookmarkedData(){      
    const bookmarkedData = JSON.parse(localStorage.getItem('bookmarkedData'))
    const displayResult = document.querySelector('.resultTable');
   displayResult.innerHTML = '';  
   for(let i =0; i < bookmarkedData.length; i++){                
       const name = bookmarkedData[i].cityValue
       const desc = bookmarkedData[i].descValue
       const temp = bookmarkedData[i].tempValue
       displayResult.innerHTML +=                                         
                                       '<tbody>'+
                                       '<tr>' +
                                       '<td>'+name+'</td>'+
                                       '<td>'+desc+'</td>'+
                                       '<td>'+temp+'&#8451</td>'+
                                       '</tr>'+
                                   '</tbody>';     
   }

}

window.addEventListener('load', firstLoad, false)