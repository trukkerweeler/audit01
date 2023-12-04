async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
  }

export function renderWithTemplate(template, parentElement, data, callback, position = "afterbegin"){
    if (parentElement) {
      parentElement.insertAdjacentHTML(position, template);
      if (callback) {
        callback(data);
      }
    } else {
      console.error("Parent element is null or undefined.");
    }
  }

export async function loadHeaderFooter(){
    const headerTemplate = await loadTemplate("/partials/header.html");
    const headerElement = document.querySelector("#header");
    const footerTemplate = await loadTemplate('/partials/footer.html');
    const footerElement = document.querySelector("#footer");
  
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  }

  // get user value from config.json file
export async function getUserValue() {
    // const res = await fetch('config.json');
    // const data = await res.json();
    // return data.user;
    return "TKENT";
  }

  // return datetime in format YYYY-MM-DD HH:MM:SS
export function getDateTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
  
    return `${year}-${month}-${dayOfMonth} ${hours}:${minutes}:${seconds}`;
  }
