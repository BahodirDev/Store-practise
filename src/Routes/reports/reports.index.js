const { postReportsCtrForProductPost, saleReportsCtrForProductPost } = require("./reports.ctr");
const route  = require('express').Router();
route.post('/reports-post', postReportsCtrForProductPost);
route.post('/reports-sale', saleReportsCtrForProductPost)
module.exports = route;





// function postProcust(){
//     fetch('url',{}).then(data=>data.json()).then(data2=>{
//         if(data2.status == 201){
//             postReport();
//         }
//     }).catch(err)
// }


// function   postReport();(){
//     fetch('url2',{}).then(data=>data.json()).then(data2=>{
//         if(data2.status == 201){
//             postReport();
//         }
//     }).catch(err)
// }