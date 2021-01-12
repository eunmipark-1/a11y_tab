//1. 초기화 - 첫번째 탭과 첫번째 탭에 연관된 탭 패널 활성화 

//시각적으로 활성화 표기를 위한 클래스 추가
$('.tab:first-of-type, .tabpanel:first-of-type')
  .addClass('active')
  .attr('tabindex','0');

//의미적으로 활성화 표기를 위해 true로 설정된 aria-selected 속성 추가
$('.tab:first-of-type').attr('aria-selected','true');


//탭 초점 이동 (방향키)
$(".tab").on("keydown", function(event){
  event = event || window.event;
  event.preventDefault ? event.preventDefault() : event.returnValue = false;
  var keycode = event.keyCode || event.which;

  switch(keycode){
    case 37: //left arrow
      if(this.previousElementSibling) {
        $(this)
          .attr("tabindex", "-1")
        .prev()
          .attr("tabindex","0")
          .focus();
      }else{
        // 초점이 첫 번째 요소에 있다면, 마지막 탭으로 초점 이동
        $(this)
          .attr("tabindex", "-1");
        $(".tab:last-of-type")
          .attr("tabindex","0")
          .focus();
      }
    break;
    case 39: //right arrow
      if(this.nextElementSibling) {
        $(this)
          .attr("tabindex", "-1")
        .next()
          .attr("tabindex","0")
          .focus();
      }else {
        //초점이 마지막 요소에 있었다면, 첫 번째 탭으로 초점 이동
        $(this)
          .attr("tabindex", "-1");
        $(".tab:first-of-type")
          .attr("tabindex","0")
          .focus();
      }
    break;
    case 32: //space
    case 13: //Enter
      //선택된 탭 활성화
      $(this)
        .addClass("active")
        .attr("aria-selected","true")
      //기존 탭 비활성화
      .siblings()
        .removeClass("active")
        .attr("aria-selected", "false");
      //연관된 탭 패널 활성화
      $("#" + $(this).attr("aria-controls"))
        .attr("tabindex", "0")
        .addClass("active")
      //기존 탭 패널 비활성화
      .siblings(".tabpanel")
        .attr("tabindex","-1")
        .removeClass("active");
      break;
  }
});

$(".tablist").on("keydown", ".active", function(event){
  event = event || window.event;
  var keycode = event.keyCode || event.which;

  // tab 키 눌렀을 때 (shift + tab 은 제외)
  if(!event.shiftKey && keycode === 9) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    $("#" + $(this).attr("aria-controls"))
      .attr("tabindex","0")
      .addClass("active")
      .focus()
    .siblings(".tabpanel")
      .attr("tabindex","-1")
      .removeClass("active");
  }
});

//마우스 클릭에 대한 이벤트 핸들링
$(".tab").on("mousedown", function(){
  //선택된 탭 활성화
  $(this)
    .addClass("active")
    .attr({
      "tabindex" :"0",
      "aria-selected" :"true"
    })
    .focus()
  // 기존 탭 비활성화
  .siblings()
    .removeClass("active")
    .attr({
      "tabindex" : "-1",
      "aria-selected" : "false"
    });
  //연관된 탭 패널 활성화
  $("#"+$(this).attr("aria-controls"))
    .attr("tabindex","0")
    .addClass("active")
  //기존 탭 패널 비활성화
  .siblings(".tabpanel")
    .attr("tabindex","-1")
    .removeClass("active");

});