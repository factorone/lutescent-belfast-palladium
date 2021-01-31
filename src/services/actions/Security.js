import API from '../API';
import Store from "../Store";

function _login(store, params, onSuccess, onError) 
{
    const payload = { user: params.user, password: params.pass };
    return API.Call.call('/auth/login', 'POST', {}, payload, false, false)
        .then(resp => {
            if (resp.code === 401) 
            {
                store.set("accessDenied", resp.data.message);
                onError(resp.code, resp.data.message);
            } 
            else if (resp.code !== 200) 
            {
                onError(resp.code, resp.text);
            } 
            else 
            {
                onSuccess(resp.data);
                store.set('security', resp.data);

                if(store.exists('accessDenied')) 
                {
                    store.clear('accessDenied');
                }
                Store.Dispatcher.raise("Authenticated", resp.data);
            }
        })
        .catch((e) => { store.set("exception", e); });
}

export class SecurityActions
{        
    constructor(store, dispatcher, preferences, date)
    {
        this.store = store;
        this.dispatcher = dispatcher;
        this.preferences = preferences;
        this.date = date;
        dispatcher.register('security:login', _login);
        this.logout = this.logout.bind(this);
    }

    login(user, password, onSuccess, onError) { return this.dispatcher.raise('security:login', this.store, { user, pass: password }, onSuccess, onError ); }
    logout() 
    { 
        this.store.thaw(); 
        Store.Session.stop();       
    }
    
}