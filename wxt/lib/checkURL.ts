export default async function checkURL(url:string){
    const response = await fetch("http://127.0.0.1:3000/predict",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({url})
        }
    );
    return response;
}