module.exports = async function (context, req) {
    const responseMessage = `
    <!DOCTYPE html>
    <html>
        <body>
            <h1 id="textH1"></h1>
        </body>
        <footer>
            <script>
                const getNextDayOfWeek = (date, dayOfWeek) => 
                    new Date(date.getFullYear(), date.getMonth(), date.getDate() + ((dayOfWeek - date.getDay() + 7) % 7));

                const isTuesday = date => date.getDay() == 2;
                const getNextMonth = date => new Date(date.getFullYear(), date.getMonth() + 1, 1);
                const isTheFirstDOM = date => date.getDate() < 8;

                const getNextCallString = () => {
                    const today = new Date();

                    if (isTuesday(today) && isTheFirstDOM(today))
                        return 'Today';

                    const nextTuesday = getNextDayOfWeek(today, 2);

                    if (isTheFirstDOM(nextTuesday))
                        return nextTuesday.toLocaleDateString();

                    const nextMonth = getNextMonth(today);
                    const nextMonthFirstTuesday = getNextDayOfWeek(nextMonth, 2)

                    return nextMonthFirstTuesday.toLocaleDateString();
                }

                const nextCall = getNextCallString();

                const message = \`The next Monthly Tuesday Call is \${nextCall} at 6:30 PT!`;
                document.getElementById("textH1").innerHTML = message;
                document.title = nextCall;
            </script>
        </footer>
    </html>`;

    context.res = {
        body: responseMessage,
        headers: {
            "Content-Type": "text/html"
        }
    };
}
