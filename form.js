"use strict";

const form = document.querySelectorAll("form"),
  input = document.querySelectorAll("input"),
  message = {
    loading: "Идёт отправка данных",
    success: "Данные получены. Я свяжусь с вами через несколько минут.",
    failure: "Ошибка сервера. Пожалуйста, позвоните по номеру телефона!",
  };

const postData = async (url, data) => {
  document.querySelector("form_txt").textContent = message.loading;

  let res = await fetch(url, {
    method: "POST",
    body: data,
  });

  let result = await res.json();
  return result;
};

const clearInputs = () => {
  input.forEach((item) => {
    item.value = "";
  });
};

form.forEach((item) => {
  item.addEventListener("submit", (e) => {
    e.preventDefault();

    let statusMessage = document.createElement("div");
    statusMessage.classList.add("form_txt");
    item.appendChild(statusMessage);

    const formData = new FormData(item);

    postData("mailer/smart.php", formData)
      .then((result) => {
        console.log(result);
        statusMessage.textContent = message.success;
      })
      .catch(() => {
        statusMessage.textContent = message.failure;
      })
      .finally(() => {
        clearInputs();
        setTimeout(() => {
          statusMessage.remove();
        }, 5000);
      });
  });
});
