
/* ===============================================SIDEBAR-EXPAND/SHRINK============================================*/
$('.sidebar-toggle-inactive').click(function(){
  $(this).toggleClass("click");
   $('#SideMenu .sidebar').toggleClass("show");
   sidebarExpand();
   $('#Email-section .form-control').toggleClass("width");
   $('#Password-section .form-control').toggleClass("width");
});     