import Vue from 'vue'

import VueEthereum from '~/plugins/vue-ethereum/index'

Vue.use(VueEthereum)

export default ({app}) => {
    // inject options from module
    const pluginOptions = [<%= serialize(options) %>][0]
    app.eth = new VueEthereum(pluginOptions)
}
