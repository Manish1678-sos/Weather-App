


const fetchResults=async()=>
{
    let url="http://api.weatherapi.com/v1/current.json?key=c417664c6d58487380c71034222609&q=Mumbai&aqi=no";
    const res= await fetch(url);
    const data=await res.json(); 
    
    console.log(data);
    let locationName=data.location.name
    let time=data.location.locationtime
    let temp=data.current.temp_c;
    let condition=data.current.condition.text;
}