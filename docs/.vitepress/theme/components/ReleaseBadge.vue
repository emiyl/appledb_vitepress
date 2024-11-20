<script setup>
const props = defineProps(['type'])
let color = "var(--vp-c-brand-1)"
let background = "var(--vp-code-bg)"

if (props.type) {
    switch (props.type.toLowerCase()) {
        case 'beta':
            color = "var(--vp-c-yellow-1)"
            background = "var(--vp-c-yellow-soft)"
            break;
        case 'rc':
            color = "var(--vp-c-yellow-1)"
            background = "var(--vp-c-yellow-soft)"
            break;
        case 'rsr':
            color = "var(--vp-c-yellow-1)"
            background = "var(--vp-c-yellow-soft)"
            break;
        case 'internal':
            color = "var(--vp-c-red-1)"
            background = "var(--vp-c-red-soft)"
            break;
    }
}
</script>

<template>
    <span :style="`
        color: ${color};
        background: ${background};
        border-radius: 4px;
        padding: 3px 6px;
        transition: color 0.25s, background-color 0.5s;
        font-size: var(--vp-code-font-size);
        margin-left: 4px;
        font-weight: 400;
    `">{{ type }}</span>
</template>