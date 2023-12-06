Description of variables declared:
selectMenu: capturing select container, filling hours and minutes in dropdown
Alarm: array containing alarm object
AlarmList: capturing the ul id, and later appending li to it

Description of functions used:
renderList(): creating the list of array Alarm
deleteID(): deleting the id selected from array and then passing it to render list
handleClickEvent(): checks if set alarm or delete is clicked, and then take action accordingly

Set Interval function is performing 2 activities
1) Updating time every second by the use of date object.
2) Comparing current time with the objects present in alarm array, if all attributes of time and object match, alert is displayed
