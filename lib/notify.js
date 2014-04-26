var stack_bar_top = {
    "dir1": "down",
    "dir2": "right",
    "push": "top",
    "spacing1": 0,
    "spacing2": 0
};

data = {   
    addclass: "stack-bar-top",
    cornerclass: "",
    width: "100%",
    stack: stack_bar_top
};


notifySuccess = function (title, text) {
    _.extend(data, {
        type: 'success',
        title: title
    });

    if (text) {
        _.extend(data, {
            text: text
        });
    }

    new PNotify(data);
};

notifyInfo = function (title, text) {
    _.extend(data, {
        type: 'info',
        title: title
    });

    if (text) {
        _.extend(data, {
            text: text
        });
    }

    new PNotify(data);
};


notifyError = function (title, text) {
    _.extend(data, {
        type: 'error',
        title: title
    });

    if (text) {
        _.extend(data, {
            text: text
        });
    }

    new PNotify(data);
};