/* ===============================================LOBBY-ROW-MODAL BTNS============================================*/
  //<----------Create Household PopUp-------------->
  var modalContainer = document.querySelector("#create-modal-household");
  var modalContent = document.querySelector("#create-modal-household .modal-content");

  const showModal = function(){ 
    modalContainer.classList.add("modal-visible");
    modalContent.classList.add("modalcontent-transaction");
  };

  const hideModal = function(){
    modalContainer.classList.remove("modal-visible");
    modalContent.classList.remove("modalcontent-transaction");
  };

  $('#create-household').on("click", ()=>{
    showModal();
  });

  modalContainer.addEventListener("click", function(){
    hideModal();
  });

  modalContent.addEventListener("click", function(){
    event.stopPropagation();
  });

  $('#create-modal-household .data-dismiss').on("click", ()=>{
    hideModal();
  });

  //<----------Join Household PopUp-------------->
  var joinContainer = document.querySelector("#join-modal-household");
  var joinContent = document.querySelector("#join-modal-household .modal-content");

  const showJoinModal = function(){
    joinContainer.classList.add("modal-visible");
    joinContent.classList.add("modalcontent-transaction");
  };

  const hideJoinModal = function(){
    joinContainer.classList.remove("modal-visible");
    joinContent.classList.remove("modalcontent-transaction");
  };
  
  $('#join-household').on("click", ()=>{
    showJoinModal();
  });

  joinContainer.addEventListener("click", function(){
    hideJoinModal();
  });

  joinContent.addEventListener("click", function(){
    event.stopPropagation();
  });
  
  $('#join-modal-household .data-dismiss').on("click", ()=>{
    hideJoinModal();
  });

  /*---Household event listners---*/
  $('#shc-join-bank-account').on('click', () => {
    $('#LinkAccount-modal').slideDown();
  })

  $('.btn-block-minimize').on('click', function(){
    $('#UserAccounts-form').slideToggle();
    $('#chevron').toggleClass('rotate-chevron');
    
  });

  $('.btn-block-close').on('click', function(){
    $('#LinkAccount-modal').slideUp();
  });






  
  