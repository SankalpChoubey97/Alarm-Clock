const selectMenu=document.querySelectorAll("select");//variable for filling hours and minutes
let Alarm=[];//alarm array
const AlarmList = document.getElementById('list');//capturing ul id

//filling hours and minutes from 1-12 and 0-60 
for(let i=12;i>0;i--)
{
	const c=i<10? "0"+i:i;
	let option=`<option value="${c}">${c}</option>`;
	// console.log(option);
	selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59;i>=0;i--)
{
	const c=i<10? "0"+i:i;
	let option=`<option value="${c}">${c}</option>`;
	// console.log(option);
	selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

function setAlarmToDom(task)
{
	const li=document.createElement('li');

	li.innerHTML=`<label for="${task.id}">${task.hour}:${task.minutes} ${task.ampm}</label>
          <img src="image/delete.jpg" class="delete" data-id="${task.id}">`;

    AlarmList.append(li);

}
function renderList()
{
	AlarmList.innerHTML='';

	for(let i=0;i<Alarm.length;i++)
	{
		setAlarmToDom(Alarm[i]);
	}

}

//Deleting alarm
function deleteID(taskID){
	let newAlarm=[];

	for(let i=0;i<Alarm.length;i++)
	{
		if(Alarm[i].id!=taskID)
		{
			newAlarm.push(Alarm[i]);
		}
	}

	Alarm=newAlarm;
	renderList();
	// alert("Alarm deleted successfully");
}

//handling click for set alarm and delete alarm
function handleClickEvent(e)
{
	let target=e.target;

	//if set alarm button is clicked, perform below events
	if(target.className=='set')
	{
		let h=selectMenu[0].value;
		let m=selectMenu[1].value;
		let ap=selectMenu[2].value;

		console.log(h,m,ap);

		//if input is not proper
		if(h=='Hour' || m=='Minutes' || ap=='AM/PM')
		{
			alert("enter hours, minutes and AM/PM for setting alarm");
			return;
		}

		//if proper input is given
		let obj={
			hour: h,
			minutes: m,
			ampm: ap,
			id: Date.now().toString(),
		};

		//check if alarm is already present, display alert message in that case
        for(let i=0;i<Alarm.length;i++)
        {
        	if(Alarm[i].hour==obj.hour && Alarm[i].minutes==obj.minutes && Alarm[i].ampm==obj.ampm)
        	{
        		alert("Alarm for this time is already present");
        		return;
        	}
        }

		Alarm.push(obj);
		renderList();
		return;
	}

	//if delete is clicked
	if(target.className=='delete')
	{
		deleteID(target.dataset.id);
		return;
	}
}

//set click event for set alarm and delete alarm
document.addEventListener('click',handleClickEvent)

//variables for displaying time
let hrs=document.getElementById('hrs');
let mins=document.getElementById('mins');
let sec=document.getElementById('seconds');
let AMPM=document.getElementById('ampm');

//for setting current time and alarm functionality
setInterval(function(){
	let currentTime=new Date();
	//determining AM,PM
	if(currentTime.getHours()<12)
	{
		AMPM.innerHTML='AM';
	}
	else
	{
		AMPM.innerHTML='PM';
	}

	let h;
	if(currentTime.getHours()<13)
	{
		h=currentTime.getHours();
	}
	else
	{
		h=currentTime.getHours()-12;
	}
	hrs.innerHTML=(h<10?"0":"")+h;
	mins.innerHTML=(currentTime.getMinutes()<10?"0":"")+currentTime.getMinutes();
	sec.innerHTML=(currentTime.getSeconds()<10?"0":"")+currentTime.getSeconds();

//for alarm functionality
	if(Alarm.length>0)
	{
		for(let i=0;i<Alarm.length;i++)
		{
			if(Alarm[i].ampm=='AM')
			{
				if(Alarm[i].hour==12)
				{
					if(currentTime.getHours()==0 && currentTime.getMinutes()==Alarm[i].minutes && currentTime.getSeconds()==0)
					{
						alert("Alarm");
						console.log("alarm");
					}

				}
				else
				{
					if(currentTime.getHours()==Alarm[i].hour && currentTime.getMinutes()==Alarm[i].minutes && currentTime.getSeconds()==0)
					{
						alert("Alarm");
						console.log("alarm");
					}
				}	
			}
			else
			{
				if(Alarm[i].hour!=12)
				{
					if((currentTime.getHours()-12)==Alarm[i].hour && currentTime.getMinutes()==Alarm[i].minutes && currentTime.getSeconds()==0)
					{
						alert("Alarm");
						console.log("alarm");
					}
				}
				else
				{
					if(currentTime.getHours==12 && currentTime.getMinutes()==Alarm[i].minutes && currentTime.getSeconds()==0)
					{
						alert("Alarm");
						console.log("alarm");
					}
				}

			}
		}
	}
},1000);
