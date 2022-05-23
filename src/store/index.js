import Vue from 'vue';
import Vuex from 'vuex';

import user     from './user';
import home     from './home';
import search   from './search';
import detail   from './detail';
import shopcart from './shopcart';
import trade    from './trade';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        user,
        home,
        search,
        detail,
        shopcart,
        trade,
    },
});