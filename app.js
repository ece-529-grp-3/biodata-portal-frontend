const click = document.getElementById('submit');
const form = document.getElementById('regform');
const xml = new XMLHttpRequest();
const idtest = document.getElementById("test");
const table = document.getElementById("table");
/*student variables*/
const stdnt = document.getElementById("studentLayout");
const checkreg = document.getElementById("indexregno")
const regregnumber = document.getElementById("regnumber")
let returnedForm = '';

xml.open("GET", "https://student-biodata-api-e089235e13e4.herokuapp.com/api/biodata/");
xml.send();
xml.responseType = "json";
xml.onload = () => {
  if (xml.readyState == 4 && document.readyState === "complete" && xml.status == 200) {
    console.log(xml.response);
    const returnedForm = JSON.parse(JSON.stringify(xml.response));
    console.log(returnedForm[0]);
    console.log(returnedForm[0].first_name);
  } else {
    console.log(`Error: ${xml.status}`);
  }
};

function addtab(){
  const returnedForm = JSON.parse(JSON.stringify(xml.response));
  console.log("enetered at all?");
  console.log(xml.response);
  console.log(`length is ` + returnedForm.length);
  table.innerHTML = ``;
  for (let j=0; j<(returnedForm.length); j++){
    console.log(j + `has printed`);
    table.innerHTML += `<tr>
                    <th scope="row">${j}</th>
                    <td>${returnedForm[j].first_name}</td>
					<td>${returnedForm[j].last_name}</td>
					<td>${returnedForm[j].date_of_birth}</td>
          <td>${returnedForm[j].gender}</td>
          <td>${returnedForm[j].reg_number}</td>
					</tr>`;
        }
}

function addOneStudent(){
  const returnedForm = JSON.parse(JSON.stringify(xml.response));
  console.log(xml.response);
  console.log(`addOne length is ` + returnedForm.length);
  document.getElementById("err").innerHTML = ``
  for (let i=0; i<(returnedForm.length); i++){
    for (const key in returnedForm[i]){
      if (returnedForm[i].reg_number == checkreg.value){
      console.log(key + ` : ` + returnedForm[i][key]);
      return (i);
      }
      else
      {
        console.log("not found");
      }
    }
  }
document.getElementById("err").innerHTML = `STUDENT DOES NOT EXIST/CAN'T BE FOUND`
}

function printOne(){
  if (xml.readyState == 4){
  returnedForm = JSON.parse(JSON.stringify(xml.response));
  console.log(xml.response);
  console.log(`printOne length is ` + returnedForm.length);
  i = addOneStudent();
  stdnt.innerHTML = `<div class="row centerbox col-12">
					<div class="row selrow">
						<span class="centertext col-12">STUDENT BIODATA</span>
					</div>
					<div class="row selrow">
          
						<span class="studenttext col-12">FIRSTNAME: ${returnedForm[i].first_name}</span>
					</div>
                    <div class="row selrow">
						<span class="studenttext col-12" >SURNAME: ${returnedForm[i].last_name}</span>
					</div>
                    <div class="row selrow">
						<span class="studenttext col-12" >DATE OF BIRTH: ${returnedForm[i].date_of_birth}</span>
					</div>
                    <div class="row selrow">
						<span class="studenttext col-12" >GENDER: ${returnedForm[i].gender}</span>
					</div>
                    <div class="row selrow">
						<span class="studenttext col-12">REGISTRATION NUMBER: ${returnedForm[i].reg_number}</span>
            </div>
					</div>`;
          }
}

document.getElementById("indexregno").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("submit").click();
  }
});

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log("click");
    formData = new FormData(e.target);
    //check if Reg.No already exists
    const returnedForm = JSON.parse(JSON.stringify(xml.response));
    console.log(returnedForm);
    document.getElementById("err").innerHTML = ``
    for (let k=0; k<(returnedForm.length); k++){
    for (const key in returnedForm[k]){
    if (returnedForm[k].reg_number == regregnumber.value){
      console.log(key + ` : ` + returnedForm[k][key]);
      document.getElementById("err").innerHTML = `THIS REG NUMBER ALREADY EXISTS`
      return (k);
      }
      else
      {
        console.log("not found");
      }}}

    try {
    document.getElementById('submit').style.display = 'none';
		const formData = new FormData(form);
    const url = "https://student-biodata-api-e089235e13e4.herokuapp.com/api/biodata/";
		const responseData = await postFormDataAsJson({ url, formData });
		console.log({ responseData });
    document.getElementById('loading').innerHTML = `UPLOADED!`
    window.location.href = "index.html";
	} catch (error) {
		console.error(error);
	}

    async function postFormDataAsJson({ url, formData }) {
      const plainFormData = Object.fromEntries(formData.entries());
      const formDataJsonString = JSON.stringify(plainFormData);
      const fetchOptions = {
		  method: "POST",
		  headers: {
			  "Content-Type": "application/json",
			  Accept: "application/json",
		  },
		  body: formDataJsonString,
      };
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
      }
      return response.json();
    }
});