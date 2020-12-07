var shoplist={};
shoplist.name="MyBuylist 購物清單";
shoplist.time="2020/10/6";
shoplist.list=[
  {name:"吹風機",price: 300},
  {name:"麥克筆",price: 9000},
  {name:"筆記型電腦",price: 54555},
  {name:"iphone 9",price: 32000},
  {name:"神奇海螺",price: 5000}
];
var itemurl="https://awiclass.monoame.com/api/command.php?type=get&name=itemdata";

$.ajax({
  url: itemurl,
  success: function(res){
    shoplist.list=JSON.parse(res);
    showlist();
  }
});
var item_html="<li id={{id}} class='buy_item'>{{num}}.{{item}}<div class='price'>{{price}}</div><div id={{del_id}} data-del-id='{{delid}}' class='del_btn'>x</div></li>";

var total_html="<li class='buy_item total'>總價<div class='price'>{{price}}</div></li>";

function showlist(){
  $("#item_list").html("");
  var total_price=0;
  for(var i=0;i<shoplist.list.length;i++){
    var item=shoplist.list[i];
    var item_id="buyitem_"+i;
    var del_item_id="del_buyitem_"+i;
    total_price+=parseInt(item.price);
    var current_item_html=
        item_html.replace("{{num}}",i+1)
                 .replace("{{item}}",item.name)
                 .replace("{{id}}",item_id)
                 .replace("{{del_id}}",del_item_id)
                 .replace("{{price}}",item.price)
                 .replace("{{delid}}",i)
    ;
    $("#item_list").append(current_item_html);
    $("#"+del_item_id).click(
      function(){
        remove_item($(this).attr("data-del-id"));
      }
    );
  }
  var current_total_html=
      total_html.replace("{{price}}",total_price);
  $("#item_list").append(current_total_html);
}
showlist();
$(".addbtn").click(
  function(){
    shoplist.list.push(
      {
        name: $("#input_name").val(),
        price: $("#input_price").val()
      }
    );
    $("#input_name").val("");
    $("#input_price").val("");
    showlist();
  }
);

function remove_item(id){
  shoplist.list.splice(id,1);
  showlist();
}
