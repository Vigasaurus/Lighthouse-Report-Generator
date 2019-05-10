# Lighthouse Report Viewer
Lighthouse Report Viewer uses https://web.dev/measure to create and open Lighthouse Reports for any publicly hosted site right from the site.

### Description 
This extension takes the current page you are viewing and passes it through Google's Lighthouse audit tool, without needing to use Chrome or the Lighthouse CLI. It works on any publicly hosted website, running through https://web.dev/measure - it does not as of now work on locally hosted sites, or on websites handled with a hosts.txt modification.

### Distribution
This is currently only available on the[ Firefox Add-On Store](https://addons.mozilla.org/en-US/firefox/addon/lighthouse-report-generator/), as it would be unnecessary on Chrome. 

### Screenshots
<div style="display: flex">
<div>
####Initial Popup
![](https://addons.cdn.mozilla.net/user-media/previews/full/219/219079.png)
</div>
<div>

####In Progress Report Generation
![](https://addons.cdn.mozilla.net/user-media/previews/thumbs/219/219082.png)
</div>
</div>
<div style="display: flex">
<div>
####Successful Report Creation
![](https://addons.cdn.mozilla.net/user-media/previews/thumbs/219/219083.png)
</div>
<div>
####Invalid URL Report Generation
![](https://addons.cdn.mozilla.net/user-media/previews/thumbs/219/219081.png)
</div>
</div>
###Roadmap
 - Ensure Viewer Opens in Dark Mode
 - Automatically Forward to User-Facing Report Viewer
 - Add Options to Automatically Grab Existing Reports
 - Add Options to Store Previously Generated Reports for Historical Viewing


### License
This addon is licensed under the GNU GPL v3 License. 