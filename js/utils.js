// Request
const getProducts = (url) => {
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    });
};

// Form Validation
const validation = (name, last, address, city, email) => {
  const expRegMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const expReg = /[0-9]/;

  name.addEventListener("change", () => {
    if (name.value === null || expReg.test(name.value)) {
      firstNameErrorMsg.innerText = `Le prenom n'est pas valide`;
    } else {
      firstNameErrorMsg.innerText = ``;
    }
  });

  last.addEventListener("change", () => {
    if (last.value === null || expReg.test(last.value)) {
      lastNameErrorMsg.innerText = `Le nom n'est pas valide`;
    } else {
      lastNameErrorMsg.innerText = ``;
    }
  });

  address.addEventListener("change", () => {
    if (address.value === null || address.value === "") {
      addressErrorMsg.innerText = `Le adress n'est pas valide`;
    } else {
      addressErrorMsg.innerText = ``;
    }
  });

  city.addEventListener("change", () => {
    if (city.value === null || city.value === "") {
      cityErrorMsg.innerText = `Le city n'est pas valide`;
    } else {
      cityErrorMsg.innerText = ``;
    }
  });

  email.addEventListener("change", () => {
    if (!expRegMail.test(email.value)) {
      errMsjEmail.innerText = `L'email n'est pas valide`;
    } else {
      errMsjEmail.innerText = ``;
    }
  });
};

// Input Validation
const alertValidation = (input, msj) => {
  input.addEventListener("change", () => {
    if (input.value > 100) {
      const errMsgContainer = input.parentElement;
      const errMsg = document.createElement("p");
      errMsgContainer.append(errMsg);
      errMsg.setAttribute("style", "color:white");
      errMsg.innerHTML = msj;
    } else {
      delete alert;
    }
  });
};
