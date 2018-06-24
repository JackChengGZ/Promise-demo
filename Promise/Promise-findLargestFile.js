const fs=require('fs');
const path=require('path');

function findLargest(dir,callback){
    fs.readdir(dir,function(err,files){
        if(err) return callback(err);
        let count =files.length;
        let errored=false;
        let stats=[];
        files.forEach(file=>{
            fs.stat(path.join(dir,file),(err,stat)=>{
                if(errored) return;
                if(err){
                    errored=true;
                    return callback(err);
                }
                stats.push(stat);
                if(--count===0) {
                    let largest=stats.filter(function(stat){return stat.isFile();})
                                     .reduce(function(prev,next){
                                         if(prev.size>next.size) return prev;
                                         return next;
                                     });
                    callback(null,files[stats.indexOf(largest)]);                    
                }
            });
        });
    });
}

findLargest('path',function(err,filename){
    if(err) return console.log(err);
    console.log('最大的文件是：'+filename);
});

/*
    先来说一下上面会有那些问题：
    1.首先看一下回调无法捕获异常的问题：
        fs.readdir(dir,function(err,files){});当程序执行这个函数的时候,fs的readdir方法中会有一个回调函数function(err,files){};
        很明显这个是一个异步的,readdir和回调函数不是在同一个执行栈中,也就是说,会执行完readdir方法,不会管里面的function的结构，如果说
                try{
                    fs.readdir(dir,function(err,files){})
                }catch{
                    console.log("抛出错误异常")
                }
        这个方法是没有用的，无法捕获到异常，因为这个函数是一个异步的，readdir方法执行完内部的回调函数还在等待try catch执行完之后才会执行
        所以说没办法捕获到异常。于是在回调函数中抛出异常
                fs.readdir(dir,function(err,files){
                    if(err) return callback(err);
                    .....
                })        
*/
