// WHAT IS A WEB SERVER
/*
                            URL
Browser -------------------------------------------> DNS Server
                        IP ADDRESS
        <-------------------------------------------
                http/https (e.g. GET/friends)
        -------------------------------------------> HTTP Server
                JSON, XML, TXT, IMG, VIDS
        <-------------------------------------------

* browser requests for a specific DNS
* DNS Server looks up the internet protocol address of the server being requested (URL)
* DNS Server sends back the IP (Internet Protocol) address of the URL back to our browser (e.g. 0-255.0-255.0-255.0-255)
* The browser then uses the IP address to communicate with the HTTP Server where we get the resources required to load the URL
* The HTTP/HTTPS Server then sends back all the data we need to display the page/website
*/

/* Introduction to HTTP responses and requests

* HTTP REQUESTS EXAMPLE
  METHOD: POST
  PATH: /messages
  BODY: {text: "hello", photo: "smile.jpg"}
  HEADERS: Host:facebook.com (headers are used to send additional meta data to the server)

  NOTE: It is a requirement to add the 'host' on the header of every request. This specifies which server the request is being sent to.

* HTTP RESPONSES EXAMPLE
  HEADERS: Content-Type: application/json
  BODY: {text: "hi", photo: "wave.jpg"}
  *** difference between a request and response is the STATUS CODE ***
  STATUS CODE: (100 - 199 -> INFORMATIONAL RESPONSES) 
               (200 - 299 SUCCESSFUL (200))
               (300 - 399) REDIRECTS
               (400 - 499) CLIENT ERRORS 401 - Unauthorized (not authenticated/not logged in), 403 - Forbidden (Client is not allowed to access...), 404 - Not found (URL that we're trying to access from the server is pointing to a resource that does not exist or the server does not recognize.)
               (500 - 599) SERVER ERRORS
*/

/* What is an API? (Application Programming Interface)
API is the acronym for Application Programming Interface, which is a software intermediary that
allows two applications to talk to each other. Each time you use an app like Facebook,
send an instant message, or check the weather on your phone, you're using an API.
*/

// SAME ORIGIN POLICY
/*

* WHAT IS AN ORIGIN 
* Consists Of:
              * URL: https://www.google.com/maps/
              * Protocol: https://
              * Host: www.google.com
              * Port: https://www.google.com:443/maps -> :443
              

* SAME ORIGIN POLICY -> Security policy by the browser that restricts what is allowed to load by the browser when browsing the internet.
                     -> It allows us to browse websites with less risk of your data being stolen.
  * ILLUSTRATION:
  
   Browser -----------------------------------------> HTTP SERVER (https://google.com)
      |---------------------------------------------> HTTP SERVER (https://facebook.com)
    
  * If you are currently on a specific page on your browser (google.com), any HTTPS request from google.com is allowed.but while
  * you're currently in the page (google.com), any requests for data from 'facebook.com' is not allowed for security purposes.
  
  * Requests to get information from a cross-origin domain are not allowed by the browser. 
  
  * EXCEPTION: WRITES: POST requests -> submit some data to the server but not the other way around.


* CROSS ORIGIN RESOURCE SHARING -> is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or   port) other than its own from which a browser should permit loading resources.
                                -> set the 'access-control-allow-origin' header in the response headers (controlled by the server) to allow an exception when we know that requests from a different location are safe and expected.
  
  * CORS HEADER
    * Access-Control-Allow-Origin: https://www.google.com -> we can include a specific origin as a value of the header.
                                                          -> here, we allow the request from google to get the data from wikipedia.org
                                                          -> wikipedia will need to set a header that includes google.com in the list 
                                                             of allowed origins and then send that header back when we make that
                                                             request from javascript.
    // Or alternatively, from wikimedia (our example is the CORS on wikipedia.org) to set Access-Control-Allow-Origin to allow all:
       * Access-Control-Allow-Origin: * (allows requests from any origin)

    * CORS follows 'Whitelisting' policy.
    * Whitelisting is the practice of explicitly allowing access to a particular privilege or service. It is the opposite of blacklisting.

* SAME ORIGIN POLICY & CROSS ORIGIN RESOURCE SHARING IS DONE BY THE BROWSER *
*/
