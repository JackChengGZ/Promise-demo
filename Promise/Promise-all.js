console.log("here wwe go");
Promise.all([1,2,3]).then(all=>{
    console.log("1:",all);
    return Promise.all([function(){
        console.log('ooxx');
    },'xxoo',false]);
}).then(all=>{
    console.log("2:",all);
    let p1=new Promise(resolve=>{
        setTimeout(()=>{
            console.log("I am p1");
        },1500);
    });
    let p2=new Promise(resolve=>{
        setTimeout(()=>{
            resolve("I am p2");
        },1450)
    });
    return Promise.all([p1,p2]);
}).then(all=>{
    console.log("3:",all);
    let p1=new Promise(resolve=>{
        setTimeout(()=>{
            resolve('I am p1');
        },1500)
    });
    let p2=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject("I am p2")
        },1000)
    });
    let p3=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject("I am p3")
        },3000)
    });
    return Promise.all([p1,p2,p3]);
}).then(all=>{
    console.log("all",all);
}).catch(err=>{
    console.log(err);
})