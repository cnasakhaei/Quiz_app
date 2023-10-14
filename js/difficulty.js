const button = document.querySelectorAll("button");

const selectHandler = () => {
  const level = event.target.innerText.toLowerCase();
  localStorage.setItem("level", level);
  window.location.assign("/");
};

button.forEach((button) => {
  button.addEventListener("click", selectHandler);
});
