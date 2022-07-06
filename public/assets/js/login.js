const loginForm = document.querySelector('#login-form');
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let form = e.currentTarget;
  let url = form.action;
  try {
    let formData = new FormData(form);
    let responseData = await postFormFieldsAsJson({ url, formData });
    console.log(responseData);
  } catch (error) {
    console.error(error);
  }
    });

async function postFormFieldsAsJson({ url, formData }) {
  let formDataObject = Object.fromEntries(formData.entries());
  let formDataJsonString = JSON.stringify(formDataObject);
  let fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };
  console.log(fetchOptions,'fetch')
  let res = await fetch(url, fetchOptions);
  console.log(res,"res");
  if (!res.ok) {
    let error = await res.text('Status code error');
    throw new Error(error);  
  } 
  else {
    
    //  window.location.href = "/";
  }
  return res.json();  
  
}