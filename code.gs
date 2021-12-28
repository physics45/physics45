function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
  .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

var url = 'https://docs.google.com/spreadsheets/d/129rZ3682uvyiJwLh0sK4xu7LzNOoCPSIc0BAjkgoi3I/edit#gid=0'
var sh = 'Lopburi'
var folderId = '101yWtTqZEF9fdw454QBsb1Tnbs8IN568'

function processForm(formdata){
  var superscript = SuperScript.initSuper(url,sh)
  var formObject = {}
  formdata.forEach(element => formObject[element.name] = element.value)
 var newrow = [
    new Date(),
    formObject.pinnumber,
    formObject.gender,
    formObject.name,
    formObject.lastname,
    "'"+formObject.telnumber,
    formObject.schoolname,
    formObject.province
  ]
  
  var file ,file2
if(formObject.myfile.data){
   file = superscript.uploadFile(folderId,formObject.myfile.data,formObject.myfile.name)
   newrow.push(file.getUrl())
 }
 if(formObject.myfile2.data){
  file2 = superscript.uploadFile(folderId,formObject.myfile2.data,formObject.myfile2.name)
  newrow.push(file2.getUrl())
 }
  var ss= SpreadsheetApp.openByUrl(url);
  var ws=ss.getSheets()[0]
   ws.appendRow(newrow);
  // var token = 'xxx'
  // var msg = 'มีผู้ติดต่อ-สอบถาม ชื่อ '+formObject.name +' \n'+formObject.email+'\n ข้อความ '+formObject.message
  // NotifyApp.sendNotify(token,msg)
}
