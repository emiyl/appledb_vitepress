<script async setup>
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
import * as cfunc from '../../.vitepress/common/func'

// params is a Vue ref
const { params } = useData()
const { os_str, key } = params.value

const data = ref([])

let released = ""
let release_badge = ""
let device_group_data = {}
let web_image = {
    id: ""
}

const expanded_group_list = ref([])

function is_group_expanded(group_key) {
    return expanded_group_list.value.includes(group_key)
}

function toggle_group_expanded(group_key) {
    if (is_group_expanded(group_key)) {
        expanded_group_list.value = expanded_group_list.value.filter(x => x != group_key)
    } else {
        expanded_group_list.value.push(group_key)
    }
}

onMounted(async () => {
    const res = await fetch(`https://api.emiyl.com/adbweb/firmware/${os_str}/${key}.json`)
    data.value = await res.json()

    released = cfunc.process_date(data.value.released)
    web_image = data.value.appledb_web.web_image

    if (data.value.beta) release_badge = "Beta"
    else if (data.value.rc) release_badge = "RC"
    else if (data.value.internal) release_badge = "Internal"
    else release_badge = "Release"
})
</script>

<osHeader
    :os_str="data.os_str"
    :version="data.version"
    :build="data.build"
    :released="released"
    :release_badge="release_badge"
    :web_image_id="web_image.id"
/>

<h5>Devices</h5>
<osDeviceList
    :device_group_map="data.device_group_map"
    :device_map="data.device_map"
    :sources="data.sources"
    :func="{
        is_group_expanded: is_group_expanded,
        toggle_group_expanded: toggle_group_expanded
    }"
/>