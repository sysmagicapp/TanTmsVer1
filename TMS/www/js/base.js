var checkDatetime = function(datetime) {
  if (is.equal(moment(datetime).format('DD-MMM-YYYY'), '01-Jan-0001')) {
    datetime = '';
  }
  if (is.not.empty(datetime)) {
    datetime1 = moment(datetime).format('HH:mm');
   datetime2=moment(datetime).add(2,'hours').format('HH:mm');
   datetime=datetime1+' - '+datetime2;
  }
  return datetime;
};

var objClone = function (obj) {
    var newObj = {};
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (is.object(obj[prop])) {
                newObj[prop] = objClone(obj[prop]);
            } else {
                if (is.null(obj[prop]) || is.undefined(obj[prop]) || is.equal(obj[prop], 'undefined')) {
                    newObj[prop] = '';
                } else {
                    if (is.string(obj[prop])) {
                        newObj[prop] = obj[prop].replace(/[\']/g, '\'\'');
                        // newObj[prop] = obj[prop].toString().replace("'", "''");
                    } else {
                        newObj[prop] = obj[prop];
                    }
                }
            }
        }
    }
    return newObj;
};
