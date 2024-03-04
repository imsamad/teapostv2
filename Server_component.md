React Server Component -

Can exclusvely run on server.

#### Client Component

-

- User visit website.com
- NodeJS or any server runtime recieve the request send back index.html.
- HTML is parsed in browser which have \<script\ src="bundle.js"/> tag inside it, browser hit the server to get back bundle.js file.
- JS file on browser parsed(executed) and components are rendered after commiting to DOM to get the data from API are injected into UI, they render
