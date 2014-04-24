var stack_bar_top = {
    "dir1": "down",
    "dir2": "right",
    "push": "top",
    "spacing1": 0,
    "spacing2": 0
};



notifySuccess = function (title, text) {

    data = {
        title: title,
        type: 'success',
        addclass: "stack-bar-top",
        cornerclass: "",
        width: "100%",
        stack: stack_bar_top
    };

    if (text) {
        _.extend(data, {
            text: text
        });
    }

    new PNotify(data);
};