
module.exports = (req, res, next) => {
    var oldSend = res.send

    res.send = function (data) {
        let arg0 = JSON.parse(arguments[0])
        if (typeof arg0._id !== 'undefined') {
            delete arg0._id
        }
        if (typeof arg0.__v !== 'undefined') {
            delete arg0.__v
        }
        arguments[0] = JSON.stringify(arg0)
        oldSend.apply(res, arguments)
    }
    next()
}
