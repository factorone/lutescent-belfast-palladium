import API from '../API';
import { Constants } from '../Date';
import Store from '../Store';
import { Logger } from '../Diagnostics';

/**
 * Creates a new session object.
 * Used when the application first loads, and the Store is built out (before login occurs).
 * 
 * @param {object} store The local store instance.
 */
function _create(store)
{
    let session;
    if(store.isNil('session'))
    {
        session = {
            ID: null,
            status: 'new',
            user: {
                email: null,
                uid: null,
                name: null,
                token: null
            }
        }
    }
    else
    {
        session = store.get().session.toJS();
        session.status = 'new';
    }

    return store.set('session', session);
}

/**
 * Destroys a session's data entirely.
 * 
 * @param {object} store The local store instance.
 */
function _destroy(store)
{
    return store.clear("session");
}

/**
 * Marks a session as expired.
 * 
 * Used for when a user's login token has expired on the server, and thus is no
 * longer authenticated. In order for persistence to work correctly, this state
 * is used so that when a user logs out manually, the persistence check doesn't 
 * automatically log them back in.
 * 
 * This may be deprecated in the future as it appears to be unnecessary.
 * 
 * @param {object} store The local store instance.
 */
function _expire(store)
{
    const session = store.get().session.toJS();
    session.status = 'expired';
    return store.set('session', session);
}

/**
 * Refreshes an existing session that is expired.
 * This is used with a persistence method or service.
 * 
 * @param {object} store The local store instance.
 */
function _refresh(store)
{
    const session = store.get().session.toJS();

    // If they're logged out manually, exit.
    if(session.status === 'stopped')
    {
        return;
    }

    const user = { user: session.user.username, pass: API.Environment.decrypt(session.user.pass) };
    const onSuccess = (data) => 
    {
        //Services.Polling.run();
        Store.Session.start(data, user);
        Store.Session.persist();
    };
    const onError = (code, message) => 
    { 
        Logger.api(code, message);
    };

    Store.Security.login(session.user.email, API.Environment.decrypt(session.user.pass), onSuccess, onError);
}

/**
 * Starts a session.
 * 
 * @param {object} store The local store instance
 * @param {object} data The response data from the login method.
 * @param {object} user The user data from the login method.
 */
function _start(store, data, user)
{
    // Glorified null-check on session state to keep this from breaking.
    if(Store.State.isNil('session'))
    {
        _create(store);
    }

    const session = store.get().session.toJS();
    
    // Generate a unique session ID.
    session.ID = API.Environment.randomChars(24);
    session.status = 'running';
    // Set the session user data.
    session.user = data;
    
    return store.set('session', session);
}

/**
 * Stops a session manually.
 * Used primarily when a user logs out manually.
 * 
 * @param {object} store The local store instance.
 */
function _stop(store)
{
    const session = store.exists('session') 
        ? store.get().session.toJS() 
        : {
            ID: null,
            status: 'stopped',
            user: {
                email: null,
                uid: null,
                name: null,
                token: null
            }
        };
    session.status = 'stopped';
    session.ID = null;
    session.user.token = null;

    return store.set('session', session);
}

export class SessionActions
{
    constructor(store, dispatcher, preferences, date)
    {
        this.store = store;
        this.dispatcher = dispatcher;
        this.preferences = preferences;
        this.date = date;
        this.dispatcher.register('session:create', _create);
        this.dispatcher.register('session:destroy', _destroy);
        this.dispatcher.register('session:expire', _expire);
        this.dispatcher.register('session:refresh', _refresh);
        this.dispatcher.register('session:start', _start);
        this.dispatcher.register('session:stop', _stop);
    }

    create() { return this.dispatcher.raise('session:create', this.store); }
    destroy() { return this.dispatcher.raise('session:destroy', this.store); }
    expire() { return this.dispatcher.raise('session:expire', this.store); }
    refresh() { return this.dispatcher.raise('session:refresh', this.store); }
    start(data, user) { return this.dispatcher.raise('session:start', this.store, data, user); }
    stop() { return this.dispatcher.raise('session:stop', this.store); }

    /**
     * Checks if a current session is valid or expired.
     * @returns {boolean}
     */
    isExpired() 
    { 
        const session = Store.State.get().session.toJS();
        return session.status === 'expired';
    }

    /**
     * Enables persistent login functionality through session & token state comparisons.
     * 
     * @param {int} length Optional interval in minutes to check user token status.
     */
    persist(length = 5)
    {
        const self = this;

        // Set the interval to check in minutes (default is 5)
        const interval = Constants.Minute * length;
        
        let service = window.setInterval(function startServicePersist()
        {
            // If nobody is logged in or the session doesn't exist, we can't persist the session.
            if(!Store.isLoggedIn() || Store.State.isNil('session'))
            {
                return;
            }
            
            let session = Store.State.get().session.toJS();
            // We can't persist a session that hasn't started yet, and we don't want to
            // persist a session that has been manually stopped by logging out.
            if(session.status === 'new' || session.status === 'stopped')
            {
                clearInterval(service);
                return;
            }
            
            return API.Call.call('/auth/user', 'GET', {}, null, false, false)
                .then(resp => {
                    // If the session is expired, we need to log back in.
                    if (resp.code === 401) 
                    {
                        self.expire();
                        clearInterval(service);
                        return self.refresh();
                    } 
                    else if (resp.code !== 200) 
                    {
                        return;
                    }
                })
                .catch((e) => { Store.State.set("exception", e); });
        }, interval);
    }
}