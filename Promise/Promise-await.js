function resolveAfter2Senconds(x){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(x)
        },2000);
    });
}

async function f1(){
    var x=await resolveAfter2Senconds(10);
    console.log(x);//10
}
f1();