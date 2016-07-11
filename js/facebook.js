 var images = [];
   
	function image(name, srcSmall, srcBig, type){
		this.name = name;
		this.src = srcSmall;
		this.srcBig = srcBig;
		if (type != "header"){
			this.type = "regular";
		}else{
			this.type = type;
		}
	}
   
   $(document).ready(function(){
	console.log("loaded");
	$('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
		$(this).toggleClass('open');
	});
});
   
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '287741351559784',
      xfbml      : true,
      version    : 'v2.6'
    });
    
    if (typeof facebookInit == 'function') {
        facebookInit();
    }
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   
   
   
   function facebookInit() {
   // do what you would like here
var appId = '625963630885150';
    
    var pageAccessToken = '287741351559784|G_BLZEHOo21cSjDbo2tO6EHumyY';
   FB.api( 
  appId,{
  access_token : pageAccessToken
},
  'GET',
  {"fields":"albums{photos{images, likes, name}}", "access_token": pageAccessToken},
  function(response) {
  
  
  
  
  
  var imgSize = 8 // välj tal mellan typ 1-8 där 1 är den största filen, 8 den minsta thumbnailen.
  //console.log(response);
  var arr = $.map(response, function(el) { return el });
  console.log(arr);
  var headerLink = arr[0].data[1].photos.data[0].images[2].source;
  var newImage = new image("header", headerLink,headerLink, "header");
  images.push(newImage);
 // document.getElementById("header").innerHTML = '<img src="'+headerLink+'">';
  var imgArray =  arr[0].data[0].photos.data;
  

	for( var i = 0; i<imgArray.length; i++){
		
		var imgLinkSmall = imgArray[i].images[imgSize].source;
		var imgLinkBig = imgArray[i].images[1].source;    		
		//newHtml += '<img src="'+imgLink+'">'+ imgArray[i].name+''; 
		var newImage = new image(imgArray[i].name, imgLinkSmall, imgLinkBig);
		images.push(newImage);
	 }

	createImagesHtml();
	console.log(images);


  } 
);
   

}

function createImagesHtml(){
	var newHtml = '<div class="row">';
	for(var i=1; i<images.length-1;i++){
	
		console.log(i);
		newHtml += '<div class="col-md-4">';
		newHtml += '<div class="view view-first">';
		newHtml += ' <img src="'+images[i].src+'" />';
		newHtml += '<div class="mask">';
		newHtml += ' <h2>'+images[i].name+'</h2>';
		newHtml += '<p>Här kan man ha text, t.ex. om den är för lång för att få plats på första raden</p>';
		newHtml += '<a  href="'+images[i].srcBig+'" data-title="'+images[i].name+'" data-lightbox="gallery1"  class="info"><span class="glyphicon glyphicon-search" aria-hidden="true"></span> </a>';   
		newHtml += '</div>';
		newHtml += '</div>';
		newHtml += '</div>';	
	}
	newHtml += '</div>';
	document.getElementById("gallery-container").innerHTML = newHtml;
}