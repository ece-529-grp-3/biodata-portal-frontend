const click = document.getElementById('submit');
const form = document.getElementById('regform');
const xml = new XMLHttpRequest();
const idtest = document.getElementById("test");
const table = document.getElementById("table")

xml.open("GET", "https://student-biodata-api-e089235e13e4.herokuapp.com/api/biodata/");
xml.send();
xml.responseType = "json";
xml.onload = () => {
  if (xml.readyState == 4 && xml.status == 200) {
    console.log(xml.response);
  } else {
    console.log(`Error: ${xml.status}`);
  }
};

function addtab(){
    table.innerHTML += `<tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
					<td>Otto</td>
					<td>@mdo</td>
					</tr>`;
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