function formatDate(date) {
    let formattedDate = new Date(date);
    const nth = function (d) {
        if (d > 3 && d < 21) return "th";
        switch (d % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let month;
    if (date !== "") {
        month = monthNames[formattedDate.getMonth()];
        return (
            formattedDate.getDate() +
            nth(formattedDate.getDate()) +
            " " +
            month +
            ", " +
            formattedDate.getFullYear()
        );
    } else {
        return "";
    }
}


export { formatDate }