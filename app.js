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
    for (var pair of formData.entries()){
    console.log(pair[0] + ` : ` + pair[1]);
    }
    /*var object = {};
    formData.forEach(function(value, key){
    object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json);*/
    const response = await fetch("https://student-biodata-api-e089235e13e4.herokuapp.com/api/biodata/", {
    method: "POST",
    body: formData,
  });
});