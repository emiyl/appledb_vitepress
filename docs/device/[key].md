<script async setup>
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
import { process_date } from '../.vitepress/common/func.js'

// params is a Vue ref
const { params } = useData()
const { key } = params.value

const data = ref([])

let released = ''
let web_image = {
    id: '',
    count: 0,
    dark: false
}
let firmwares = []

onMounted(async () => {
    const res = await fetch(`https://api.emiyl.com/adbweb/device/key/${key}.json`)
    data.value = await res.json()

    web_image = {
        id: data.value.key,
        dark: false
    }
    
    firmwares = data.value.firmwares.reverse()
    released = process_date(data.value.released[0])
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

<deviceFirmware :firmwares="firmwares" :device_map="data.key"/>