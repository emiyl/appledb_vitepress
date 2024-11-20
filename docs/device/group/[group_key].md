<script async setup>
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
import { process_date } from '../../.vitepress/common/func.js'

// params is a Vue ref
const { params } = useData()
const { group_key } = params.value

const data = ref([])

let released = ''
let web_image = {
    id: '',
    count: 0,
    dark: false
}
let firmwares = []

let device_map = []
let group_device_map = []

onMounted(async () => {
    const res = await fetch(`https://api.emiyl.com/adbweb/device/group/${group_key}.json`)
    data.value = await res.json()

    web_image = {
        id: data.value.devices[0],
        dark: false
    }
    
    firmwares = data.value.firmwares.reverse()
    released = process_date(data.value.released[0])

    device_map = data.value.devices.map(d => {
        return {
            name: "devName",
            key: d,
            released: ["rel"]
        }
    })

    group_device_map = [
        {
            name: data.value.name,
            key: data.value.key,
            type: data.value.type,
            devices: data.value.devices,
            hide_children: data.value.hide_children,
            subgroups: data.value.subgroups
        }
    ]
})
</script>

<deviceHeader
    :name="data.name"
    :released="released"
    :type="data.type"
    :web_image="web_image"
/>

<deviceInfo
    :identifier="data.identifier"
    :soc="data.soc"
    :arch="data.arch"
    :model="data.model"
    :board="data.board"
/>

<!--<h5>Grouped Devices</h5>

<osDeviceList
    :device_group_map="device_group_map"
    :device_map="device_map"
    :sources="data.sources"
    :func="{
        is_group_expanded: is_group_expanded,
        toggle_group_expanded: toggle_group_expanded
    }"
/>-->

<deviceFirmware :firmwares="firmwares" :device_map="data.devices"/>