import Freezer from 'freezer-js';
import _ from 'lodash';
import log from 'loglevel';
import ExpressionHelper from "../utils/ExpressionHelper";
import Preferences from "./Preferences";

const freezer = new Freezer({});
const IS_CLIENT = typeof window !== 'undefined';

const Store = {
    Dispatcher: {
        raise: freezer.emit,
        once: freezer.once,
        register: freezer.on,
        remove: freezer.off,    
    },
    Log: log,
    Preferences: Preferences,
    Filters: {

    },
    eval: ExpressionHelper.eval,
    exists: ExpressionHelper.exists,
    Error: (message, data, options, code) =>
    {
        if(IS_CLIENT)
        {
            if(_.isNil(window.errors))
            {
                window.errors = [];
            }
            console.error(message, data);
    
            window.errors.push({
                message: message,
                code: code ? code : 500,
                data: data ? data : { },
                params: options ? options : { },
                when: new Date()
            });
        }
    },
    Refresh: () =>
    { 
        freezer.emit('update'); 
    }
};

Store.State = {
    thaw: () =>
    {
        freezer.get().reset({}); 
    },
    get: () =>
    {
        return freezer.get;
    },
    set: (name, value) =>
    {
        if(name.includes('.'))
        {
            const strArr = name.split('.');
            const key = strArr.pop();
            const path = strArr.join('.');
            const cleared = path && path.length > 0 ? this.eval(path) : this.get();
            cleared.set(key, value);
        }
        else
        {
            let state = freezer.get();
            state.set(name, value);
        }
    },
    ensure: (name) =>
    { 
        let state = freezer.get();
        if(_.isNil(state[name]))
        { 
            this.reset(name); 
            return freezer.get()[name]; 
        }    

        return state[name];
    },
    remove: (name) =>
    { 
        freezer.get().remove(name); 
    },
    reset: (name) =>
    { 
        freezer.get().set(name, {}); 
    },
    eval: (path, defaultValue, debug) =>
    {
        let model = freezer.get();
        return Store.eval(model, path, defaultValue, debug);
    },
    areEqual: (path, target, deep) =>
    {
        let model = freezer.get();
        let obj = Store.eval(model, path, null, false);
        return Store.Data.compare(target, obj, deep);
    },
    exists: (path, debug) =>
    {
        let model = freezer.get();
        return Store.exists(model, path, debug);
    },
    isNil: (path, debug) =>
    {
        let model = freezer.get();
        return !Store.exists(model, path, debug);
    },
    clear: (string) =>
    {
        if(this.exists(string))
        {
            const strArr = string.split('.');
            const key = strArr.pop();
            const path = strArr.join('.');
            // this.remove(string);
            const cleared = path && path.length > 0 ? this.eval(path) : this.get();
            cleared.remove(key);
        } 
        else 
        {
            const msg = 'No store for path found in Store clear method: ';
            log.error(msg + string);
        }
    }
};
Store.isLoggedIn = () =>
{
    //console.log("Store.isLoggedIn", Store.State.exists('security'));
    return Store.State.exists('security');
}

//Store.Session.create();

if(IS_CLIENT) 
{ 
    window.Store = Store; 
    window.ForceRender = () =>
    { 
        freezer.emit('update'); 
    }
}

export default Store;
