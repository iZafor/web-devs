const date = new Date();
exports.getDate = () => {
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    return date.toLocaleDateString("en-US", options);
}

exports.getDay = () => {
    const options = {
        weekday: "long",
    };
    return date.toLocaleDateString("en-US", options);
}