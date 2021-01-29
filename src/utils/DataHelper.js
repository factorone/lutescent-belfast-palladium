import _ from 'lodash';

function _shallowCompare (object1, object2) 
{
    for (let key in object1) 
    {
        if (!(key in object2) || object1[key] !== object2[key]) 
        {
            return false;
        }
    }

    for (let key in object2) 
    {
        if (!(key in object1) || object1[key] !== object2[key]) 
        {
            return false;
        }
    }

    return true;
}

const dataHelper = {
    compare: (object1, object2, shallow) => 
    {
        if(object1 == object2) 
        {
            return true;
        }
        if(_.isNil(object1) || _.isNil(object2)) 
        {
            return false;
        }

        return shallow 
            ? _shallowCompare(object1, object2) 
            : _.isEqual(object1, object2);
    },
    shallowCompare: (object1, object2) => 
    { 
        return _shallowCompare(object1, object2); 
    },
    extract: {
        getExtracted: (extractObj, value) => 
        {
            const extractMethod = (extractObj && extractObj.method) 
                ? dataHelper.extract[extractObj.method] 
                : false;
            let returnVal = '';

            if (typeof extractMethod === 'function') 
            {
                const methodOptions = {...extractObj, check: value};
                returnVal = extractMethod(methodOptions);
            }

            return returnVal;
        },

        getDataFromTarget: (options) => 
        {
            return options.check[options.target] ? options.check[options.target] : null;
        },

        personID: (object) => 
        {
            const ids = object.identifiers;
            const validIds = ['contactID', 'customerID', 'patientID', 'prospectID', 'providerID', 'responsiblePartyID', 'studentID', 'employeeID', 'personID'];
            let returnID = ids['personID'];

            if (_.isUndefined(returnID) || _.isNil(returnID)) 
            {
                _.forEach(ids, (val, key) => 
                {
                    if (validIds.includes(key)) 
                    {
                        returnID = ids[key];
                    }
                });
            }

            return returnID;
        }
    },

    transform: {
        getTransformed: (transformObj, value) => 
        {
            const transformMethod = (transformObj && transformObj.method) 
                ? dataHelper.transform[transformObj.method] 
                : false;
            let returnVal = '';

            if (typeof transformMethod === 'function') 
            {
                const methodOptions = {...transformObj, check: value};
                returnVal = transformMethod(methodOptions);
            }

            return returnVal;
        },

        isTrueToValue: (options) => 
        {
            return !!options.check ? options.trueVal : options.falseVal;
        },

        getSum: (options) => 
        {
            const returnVal = _.size(options.check);

            return String(returnVal);
        },

        mapSecurityProfileToType: (options) => 
        {
            let returnVal = '';

            returnVal = [];
            // returnVal.push({ title: 'User', value: 'user'});

            _.forEach(options.check, (value, index) => 
            {
                const title = index.slice(0, -1);
                returnVal.push({
                    title: dataHelper.filter.upperWords({val: _.capitalize(dataHelper.filter.uncammelize({val: title}))}),
                    value: title
                });
            });

            return returnVal;
        },

        dataMap: (options) => 
        {
            return options['map'][options.check];
        },

        path: (options) => 
        {
            //console.log("path: ", options);
            return dataHelper.getDataFromPath(options.check, options.paths, null);
        }
    },

    condition: {
        getConditioned: (conditionObj, value, data) => 
        {
            const conditionMethod = (conditionObj && conditionObj.method) ? dataHelper.condition[conditionObj.method] : false;
            let returnVal = '';

            if (typeof conditionMethod === 'function') 
            {
                const methodOptions = {...conditionObj, check: value, data: data};
                returnVal = conditionMethod(methodOptions);
            }

            return returnVal;
        },

        targetIsTrue: (options) => 
        {
            return options.data[options.target] ? options.data.trueVal : options.data.falseVal;
        },

        targetIsValue: (options) => 
        {

        }
    },

    filter: {
        getFiltered: (filterObj, value) => 
        {
            const filterMethod = (filterObj && filterObj.method) ? dataHelper.filter[filterObj.method] : false;
            let returnVal = filterObj.value;

            if (typeof filterMethod === 'function') 
            {
                returnVal = filterMethod({...filterObj, val: value});
            }

            return returnVal;
        },

        hasValue: (options) => 
        {
            let returnVals = '';
            const isArray = Array.isArray(options.val);

            if (options.isMulti && !isArray) 
            {
                returnVals = {};
                _.forEach(options.val, (value, index) => 
                {
                    if (!_.isEmpty(value)) 
                    {
                        returnVals[index] = value;
                    }
                });
            }
            else if (isArray) 
            {
                returnVals = [];
                options.val.map((value, index) => 
                {
                    if (!_.isEmpty(value)) 
                    {
                        returnVals.push(value);
                    }
                })
            }
            else
            {
                if (_.isEmpty(options.val)) 
                {
                    returnVals = options.val;
                }
            }

            return returnVals;
        },
    },

    chunk: (a, n) => 
    {
        if (n < 2) 
        {
            return [a];
        }

        let len = a.length;
        let out = [];
        let i = 0;
        let size;

        if (len % n === 0) 
        {
            size = Math.floor(len / n);
            while (i < len) 
            {
                out.push(a.slice(i, i += size));
            }
        }
        else 
        {
            while (i < len) 
            {
                size = Math.ceil((len - i) / n--);
                out.push(a.slice(i, i += size));
            }
        }
        return out;
    }

};

export default dataHelper;