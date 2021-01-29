import _ from 'lodash';
import dataHelper from './DataHelper';

function _assess (object, path, testIfValid, isNull, isValid, debug) 
{
    let parts = null;
    try
    {
        if(_.isNil(object)) 
        { 
            isNull(); return false; 
        }
        if(_.isNil(path)) 
        { 
            isNull(); return false; 
        }
        
        if(debug)
        { 
            console.log("evalPath"); 
            console.log("**************************************"); 
        } 
        parts = path.split('.')
        let current = object;

        if(debug)
        { 
            console.log("object: ", object); 
            console.log("path: ", path); 
            console.log("parts: ", parts); 
        }

        for (let x = 0; x < parts.length; x++) 
        {
            if(debug) 
            { console.log("+++++++++++++++"+x+"+++++++++++++++"); }

            if(debug) 
            { console.log("path[x]: ", parts[x]); }
            let expression = current[parts[x]];      
            if(debug) 
            { console.log("expression: ", expression); }

            if(_.isNil(expression)) 
            {
                if(debug) 
                { console.warn("expression is nill returning default value"); }
                isNull();
                return false;
            }

            if(debug) 
            { 
                console.log("current: ", current); 
            }
            current = _.isNil(current) ? {} : expression;        
            if(debug)
            { 
                console.log("current: ", current); 
            }
            if (path[x] === 'personID') 
            { 
                current = dataHelper.extract.personID(object); 
            }
        }
        if(debug)
        { 
            console.log("+++++++++++++++++++++++++++++++++++++++++++++"); 
        }

        if(testIfValid(current))
        {
            isValid(current);
            return true;
        }
        else
        {
            isNull();
            return false;
        }
    }
    catch(exp)
    {            
        //TODO: make a better error than the console
        console.error("Error while evaluating the path");
        console.error("object:", object);
        console.error("path: ", path);
        console.error("parts: ", parts);
        console.error("error:", exp);
        isNull();
        return false;
    }
};

const expressionHelper = {
    isNil: (val) =>
    {
        return _.isNil(val);
    },
    assess: (object, path, testIfValid, isNull, isValid, debug) => 
    {
        _assess(object, path, testIfValid, isNull, isValid, debug );
    },
    determine: (object, path, isInvalid, isValid, debug) => 
    {
        const isNotNull = function(val) 
        { 
            return !_.isNil(val); 
        }
        _assess(object, path, isNotNull, isInvalid, isValid, debug );
    },
    eval: (object, path, defaultValue, debug) => 
    {
        let result = null;
        const isNotNull = function(val) 
        { 
            return !_.isNil(val); 
        }
        const setIsValid = function(val) 
        { 
            result = val; 
        }
        const setIsNull = function() 
        { 
            result = defaultValue; 
        }
        _assess(object, path, isNotNull, setIsNull, setIsValid, debug );
        return result;
    },
    exists: (object, path, debug) => 
    {
        if(!_.isNil(path))
        {
            let result = null;
            const isNotNull = function(val) 
            { 
                return !_.isNil(val); 
            }
            const setIsValid = function(val) 
            { 
                result = true; 
            }
            const setIsNull = function() 
            { 
                result = false; 
            }
            _assess(object, path, isNotNull, setIsNull, setIsValid, debug );
            return result;
        }
        else
        {
            return !_.isNil(object);
        }
    },

};

export default expressionHelper;