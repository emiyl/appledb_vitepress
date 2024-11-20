<script setup>
const props = defineProps([
    'fw_filter',
    'remove_from_filter',
    'reverse_sort'
])
</script>

<template>
    <div class="wrapper">
        <template v-for="rel_type in [
            'Release',
            'Beta',
            'Internal'
        ]">
            <div :class="[
                    'btn',
                    fw_filter.includes(rel_type) ? 'active' : '',
                    rel_type
            ]" @click="fw_filter.includes(rel_type) ? remove_from_filter(rel_type) : fw_filter.push(rel_type)
            ">
                <font-awesome-icon icon="fa-solid fa-circle"/> {{ rel_type }}
            </div>
        </template>
        <div style="flex-grow: 1;"></div>
        <div class="btn active" @click="reverse_sort()" style="align-self:stretch;">
            <font-awesome-icon icon="fa-solid fa-sort"/> Sort
        </div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-flow: row wrap;
    margin-block: .5em 1em;
    gap: .75em;
}

.fa-circle {
    font-size: 6px;
    vertical-align: middle;
    padding-bottom: 8px;
}

.btn {
    padding-inline: 1em;

    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.03);
    }

    &.active, &:hover {
        font-weight: 500;

        &.Release {
            color: var(--vp-c-brand-1);
            background: var(--vp-code-bg);
        }

        &.Beta {
            color: var(--vp-c-yellow-1);
            background: var(--vp-c-yellow-soft);
        }

        &.Internal {
            color: var(--vp-c-red-1);
            background: var(--vp-c-red-soft);
        }
    }
}

</style>