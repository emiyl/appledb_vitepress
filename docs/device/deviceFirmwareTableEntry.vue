<script setup>
import { cfunc, cdata } from '../.vitepress/common/index';

const props = defineProps([
    'os_str',
    'version',
    'build',
    'release_badge',
    'rsr',
    'released',
    'device_map',
    'fw',
    'fw_key',
    'func'
])

const cdata_download_obj = JSON.parse(JSON.stringify(cdata.download_obj))
// listen idk but it breaks if i don't don't do this

let download_obj = cfunc.get_download_obj(props.fw.sources, props.device_map, cdata_download_obj)
let download_obj_length = Object.values(download_obj).reduce((n, {length}) => n + length, 0)
</script>

<template>
    <div class="tableEntry" @click="props.func.toggle_fw_expanded(props.fw_key)">
        <div class="start">
            <span>{{ props.os_str }} {{ props.version }}</span>
            <code style="font-weight: 400;">{{ props.build }}</code>
            <ReleaseBadge :type="props.release_badge" v-if="props.release_badge != 'Release'"/>
            <ReleaseBadge type="RSR" v-if="props.rsr"/>
        </div>
        <div class="end">
            <div v-if="props.released != 'Jan 1, 1970'">{{ props.released }}</div>
            <div style="width: 8px;"><a>
                <font-awesome-icon v-if="props.func.is_fw_expanded(props.fw_key)" icon="fa-solid fa-caret-down"/>
                <font-awesome-icon v-else icon="fa-solid fa-caret-right"/>
            </a></div>
        </div>
    </div>
    <div class="tableLine" v-if="!props.func.is_fw_expanded(props.fw_key)"></div>
    <div v-else>
        <div style="height: 1px"></div>
        <div class="downloadFlex">
            <template v-for="(download, type) in download_obj">
                <a
                    v-if="download.enabled"
                    class="btn"
                    :href="download.link"
                >
                    <font-awesome-icon icon="fa-solid fa-download"/> {{ download.label }}
                </a>
            </template>
            <a class="btn" :href="`/firmware/${props.fw_key.replace(';','/')}.html`"><font-awesome-icon icon="fa-solid fa-info"/> More info</a>
        </div>
    </div>
</template>

<style lang="scss">
.tableLine {
    border-bottom: 1px solid var(--vp-c-gray-soft);
}

.tableEntry {
    height: 3.5em;
    
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    .start {
        font-weight: 600;
        
        * {
            margin-right: 4px;
        }
    }

    .end {
        display: flex;
        flex-flow: row nowrap;
        gap: 1em;
    }
}

.downloadFlex {
    display: flex;
    flex-flow: row wrap;

    margin: .5em;
    margin-bottom: 1em;
    gap: .5em;
}
</style>