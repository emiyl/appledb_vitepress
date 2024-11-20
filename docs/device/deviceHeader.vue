<script setup>
const props = defineProps([
    'name',
    'released',
    'type',
    'web_image'
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
            <h1>{{ props.name }}</h1>
            <div style="padding-top: 8px;">
                <span v-if="props.released">{{ props.released }}</span>
                <a><ReleaseBadge v-if="props.type" :type="props.type" style="margin-left: .5em;"/></a>
            </div>
        </div>
        <div style="margin-right: 1em; display: flex; gap: .5em; justify-content: center;" v-if="props.web_image.id">
            <picture>
                <source
                    :srcset="`https://img.appledb.dev/device@preview/${props.web_image.id}/0.avif`"
                    type="image/avif"
                >
                <source
                    :srcset="`https://img.appledb.dev/device@preview/${props.web_image.id}/0.webp`"
                    type="image/webp"
                >
                <img
                    :src="`https://img.appledb.dev/device@preview/${props.web_image.id}/0.png`"
                    style="max-height: 6em; max-width: 5em;"
                >
            </picture>
        </div>
    </div>
</template>