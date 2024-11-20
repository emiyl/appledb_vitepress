<script setup>
import { cfunc, cdata } from '../../.vitepress/common/index';

const props = defineProps([
    'name',
    'released',
    'group_key',
    'image_id',
    'devices',
    'subgroups',
    'device_map',
    'sources',
    'layer',
    'func'
])

const cdata_download_obj = JSON.parse(JSON.stringify(cdata.download_obj))
// listen idk but it breaks if i don't don't do this

let download_obj = cfunc.get_download_obj(props.sources, props.devices, cdata_download_obj)
let multiple_of_each_download = Object.values(download_obj).map(x => x.length > 1).filter(x => x).length > 0

let source_device_map_arr = props.sources.map(src => cfunc.find_source_device_map(src, props.devices, props.device_map))
let combined_sources_device_map = [...new Set(source_device_map_arr.map(src_dev_arr => src_dev_arr.map(device => device.key)).flat())]

let show_devices_in_source_table = false
for (let src_dev_arr of source_device_map_arr) {
    if (src_dev_arr.length != combined_sources_device_map.length) {
        show_devices_in_source_table = true
        break
    }
}
</script>

<template>
    <div style="
        display: flex;
        flex-flow: row nowrap;
    ">
        <div :style="{
            'margin-right': '1em',
            'width': layer < 1 ? '4em' : '2.7em',
            'height': layer < 1 ? '7em' : '4.7em'
        }">
            <picture>
                <source
                    :srcset="`https://img.appledb.dev/device@preview/${props.image_id}/0.avif`"
                    type="image/avif"
                >
                <source
                    :srcset="`https://img.appledb.dev/device@preview/${props.image_id}/0.webp`"
                    type="image/webp"
                >
                <img
                    :src="`https://img.appledb.dev/device@preview/${props.image_id}/0.png`"
                    :style="{
                        'margin-inline': 'auto',
                        'max-width': layer < 1 ? '4em' : '2.7em',
                        'max-height': layer < 1 ? '7em' : '4.7em'
                    }"
                >
            </picture>
        </div>
        <div style="
            display: flex;
            flex-flow: column nowrap;
        ">
            <div>
                <div style="
                    font-weight: 600;
                    font-size: 1.2em;
                    padding-bottom: 6px;
                ">{{ props.name }}</div>
                <div v-if="props.layer < 1 && props.released">Released {{ props.released }}</div>
            </div>
            <div style="display: flex; flex-flow: row wrap; gap: .5em; margin-top: 1em;">
                <a class="btn" :href="`/device/group/${props.group_key}.html`">
                    <font-awesome-icon icon="fa-solid fa-info"/> Device page
                </a>
                <template v-for="(download, type) in download_obj">
                    <a
                        v-if="download.enabled"
                        class="btn"
                        :href="download.link"
                    >
                        <font-awesome-icon icon="fa-solid fa-download"/> {{ download.label }}
                    </a>
                </template>
                <a v-if="
                    (layer == 0 || (props.devices.length > 1 && multiple_of_each_download)) &&
                    props.sources.length > 0
                " class="btn" v-on:click="props.func.toggle_group_expanded(props.group_key)">
                    <span>
                        <font-awesome-icon icon="fa-solid fa-caret-down" v-if="props.func.is_group_expanded(props.group_key)"/>
                        <font-awesome-icon icon="fa-solid fa-caret-right" v-else/>
                    </span>
                    <span style="padding-left: 2px;">
                        Downloads
                    </span>
                </a>
            </div>
        </div>
    </div>
    <template v-if="props.func.is_group_expanded(group_key)">
        <div style="
            margin-left: 5em;
            display: flex;
            flex-flow: column nowrap;
            gap: 2em;
        ">
            <template v-if="multiple_of_each_download" v-for="
                device_group in props.subgroups.length > 0 ?
                    props.subgroups :
                    props.devices.map(d => {
                        let device = props.device_map.find(x => x.key == d)
                        return {
                            name: device.name,
                            key: device.key,
                            type: device.type,
                            devices: [device.key],
                            hide_children: false,
                            subgroups: []
                        }
                    })
            ">
                <osDeviceListGroup
                    :name="device_group.name"
                    :released="cfunc.process_date(props.device_map.find(x => x.key == device_group.devices[[0]]).released[0])"
                    :group_key="device_group.key"
                    :image_id="device_group.devices[0]"
                    :devices="device_group.devices"
                    :device_map="props.device_map"
                    :subgroups="device_group.subgroups"
                    :sources="props.sources.filter(src => device_group.devices.some(device_key => src.device_map.includes(device_key)))"
                    :layer="props.layer + 1"
                    :func="props.func"
                />
            </template>
            <table style="margin-top: 0em;" v-if="layer == 0">
                <tbody>
                    <tr>
                        <th>Type</th>
                        <th v-if="show_devices_in_source_table">Devices</th>
                        <th>Link</th>
                    </tr>
                    <tr v-for="(src, index) in props.sources">
                        <td><code>{{ src.type }}</code></td>
                        <td v-if="show_devices_in_source_table">
                            <div v-for="device in source_device_map_arr[index]" style="white-space: nowrap;">
                                <a :href="`/device/${device.key}`" style="text-decoration: none;">{{ device.name }}</a>
                            </div>
                        </td>
                        <td><code v-for="link in src.links"><a href="link.url">{{ link.url.split('/').pop() }}</a></code></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </template>
</template>