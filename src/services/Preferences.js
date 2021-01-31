import _ from 'lodash';
import Store from './Store';
import { func } from 'prop-types';
import fs from "fs";

let TEMP_STORAGE = {}
let INIT = false;

function _LoadSettings() 
{
    const path = 'settings.json';
    let settings = {};
    if(fs.existsSync(path))
    {
        var data = fs.readFileSync(path);
        settings = JSON.parse(data);
    }
    return settings;
}
function _Initialize() 
{
    console.log("init");
    TEMP_STORAGE = _LoadSettings();
    console.log("TEMP_STORAGE", TEMP_STORAGE);
    INIT = true;
}

const Preferences = {
    init: function(name)
    {
        if(INIT === false)
        { 
            _Initialize(); 
        }
    },

    get: function(name)
    { 
        if(INIT === false)
        { 
            Preferences.init(); 
        }

        return TEMP_STORAGE[name]; 
    },
    set: function(name, val)
    { 
        if(INIT === false)
        { 
            Preferences.init(); 
        }

        TEMP_STORAGE[name] = val; 
        Store.refresh(); 
        Store.Dispatcher.raise('update');
        
        return TEMP_STORAGE[name]; 
    },
    bool: function(name, val, defaultVal)
    { 
        if(_.isBoolean(val))
        { 
            Preferences.set(name, val); 
        }
        val = Preferences.get(name);
        if(_.isBoolean(val))
        { 
            return val; 
        }
        return defaultVal;
    },
    int: function(name, val, defaultVal)
    { 
        if(_.isInteger(val))
        { 
            Preferences.set(name, val); 
        }
        val = Preferences.get(name);
        if(_.isInteger(val))
        { 
            return val; 
        }
        return defaultVal;
    },
    string: function(name, val, defaultVal)
    { 
        if(!_.isNil(val))
        { 
            Preferences.set(name, val); 
        }
        val = Preferences.get(name);
        if(!_.isNil(val))
        { 
            return val; 
        }
        return defaultVal;
    },
    /**
     * Prototype array value method for future use.
     * 
     * @Note: Values being passed in that are not arrays must be passed in the format
     * of an object with key/value pairs:
     * 
     * { value: "test", name: "Testing" }
     * 
     * @param {string} name Alphanumeric object key name.
     * @param {string|int|bool|array|object} val The object's value to store.
     * @param {array} defaultVal Any default array value to store if val is undefined.
     * @returns {}
     */
    array: function(name, val, defaultVal)
    {
        // Check to see if the array exists at all; if not, setup an array based on the
        // default value passed in the parameters.
        let _array = Preferences.get(name) || [];
        // Value null check
        if(!_.isNil(val)) 
        {
            // If the value being passed is an array, then just replace the entire existing
            // stored value with it.
            if(_.isArray(val))
            {
                _array = val;
            }
            else
            {
                // Instead of having separate methods for adding/removing values,
                // just check to see if the value already exists; if it does, remove it,
                // otherwise, just add it. This essentially creates an on/off switch behavior
                // for all values that can be stored in an array.
                if(_.indexOf(_array, val) >= 0) 
                { 
                    _.pull(_array, val);
                } 
                else 
                {
                    _array.push(val);
                }
            }
            // Set the new value in the Store
            Preferences.set(name, _array); 
        }
        val = Preferences.get(name);
        if(!_.isEmpty(val) && !_.isNil(val)) 
        { 
            return val; 
        }
        return defaultVal;
    }
};

Preferences.Security = {
    user: function(val) 
    { 
        return Preferences.string("security.user", val, ""); 
    }
}

export default Preferences;
