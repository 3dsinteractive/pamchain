import Vue from 'vue'
import Field from '~/components/form/Field.vue'
import Textarea from '~/components/base/Textarea.vue'
import InputText from '~/components/base/InputText.vue'
import Select from '~/components/base/Select.vue'

import ButtonPrimary from '~/components/base/ButtonPrimary.vue'
import ButtonSecondary from '~/components/base/ButtonSecondary.vue'
import ButtonSuccess from '~/components/base/ButtonSuccess.vue'
import ButtonGray from '~/components/base/ButtonGray.vue'
import ButtonDark from '~/components/base/ButtonDark.vue'
import ButtonDarkGray from '~/components/base/ButtonDarkGray.vue'

import BackNav from '~/features/utils/BackNav.vue'

Vue.component('Field', Field)
Vue.component('Textarea', Textarea)
Vue.component('InputText', InputText)
Vue.component('Select', Select)

Vue.component('ButtonPrimary', ButtonPrimary)
Vue.component('ButtonSecondary', ButtonSecondary)
Vue.component('ButtonSuccess', ButtonSuccess)
Vue.component('ButtonGray', ButtonGray)
Vue.component('ButtonDark', ButtonDark)
Vue.component('ButtonDarkGray', ButtonDarkGray)

Vue.component('BackNav', BackNav)
