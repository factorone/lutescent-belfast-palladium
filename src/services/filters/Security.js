import _ from "lodash";

export class SecurityFilters
{
    constructor(store, preferences, date)
    {
        this.store = store;
        this.preferences = preferences;
        this.date = date;
    }

    me(id)
    {
        if(id === true)
        {
            return this.store.eval('security.identity.userID');
        }

        return this.store.eval('security.identity.name');
    }
}