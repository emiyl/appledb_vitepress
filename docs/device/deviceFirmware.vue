<script setup>
import { ref } from 'vue'
import { process_date } from '../.vitepress/common/func.js'

const props = defineProps([
    'firmwares',
    'device_map'
])

const expanded_firmwares_list = ref([])
const fw_filter = ref(["Release"])

function is_fw_expanded(key) {
    return expanded_firmwares_list.value.includes(key)
}

function toggle_fw_expanded(key) {
    if (is_fw_expanded(key)) {
        expanded_firmwares_list.value = expanded_firmwares_list.value.filter(x => x != key)
    } else {
        expanded_firmwares_list.value.push(key)
    }
}
</script>

<template>
    <h5 class="calc">Firmware</h5>

    <deviceFirmwareTableFilter
        :fw_filter="fw_filter"
        :remove_from_filter="function (data) { fw_filter = fw_filter.filter(x => x != data) }"
        :reverse_sort="function() { props.firmwares.reverse() }"
    />
    
    <div v-for="(fw, index) in props.firmwares
        .filter(fw => 
            (fw.beta || fw.rc) && fw_filter.includes('Beta') ||
            fw.internal && fw_filter.includes('Internal') ||
            !(fw.beta || fw.rc || fw.internal) && fw_filter.includes('Release')
        )
    " :key="fw.key">
        <deviceFirmwareTableEntry
            :os_str="fw.os_str"
            :version="fw.version"
            :build="fw.build"
            :release_badge="fw.beta ? 'Beta' : fw.rc ? 'RC' : fw.internal ? 'Internal' : 'Release'"
            :rsr="fw.rsr"
            :released="process_date(fw.released)"
            :device_map="props.device_map"
            :fw="fw"
            :fw_key="fw.key"
            :func="{
                is_fw_expanded: is_fw_expanded,
                toggle_fw_expanded: toggle_fw_expanded
            }"
        />
    </div>
</template>