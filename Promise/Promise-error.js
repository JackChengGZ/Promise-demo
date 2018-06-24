console.log("here we go");
new Promise(resolve=>{
    setTimeout(()=>{
        throw new Error('bye')
    },2000)
}).then(value=>{
    console.log(value+' world');
}).catch(error=>{
    console.log('Error:',error.message);
})


//采用reject
// console.log("here we go");
// new Promise(resolve=>{
//     setTimeout(()=>{
//         reject('bye')
//     },2000)
// }).then(value=>{
//     console.log(value+' world');
// },value=>{
//     console.log('Error:',error.message);
// })