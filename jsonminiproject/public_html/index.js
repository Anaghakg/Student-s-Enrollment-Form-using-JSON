/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var stdDBName="SCHOOL-DB";
var stdRelationName="STUDENT-TABLE";
var connToken="90931700|-31949325527890180|90961661";
$("#rollno").focus();

function saveRecNo2LS(jsonObj)
{
    var lvData= JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getrollnoAsJsonObj()
{
    var rollno=$("#rollno").val();
    var jsonStr={
        id:rollno
    };
    return JSON.stringify(jsonStr);
}


function fillData(jsonObj)
{
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $("#name").val(record.name);
    $("#stdclass").val(record.stdclass);
    $("#stddob").val(record.stddob);
    $("#address").val(record.address);
    $("#enroll").val(record.enroll);
}

function resetForm() {
    $("#rollno").val("");
    $("#name").val("");
    $("#stdclass").val("");
    $("#stddob").val("");
    $("#address").val("");
    $("#enroll").val("");
    $("#rollno").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#update").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#rollno").focus();
}

function validateData()
{
    var rollno,name,stdclass,stddob,address,enroll;
    rollno=$("#rollno").val();
    name=$("#name").val();
    stdclass=$("#stdclass").val();
    stddob=$("#stddob").val();
    address=$("#address").val();
    enroll=$("#enroll").val()
    if (rollno==="")
    {
        alert("Studen Roll No missing");
        $("#rollno").focus();
        return "";
    }
    if (name==="")
    {
        alert("Student name missing");
        $("#name").focus();
        return "";
    }
    if (stdclass==="")
    {
        alert("Student class missing");
        $("#stdclass").focus();
        return "";
    }
    if (stddob==="")
    {
        alert("Student DOB missing");
        $("#stddob").focus();
        return "";
    }
    if (address==="")
    {
        alert("Address missing");
        $("#address").focus();
        return "";
    }
    if (enroll==="")
    {
        alert("enrollment date missing");
        $("#enroll").focus();
        return "";
    }
    var jsonStrObj={
        id:rollno,
        name:name,
        stdclass:stdclass,
        stddob:stddob,
        address:address,
        enroll:enroll
    };
    return JSON.stringify(jsonStrObj);
}

function getstd()
{
    var rollnoJsonObj=getrollnoAsJsonObj();
    var getRequest= createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, rollnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj=executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status===400)
    {
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#name").focus(); 
    }
    else if (resJsonObj.status===200)
    {
        $("#rollno").prop("disabled",true);
        fillData(resJsonObj);
        $("#update").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#name").focus(); 
    }
}

function saveData()
{
    var jsonStrObj= validateData();
    if(jsonStrObj==="")
    {
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj, stdDBName, stdRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj=executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
}
function updateData()
{
    $("#update").prop("disabled",true);
    jsonChg=validateData();
    var updateRequest=createUPDATERecordRequest(connToken,jsonChg,stdDBName,stdRelationName,localStorage.getItem("recno"))
    jQuery.ajaxSetup({async: false});
    var resJsonObj=executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}
