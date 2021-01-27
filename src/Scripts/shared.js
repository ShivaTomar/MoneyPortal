/* ===============================================SIDEBAR-EXPAND/SHRINK============================================*/
$('.sidebar-toggle-active').click(function () {
  $(this).toggleClass("click");
  $('.text-primary').toggleClass("Hide");
  $('nav .feat-btn .toggle').toggleClass("rotate");
  sidebarExpand();
});

const sidebarExpand = function () {
  $('.title').toggleClass("Hide");
  $('.sidebar').toggleClass("Shrink");
  $('.sidebar-header').toggleClass("change");
  $('.heading').toggleClass("change");
  $('ul li  a').toggleClass("change");
  $('.vertical-border').toggleClass("change");
  $('.unstyled-lists li a i .fas').toggleClass("change");
  $('.sidebar ul li .feat-btn span.fas').toggleClass("change");
  $('#feat-Household span.fas').toggleClass("change");
  $('.page-content').toggleClass("marginAdd");
  $('.text-primary').toggleClass("show");
  $('.page-content').toggleClass("set");
};

/* ===============================================SIDEBAR-LIST-EXPAND/SHRINK============================================*/

$('.feat-btn').click(function () {
  $(this).toggleClass("click");
  $('nav ul .feat-show').slideToggle(300);
  $('nav .feat-btn .toggle').toggleClass("rotate");
});


$(document).on('click', '#ba-parent li', function () {
  if (isFirstChild == false) {
    $(this).addClass('active').siblings().removeClass('active');
    $('ul li').removeClass('active-primary');
  }
  else isFirstChild = false;
});

document.getElementById('ba-parent li')

$(document).on('click', '#first-child', function () {
  $(this).addClass('active-primary');
  $('ul li li').removeClass('active');
});

/* ===============================================SIDEBAR-LIST-ACTIVE-TOGGLE CLASS============================================*/
var addContainer = document.querySelector("#modal-add-Bank-Account");
var addContent = document.querySelector("#modal-add-Bank-Account .modal-content");

const showaddModal = function () {
  addContainer.classList.add("modal-visible");
  addContent.classList.add("modalcontent-transaction");
};

const hideaddModal = function () {
  addContainer.classList.remove("modal-visible");
  addContent.classList.remove("modalcontent-transaction");
};

var isFirstChild = false;
function bankmodel() {
  showaddModal();
  isFirstChild = true;
}

$('#add-bank-account').on("click", () => {
  showaddModal();
})

addContainer.addEventListener("click", function () {
  hideaddModal();
});

addContent.addEventListener("click", function () {
  event.stopPropagation();
});

$('#modal-add-Bank-Account .data-dismiss').on("click", () => {
  hideaddModal();
})