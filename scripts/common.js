const getEl = (id) => document.getElementById(id);
const show = (id) => getEl(id).classList.remove("hidden");
const hide = (id) => getEl(id).classList.add("hidden");
const set = (id, text) => {
  getEl(id).innerHTML = text;
};
