import { NextResponse } from "next/server"

//This route takes the data submitted from the calendar dashboard form and turns it into JSON format
//It will be used to create an event in the user's Google Calendars
export async function POST(request: { json: () => PromiseLike<{ hobby: any; eventName: any; day: any; month: any; year: any; startHour: any; startMin: any; endHour: any; endMin: any; repeat: any; }> | { hobby: any; eventName: any; day: any; month: any; year: any; startHour: any; startMin: any; endHour: any; endMin: any; repeat: any; }; }){  
    try{
      //Recieve event data from the form user submitted
        const {hobby, eventName, day, month, year, startHour, startMin, endHour, endMin, repeat} = await request.json()
        //Format data into something Google Calendar can understand
        let event = JSON.stringify({
            'kind': 'calendar#event',
            'summary': eventName,
            'description': 'HOBBY HELPER GENERATED REMINDER '+ hobby,
            'start': {
              'dateTime': '20' + year + '-' + month + '-' + day + 'T' + startHour + ':' + startMin + ':00',
              'timeZone': 'America/Chicago'
            },
            'end': {
              'dateTime': '20' + year + '-' + month + '-' + day + 'T' + endHour + ':' + endMin + ':00',
              'timeZone': 'America/Chicago'
            },
            'recurrence': [
                'RRULE:FREQ=' + repeat + ';INTERVAL=1'
            ]
          })
          //Return the JSON object version of the calendar event to be sent to Google Calendar
        return NextResponse.json({message: "sent to google calendar", status: 201, event})
    } catch(err) {
        //Log error if something goes wrong in this process 
        return NextResponse.json({message: "error in creating calendar event", status: 404})
    }
}