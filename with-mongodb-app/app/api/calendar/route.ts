import { NextResponse } from "next/server"

export async function POST(request: { json: () => PromiseLike<{ hobby: any; eventName: any; day: any; month: any; year: any; startHour: any; startMin: any; endHour: any; endMin: any; repeat: any; }> | { hobby: any; eventName: any; day: any; month: any; year: any; startHour: any; startMin: any; endHour: any; endMin: any; repeat: any; }; }){  
    try{
        const {hobby, eventName, day, month, year, startHour, startMin, endHour, endMin, repeat} = await request.json()
        console.log(hobby)
        console.log(eventName)
        console.log(day)
        console.log(month)
        console.log(year)
        console.log(startHour)
        console.log(startMin)
        console.log(endHour)
        console.log(endMin)
        console.log(repeat)

        let event = JSON.stringify({
            'kind': 'calendar#event',
            'summary': eventName,
            'description': 'HOBBY HELPER GENERATED REMINDER'+hobby,
            'start': {
              'dateTime': '20'+year+'-'+month+'-'+day+'T'+startHour+':'+startMin+':00',
              'timeZone': 'America/Chicago'
            },
            'end': {
              'dateTime': '20'+year+'-'+month+'-'+day+'T'+endHour+':'+endMin+':00',
              'timeZone': 'America/Chicago'
            },
            'recurrence': [
                'RRULE:FREQ='+repeat+';INTERVAL=1'
            ]
          })
      
        return NextResponse.json({message: "sent to google calendar", status: 201, event})
    } catch(err) {
        console.log(err)
    }
}