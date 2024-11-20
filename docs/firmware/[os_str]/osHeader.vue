<script setup>
const props = defineProps([
    'os_str',
    'version',
    'released',
    'build',
    'release_badge',
    'web_image_id'
])
</script>

<template>
    <div style="
        flex-direction: row-reverse;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    ">
        <div style="margin-right: auto;">
            <h1>{{ props.os_str }} {{ props.version }}</h1>
            <div style="padding-top: 8px;">
                <span v-if="props.released">{{ props.released }}</span>
                <code v-if="props.build" style="margin-left: 8px;">{{ props.build }}</code>
                <ReleaseBadge v-if="props.release_badge" :type="props.release_badge"/>
            </div>
        </div>
        <div style="margin-right: 1em;" v-if="props.web_image_id">
            <picture>
                <source
                    :srcset="`https://img.appledb.dev/images@preview/${props.web_image_id}/0.avif`"
                    type="image/avif"
                >
                <source
                    :srcset="`https://img.appledb.dev/images@preview/${props.web_image_id}/0.webp`"
                    type="image/webp"
                >
                <img
                    :src="`https://img.appledb.dev/images@preview/${props.web_image_id}/0.png`"
                    style="max-height: 5em; max-width: 5em;"
                >
            </picture>
        </div>
    </div>
</template>