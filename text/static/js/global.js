
const config = {
     token:'',
     uid:'',
     username:'',
     showimg:true,
     timeNow : new Date().getTime(),
     timeDayStart1:new Date(  new Date(new Date().toLocaleDateString()).getTime() +9.25 * 60 * 60 * 1000).getTime(),
     timeDayEnd1:new Date( new Date(new Date().toLocaleDateString()).getTime() +11.5 * 60 * 60 * 1000).getTime(),
     timeDayStart2:new Date( new Date(new Date().toLocaleDateString()).getTime() + 13 * 60 * 60 * 1000).getTime(),
     timeDayEnd2:new Date( new Date(new Date().toLocaleDateString()).getTime() +15 * 60 * 60 * 1000).getTime(),
     week:new Date().getDay()

}

var bindToGlobal=function(obj, key){
   if (typeof window[key] === 'undefined') {
         window[key] = {};
     }

     for (let i in obj) {
         window[key][i] = obj[i]
     } 
}
bindToGlobal(config,'_const')