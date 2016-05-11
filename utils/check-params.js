function check_params(params, req, res, next) {

    var isCorrect = true;

    Object.keys(params).forEach((field) => {
        Object.keys(params[field]).forEach((param) => {
            var value = req[field][param];
            var type = params[field][param];
            
            (value && check_type(value, type)) ? null : isCorrect = false;
        });
    });

    (isCorrect) ? next() : res.sendStatus(400);

    function check_type(variable, type) {
        return (variable).constructor.name === type;
    }
}

module.exports = check_params;
