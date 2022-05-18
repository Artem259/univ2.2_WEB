let form = document.getElementById("feedback-form");
let elements = Array.from(document.getElementsByClassName("feedback-form-item-input"));
let button = document.getElementById("feedback-form-submit");

document.getElementById("feedback-open").onclick = () => {
	document.getElementById("feedback").style.display = "block";
	setTimeout(() => {
		document.getElementById("feedback").className = "shown";
	}, 1);
}
document.getElementById("feedback-close").onclick = () => {
	document.getElementById("feedback").className = "";
	setTimeout(() => {
		document.getElementById("feedback").style.display = "none";
		
		elements.forEach((elem) => {
			elem.className = "feedback-form-item-input";
			elem.placeholder = "";
		})
	}, 1000);
}

elements.forEach((elem) => {
	elem.onfocus = () => {
		elem.className = "feedback-form-item-input";
		elem.placeholder = "";
	}
})

let inputPlaceholder = {
	"Name": "#",
	"Phone": "Помилка вводу. Приклад: +38 095 777 7777",
	"Email": "Помилка вводу. Приклад: email@domain.abc",
	"Message": "#"};
button.onclick = (event) => {
	let flag = true;

	event.preventDefault();
	elements.forEach((elem) => {
		if(!elem.checkValidity()){
			flag = false;
			elem.className = "feedback-form-item-input input-invalid";

			if(elem.value=="" && elem.placeholder!=inputPlaceholder[elem.name]){
				elem.placeholder = "Це поле обов'язкове для заповнення";
			}
			else{
				elem.value = "";
				elem.placeholder = inputPlaceholder[elem.name];
			}

		}
	})

	if(flag) form.submit();
}

