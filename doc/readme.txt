***********************************************************************
What is minimax?

It's a minimal Ajax library. You can read files in the same 
domain but it cannot read from other domains or in a page in a computer 
reading from a file in the same computer, it has to run in a Webserver.

***********************************************************************
How to use minimax?

First you need to declare minimax.js, and it has to be in the same server 
where the page is. Second, you have to declare the instance of minimax

var minimax = new minimax('url', 'div');

where URL is the URL where we are going to get the contents, and 'div' is 
the id for the div where we are going to put the results. You can set 'div' 
as false so it wouldn't put the text in the page, but even then you can get 
the result.

Second, sometimes we can get data asyncronously, sometimes not. If you have to
get those data syncronosuly we should create a semaphore. Create an instance of
Semaphore and declare it for each instance of Minimax that would use it.

<script>
	var sm = new Semaphore();
	var mx1 = new minimax('url', 'div');
	var mx2 = new minimax('url', 'div');
	mx1.setSemaphore(sm);
	mx2.setSemaphore(sm);
</script>

Third, if you want a throbber (something to be show while geting data) you can 
declare it like two states from the same div. You need to know CSS, sorry.

mx.setTrobbler('trobbler_div', 'class_on', 'class_off');

where 'trobbler' is the id of the div, 'class_on' and 'class_off' are the
classes to switch when start the to read data (on) and stop reading data (off).

<style>
	div#trobbler {
		//any css data
	}
	
	div.on#trobbler {
		visibility : visible;
	}

	div.off#trobbler {
		visibility : hidden;
	}
</style>
<input type='hidden' id='semaphore' />
<div id='trobbler' class='off'>Reading...</div>
<div id='mx_data'>Loading...</div>
<script>
	var mx = new minimax('url', 'mx_data');
	mx.setTrobbler('trobbler', 'on', 'off');
</script>

And to get data you can use post('post') or get().

<div id='mx_data'>Loading...</div>
<script>
	var mx = new minimax('url', 'mx_data');
	mx.post('data1=1&amp;data2=2');
</script>

The contest of <div id='mx_data'> would change, using the result from the url.

If you want to get the data in a variable, insted of write it in the div, you can
declare a special function to response at the event. Close the throbber and set the 
semaphore to green if you are using them. 

<script>
        var semaphore = new Semaphore();

        var mx = new minimax('url', false); //false div, so, don't write
        
        var func = function() { // method to attend the event
                if (mx.xhr.readyState == 4 && mx.xhr.status==200 ) {
        		mx.closeThrobber();     // close the throbber only if you have one
        		semaphore.setGreen();   // we can do this because it's the semaphore
        		                        // set the semaphore to green only if you have a semaphore
                        var data=mx.xhr.responseText;
                        alert(data);
                        mx.resetFunc(); // use this function only if you want to use the default function
                }
        }
        
        mx.setSemaphore(semaphore);
        mx.setFunc(func); // this function sets the method to attend the event
	mx.get();
</script>

If you want to change the div (or span) where the text would go, you can
use setDiv()
		
<span id='new-span'>Old-text</span>
<script>
	var mx = new minimax('url', false); //false div, so, don't write
	mx.setDiv('new-span');
	mx.get();	
</script>
		
***********************************************************************
Contact
		
Ideas? Comments?
email me: sebaxtian at gawab dot com
www.sebaxtian.com
