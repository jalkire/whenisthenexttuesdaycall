module.exports = async function (context, req) {
    Date.prototype.addDays = function(days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    function getNextDayOfWeek(date, dayOfWeek) {
        var resultDate = new Date(date.getTime());
        resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
        return resultDate;
    }

    function ISO8601_week_no(dt) {
        const tdt = new Date(dt.valueOf());
        const dayn = (dt.getDay() + 6) % 7;
        tdt.setDate(tdt.getDate() - dayn + 3);
        const firstThursday = tdt.valueOf();
        tdt.setMonth(0, 1);
        if (tdt.getDay() !== 4) {
            tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - tdt) / 604800000);
    }

    let target  = new Date();
    const today = new Date();

    if (target.getDay != 2) {
        target = getNextDayOfWeek(target, 2);
    } 

    const weekNr = ISO8601_week_no(target);
    
    if(weekNr % 2 == 0) target.addDays(7);

    let nextcall;
    if (today.toDateString() == target.toDateString()) {
        nextcall = 'Today';
    } else {
        nextcall = target.toLocaleDateString();
    }
    
    const responseMessage = `
    <!DOCTYPE html>
    <html>
    <head>
    <title>${nextcall}</title>
    </head>
    <body>

    <h1>The next Every Other Tuesday Call is ${nextcall} at 7:00 PT!</h1>

    </body>
    </html>`;

    context.res = {
        body: responseMessage,
        headers: {
            "Content-Type": "text/html"
        }
    };
}
