<html>
  <head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
      <h1 class="header">URL Shortener Microservice</h1>
      <img src="https://avatars0.githubusercontent.com/tomzurales?&amp;s=128">
      <h3>By: Tom Zurales</h3>
      <blockquote>
        <h4>User Stories</h4>
        <ul>
          <li>I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.<br><br></li>
          <li>If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.<br><br></li>
          <li>When I visit that shortened URL, it will redirect me to my original link.</li>
        </ul>
      </blockquote>
      <h2>Example Usage:</h2>
      <p>
        <h4>Short URL Creation Request:</h4>
        <code>https://mighty-falls-38118.herokuapp.com/new/https://google.com/<br></code>
        <h4>Response:</h4>
        <code>{"original_url":"https://google.com/","short_id":"https://mighty-falls-38118.herokuapp.com/3124"}<br></code>
        <br>
        <h4>Shortened URL Request:</h4><code>https://mighty-falls-38118.herokuapp.com/3124/</code>
        <h4>Response:</h4>
        <code>Redirects to https://google.com/</code>
      </p>
    </div>
  </body>
</html>
