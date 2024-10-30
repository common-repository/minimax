//Throbber class
//The constructor requires the div with the throbber, and 
//the css classes used by the div when active and inactive.
function Throbber(div, active, inactive) {
	var me = this; //Just to use me instead of this
	
	//Function to activate the trobler
	me.activate = function() {
		var aux = document.getElementById(div);
		aux.setAttribute("class", active);
		aux.setAttribute("className", active); //IE sucks
	};
	
	//Function to inactivate the trobler
	me.close = function() {
		var aux = document.getElementById(div);
		aux.setAttribute("class", inactive);
		aux.setAttribute("className", inactive); //IE sucks
	};
	
}

//Semaphore class
function Semaphore() {
	var me = this; //Just to use me instead of this if a recursived function is used
	
	var status = true; //The green or red light
	me.using = 0;
	
	//Function to set green
	me.setGreen = function() {
		status = true;
	};
	
	//Is green?
	me.isGreen = function() {
		return status;
	};
	
	//Function to set red
	me.setRed = function() {
		status = false;
	};
	
	//Is red?
	me.isRed = function() {
		return !status;
	};
	
}

//Minimax Class
//Read the answer of an URL and write the contents into a 'div'
function minimax(url, div) {	
	var me = this; //Just to use me instead of this if a recursived function is used

	//The semaphore to wait if other ajax call from the same instance have been called
	me.semaphore = false;
	var haveSemaphore = false;
	
	//The throbber to indicate we are doing someting.
	var throbber=false;
	var haveThrobber=false;
	
	//The default function to attend the event
	var set_func = function () {
		//Do we have wath we need?
		if (me.xhr.readyState == 4 && me.xhr.status==200 ) {
			var text=me.xhr.responseText;
			if(haveSemaphore) { semaphore.setGreen(); }
			if(haveThrobber) { throbber.close(); }
			if(div) { document.getElementById(div).innerHTML=text; }
		}
	};
	
	//Sets the default function
	var func = set_func;
	
	//Just to declare the XMLHttpRequest
	me.xhr = false;
	
	//Function to create a XMLHttpRequest, we need this any time we start a new request
	var startXhr=function() {
	
		if (window.XMLHttpRequest) { // It it's Mozilla, Safari etc
			me.xhr = new XMLHttpRequest();
		} else { 
			if (window.ActiveXObject) { // if it's IE
				try {
					me.xhr = new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) { // if it's and old version
					try {
						me.xhr = new ActiveXObject('Msxml2.XMLHTTP');
					} catch (f){}
				}
			} else {
				return false;
			}
		}
		
		//Event handler when get the answer
		me.xhr.onreadystatechange = func;
		return true;
		
	};
	
	//Function to set another div
	me.setDiv = function(div_x) {
		div=div_x;
	};
	
	//Function to set the event handler
	me.setFunc = function(func_x) {
		func = func_x;
	};
	
	//Function to reset the event handler
	me.resetFunc = function() {
		func = set_func;
	};
	
	//Function to declare the semaphore
	me.setSemaphore = function(aux_semaphore) {
		haveSemaphore = true;
		semaphore=aux_semaphore;
		semaphore.setGreen();
		semaphore.using++;
	};
	
	//Function to declare the throbber
	me.setThrobber = function(tdiv,on,off) {
		throbber=new Throbber(tdiv,on,off);
		haveThrobber = true;
	};
	
	//For compatibility with the old gramatical error
	//Trobbler - Throbber
	me.setTrobbler = function(tdiv,on,off) {
		throbber=new Throbber(tdiv,on,off);
		haveThrobber = true;
	};
	
	//Function to inactivate the throbber
	me.closeThrobber = function() {
		if(haveThrobber) { throbber.close(); }
	};
	
	//Function to activate the throbber
	me.activateThrobber = function() {
		if(haveThrobber) { throbber.activate(); }
	};
	
	me.get = function () {
		if(haveThrobber) { throbber.activate(); }
		//If we dont't have a semaphore or it is green, call the post.
		//Else, request another get in 1 second, for we are doing 
		//something and the result from the other process would be 
		//older than ours
		if( !haveSemaphore || semaphore.isGreen()) {
			/* Explorer only accepts POST requests */
			if(haveSemaphore) { semaphore.setRed(); }
			startXhr();
			me.xhr.open('POST', url, true);
			me.xhr.send(null);
		} else { 
			setTimeout(function (){ me.get(); }, 300);
		}
	};
	
	me.post = function (post_x) {
		if(haveThrobber) { throbber.activate(); }		
		//If we dont't have a semaphore or it is green, call the post.
		//Else, request another get in 1 second, for we are doing 
		//something and the result from the other process would be 
		//older than ours
		if( !haveSemaphore || semaphore.isGreen() ) {
			post_x=post_x.replace(/\&amp;/g, '&');
			if(haveSemaphore) { semaphore.setRed(); }
			startXhr();
			me.xhr.open('POST', url);
			me.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			me.xhr.send(post_x);
		} else { 
			setTimeout(function (){ me.post(post_x); }, 300);
		}
	};
	
}
