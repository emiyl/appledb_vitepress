<script setup>
import { cfunc } from '../../.vitepress/common/index'

const props = defineProps([
    'device_group_map',
    'device_map',
    'sources',
    'func'
])
</script>

<template>
    <div class="wrapper">
        <template v-for="device_group in props.device_group_map">
            <osDeviceListGroup
                :name="device_group.name"
                :released="cfunc.process_date(props.device_map.find(x => x.key == device_group.devices[[0]]).released[0])"
                :group_key="device_group.key"
                :image_id="device_group.devices[0]"
                :devices="device_group.devices"
                :subgroups="device_group.subgroups"
                :device_map="props.device_map"
                :sources="props.sources.filter(src => device_group.devices.some(device_key => src.device_map.includes(device_key)))"
                :layer="0"
                :func="props.func"
            />
        </template>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-flow: column nowrap;
    margin-block: 1em;
    gap: 2em;
}
</style>