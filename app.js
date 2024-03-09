const click = document.getElementById('submit');
const form = document.getElementById('regform');
const xml = new XMLHttpRequest();
const idtest = document.getElementById("test");
const table = document.getElementById("table");
/*student variables*/
const stdnt = document.getElementById("studentLayout");
let returnedForm = '';

xml.open("GET", "https://student-biodata-api-e089235e13e4.herokuapp.com/api/biodata/");
xml.send();
xml.responseType = "json";
xml.onload = () => {
  if (xml.readyState == 4 && xml.status == 200) {
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
  for (i=0; i<(returnedForm.length); i++){
    console.log(i + `has printed`);
    table.innerHTML += `<tr>
                    <th scope="row">${i}</th>
                    <td>${returnedForm[i].first_name}</td>
					<td>${returnedForm[i].last_name}</td>
					<td>${returnedForm[i].date_of_birth}</td>
          <td>${returnedForm[i].gender}</td>
          <td>${returnedForm[i].reg_number}</td>
					</tr>`;
        }
}

function addOneStudent(){
  const returnedForm = JSON.parse(JSON.stringify(xml.response));
  for (let i=0; i<(returnedForm.length); i++){
    for (const key in returnedForm[i]){
      if (returnedForm[i].reg_number == "2019364052"){
      console.log(key + ` : ` + returnedForm[i][key]);
      window.location = "student.html"
      stdnt.innerHTML += `<div class="row selrow">
						<span class="studenttext col-12">SURNAME: ${returnedForm[i].first_name}</span>
					</div>
                    <div class="row selrow">
						<span class="studenttext col-12" >FIRSTNAME: ${returnedForm[i].last_name}</span>
					</div>
                    <div class="row selrow">
						<span class="studenttext col-12" >DOB: ${returnedForm[i].date_of_birth}</span>
					</div>
                    <div class="row selrow">
						<span class="studenttext col-12" >PHONENUMBER: ${returnedForm[i].gender}</span>
					</div>
                    <div class="row selrow">
						<span class="studenttext col-12" >REGNUMBER: ${returnedForm[i].reg_number}</span>
					</div>`;
        return 0;
      }
      else
      {
        console.log("not found");
      }

    }
  }
document.getElementById("err").innerHTML += `STUDENT DOES NOT EXIST/CAN'T BE FOUND`
}

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    console.log("click");
    formData = new FormData(e.target);
    //for (var pair of formData.entries()){
    //console.log(pair[0] + ` : ` + pair[1]);
    //}
    /*var object = {};
    formData.forEach(function(value, key){
    object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json);*/
    try {
		const formData = new FormData(form);
    const url = "https://student-biodata-api-e089235e13e4.herokuapp.com/api/biodata/";
		const responseData = await postFormDataAsJson({ url, formData });

		console.log({ responseData });
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