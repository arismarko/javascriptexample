// custom object constructor
var rect = function () {
    this.init();
};

rect.prototype.addRectangle =  function(){
		var self = this;
		
		var rectanglesNumber =	parseInt(ContainerInput.getAttribute("value")); 
	  		
		//Create 1 rectangle.
		self.creator(rectanglesNumber);

		rectanglesNumber = rectanglesNumber  +1;
		
		//Make changes visible on the text box.
		//Setting both so it also guarantees browser compatibility.
		ContainerInput.setAttribute("value",rectanglesNumber);
		ContainerInput.value = rectanglesNumber; 
		
};

rect.prototype.onchangeofTextBox = function(){	
		var self = this;
		
        var quantity = parseInt(ContainerInput.value);
		
		self.rectangleNumberChange(quantity);
};

rect.prototype.rectangleNumberChange = function(quantity){
	var self = this;
	
	
	var ContainerChildren = Container.children; 
	
	rectanglesNumberBefore = ContainerChildren.length; 
	rectanglesNumberAfter = quantity;
		
		if(rectanglesNumberAfter>rectanglesNumberBefore){
			var k=rectanglesNumberBefore;
			while(k!=rectanglesNumberAfter){;
				self.addRectangle();				
				k=k+1;
			}

		}else{
	
			var k=rectanglesNumberBefore;
			
			while(k!=rectanglesNumberAfter){
				self.deleteRectangle(ContainerChildren[k-1]);
				k=k-1;
			}
			
		}
		
	
	
	ContainerInputChange= true;
}

rect.prototype.initialisation = function(){	
		var self = this;
		
		var rectanglesNumber =	3;
	
		ContainerInput.setAttribute("value", rectanglesNumber);
		ContainerInput.value = rectanglesNumber; 
	
		for(var i =0; i<rectanglesNumber; i++)
			self.creator(i);	

};

rect.prototype.creator = function(RectIndex){	
			var self = this;
			
			var rectangleBox = "rect"+RectIndex+"-box";		
			var editor = "editor-"+RectIndex; 
			var rectangleId = 'rect'+RectIndex+'';
			var editLinkId = 'edit-link'+RectIndex; 
		    var editLinkLblId = 'edit-link-lbl'+RectIndex; 
	
			//All fields are created using client side code
			var rectangleBoxDiv=document.createElement("div")
			var rectangleDiv=document.createElement("div")
			var rectangleCPDiv= document.createElement("div"); 
			var rectangleEditor = document.createElement("div");
			
			var cpList= document.createElement("ul"); 
			var cpListItem= document.createElement("li"); 
			var cpListItembottom= document.createElement("li");
			
			var editLink = document.createElement("a");
			var editLinkLbl = document.createElement("lbl");
			var deleteLink = document.createElement("a");
			var breaker = document.createElement("br");

			rectangleBoxDiv.setAttribute("id",''+rectangleBox+'');
			rectangleBoxDiv.setAttribute("class","recangle-box clear"); 
			
			rectangleBoxDiv.appendChild(rectangleDiv);
			rectangleBoxDiv.appendChild(rectangleCPDiv); 
			
			rectangleDiv.setAttribute("class", "rect"); 
			rectangleDiv.setAttribute("id",  rectangleId); 
			rectangleCPDiv.setAttribute("class", "control-panel"); 
						
			rectangleCPDiv.appendChild(cpList); 
			cpList.appendChild(editLink);

			editLinkLbl.innerHTML = "Edit";
			editLinkLbl.setAttribute("class", "hide");
			editLinkLbl.setAttribute("id",editLinkLblId);
			
			editLink.setAttribute("href", "#"); 
			editLink.setAttribute("class", "edit"); 
			editLink.setAttribute("id", editLinkId);
			
			//settting up the editlink on click event
			editLink.onclick = function () {
				self.editRectangle(rectangleEditor,rectangleDiv,editLink,editLinkLbl); 
				return false;
			};
			
			editLink.innerHTML="Edit"; 
			
			cpListItem.appendChild(editLinkLbl);
			cpListItem.appendChild(editLink);
			cpListItembottom.appendChild(deleteLink);
			
			cpList.appendChild(cpListItem);
			cpList.appendChild(cpListItembottom); 
			
			deleteLink.setAttribute("href", "#");
			deleteLink.setAttribute("class", "remove"); 
	
			//setting up the delete link onclick event
			deleteLink.onclick = function () {
				self.deleteRectangle(rectangleBoxDiv);
				self.restoreOrder();
				return false;
			};
					
			deleteLink.innerHTML="Delete";

			rectangleEditor.setAttribute("class", "clear");
			rectangleEditor.setAttribute("id", ''+editor+''); 
			rectangleBoxDiv.appendChild(rectangleEditor); 
				
			Container.appendChild(rectangleBoxDiv);
};

rect.prototype.cancelEdit =  function (rectbox, link,linkLbl) {
		var linkElement = link;
		var linkLblElement = linkLbl;

		linkElement.setAttribute("class", ""); 
		linkLblElement.setAttribute("class", "hide");

		rectbox.innerHTML="";
};

rect.prototype.deleteRectangle = function(rectbox){
		Container.removeChild(rectbox);
		
		var rectanglesNumber =	parseInt(ContainerInput.getAttribute("value")); 	
		
		rectanglesNumber = rectanglesNumber - 1;
		
		ContainerInput.setAttribute("value",rectanglesNumber);
		ContainerInput.value = rectanglesNumber;
};

//It updates the rectangle width/height and color.
rect.prototype.updateRectangle = function (editRectBox, rect, link, linkLbl) {
		var rectangleEditBox = editRectBox; 
		var rectangle = rect;
		var linkLblElement = linkLbl;
		var linkElement = link;
		
		linkLblElement.setAttribute("class", "hide"); 
		linkElement.setAttribute("class", "");
			
	     var inputsAreas = rectangleEditBox.children;
		
	     var inputs = inputsAreas[0].children;
		 
		 var editinputs = inputs[0].children;
		 
		 var width = editinputs[1].value; 
		 var height = editinputs[3].value; 
		 var color = editinputs[5].value; 
		 
		 editinputs[1].setAttribute("value",width); 
		 editinputs[3].setAttribute("value",height); 
		 editinputs[5].setAttribute("value",color); 
		
		rectangle.setAttribute("style", 'width:'+width+'px;height:'+height+'px;background-color:'+color+';'); 
		
		rectangleEditBox.innerHTML="";
};

rect.prototype.editRectangle = function (editRectBox, rect, link, linkLbl) {
	   var self = this;
	   var self = this;
			
   	   var editRectBoxElement = editRectBox; 
	   var linkElement = link; 
	   var linkLblElement = linkLbl;
	   var rectangle = rect;
	   
	   linkElement.setAttribute("class", "hide"); 
	   linkLblElement.setAttribute("class", "");
	   
	 	//create editor html using javascript
		//Clear separation of concerns
		var editModeScreen =document.createElement("div")
		var editScreenDiv = document.createElement("div"); 
		var editCPScreenDiv = document.createElement("div"); 
		var lblWidth = document.createElement("label"); 
		var txtWidth = document.createElement("input"); 
		var lblHeight = document.createElement("label"); 
		var txtHeight = document.createElement("input");
		var txtColor = document.createElement("input"); 
		var lblColor = document.createElement("label"); 
		
		var sbtButton = document.createElement("input"); 
		var cnlButton = document.createElement("a"); 
				
		editModeScreen.setAttribute("id", "edit-mode-screen");
		editScreenDiv.setAttribute("class", "edit-screen clear");
		
		txtWidth.setAttribute("type", "text");
		txtWidth.setAttribute("id", "rectangles-width-input"); 
		txtWidth.setAttribute("name", "width"); 
			
		txtHeight.setAttribute("type", "text"); 
		txtHeight.setAttribute("id", "rectangles-height-input"); 
		txtHeight.setAttribute("name", "height");
		
		txtColor.setAttribute("type", "text");
		txtColor.setAttribute("id", "rectangles-color-input"); 
		txtColor.setAttribute("name", "color");
		
		lblWidth.innerHTML = "Width"; 
		lblHeight.innerHTML = "Height"; 
		lblColor.innerHTML = "Color";
		
		editScreenDiv.appendChild(lblWidth);
		editScreenDiv.appendChild(txtWidth);
		editScreenDiv.appendChild(lblHeight);
		editScreenDiv.appendChild(txtHeight);
		editScreenDiv.appendChild(lblColor); 
		editScreenDiv.appendChild(txtColor);
		
		editCPScreenDiv.setAttribute("class", "edit-controls");
		editCPScreenDiv.appendChild(sbtButton);
		editCPScreenDiv.appendChild(cnlButton);
		sbtButton.setAttribute("value", "Save");
		sbtButton.setAttribute("type", "submit");
		sbtButton.value="Save";
		sbtButton.value="Save";
		
		cnlButton.innerHTML = "Cancel"; 
		cnlButton.setAttribute("href", "#");
		cnlButton.setAttribute("class", "cancelB");
		
		sbtButton.onclick = function () {
			self.updateRectangle(editRectBox, rect, link, linkLbl);
			return false;
		};
		
		cnlButton.onclick = function () {
			self.cancelEdit(editRectBox,link,linkLbl); 
			return false;
		};
		
	   if(rectangle.getAttribute("style")== null){ 
		   txtWidth.setAttribute("value","300"); 
		   txtHeight.setAttribute("value","80"); 
		   txtColor.setAttribute("value","green");
	   }else{	 
			txtWidth.setAttribute("value",rectangle.style.width.replace("px","")); 
			txtHeight.setAttribute("value",rectangle.style.height.replace("px","")); 
			txtColor.setAttribute("value",rectangle.style.backgroundColor); 
	   }
	   
	   	editModeScreen.appendChild(editScreenDiv);
		editModeScreen.appendChild(editCPScreenDiv); 
	
		editRectBoxElement.appendChild(editModeScreen);
 };

rect.prototype.restoreOrder = function (){

		var ContainerChildren = Container.children; 
	
		for(var ic = 0; ic<ContainerChildren.length; ic++)
				ContainerChildren[ic].setAttribute("id", "rect" + ic + "-box"); 
}
 
rect.prototype.init = function () {
    var self = this;
	
	//Initialisation of the global variables
	Container = document.getElementById("rectangles-container");
	ContainerInput = document.getElementById("rectangles-input");
	ContainerButton = document.getElementById("addRectangle"); 
	ContainerInputChange = false;
	
	//Initialisation of the application
	self.initialisation();

	//Initialisation of the Container button on-click event
	ContainerButton.onclick = function () {
		
		if(!ContainerInputChange | navigator.appName=="Netscape"){
			self.addRectangle(); // this is bound to the anchor object
			return false;
		}else{
			ContainerInputChange= false;
		}
			
		self.restoreOrder();
		return false;
	
	};
	
	//Initialisation of the Container input on-change event
	ContainerInput.onchange = function () {
		self.onchangeofTextBox();
		self.restoreOrder();
		return false;
	};
}