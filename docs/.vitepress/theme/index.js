// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'

import './style.css'
import './custom.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretRight, faCaretDown, faDownload, faInfo, faCircle, faSort } from '@fortawesome/free-solid-svg-icons'
library.add(faCaretRight, faCaretDown, faDownload, faInfo, faCircle, faSort)

import ReleaseBadge from './components/ReleaseBadge.vue'

import osHeader from '../../firmware/[os_str]/osHeader.vue'
import osDeviceList from '../../firmware/[os_str]/osDeviceList.vue'
import osDeviceListGroup from '../../firmware/[os_str]/osDeviceListGroup.vue'

import deviceHeader from '../../device/deviceHeader.vue'
import deviceInfo from '../../device/deviceInfo.vue'
import deviceFirmware from '../../device/deviceFirmware.vue'
import deviceFirmwareTableEntry from '../../device/deviceFirmwareTableEntry.vue'
import deviceFirmwareTableFilter from '../../device/deviceFirmwareTableFilter.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('font-awesome-icon', FontAwesomeIcon),
    app.component('ReleaseBadge', ReleaseBadge),

    app.component('osHeader', osHeader),
    app.component('osDeviceList', osDeviceList),
    app.component('osDeviceListGroup', osDeviceListGroup),

    app.component('deviceHeader', deviceHeader),
    app.component('deviceInfo', deviceInfo),
    app.component('deviceFirmware', deviceFirmware)
    app.component('deviceFirmwareTableEntry', deviceFirmwareTableEntry),
    app.component('deviceFirmwareTableFilter', deviceFirmwareTableFilter)
  }
}
