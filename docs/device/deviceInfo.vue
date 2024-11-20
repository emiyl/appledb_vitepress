<script setup>
const props = defineProps([
    'identifier',
    'soc',
    'arch',
    'model',
    'board'
])
</script>

<template>
    <div style="margin-block: 2em 1em;">
        <template v-for="{label, data} in [
            {
                label: 'Identifier',
                data: props.identifier
            },
            {
                label: 'SoC',
                data: props.soc
            },
            {
                label: 'Arch',
                data: props.arch
            },
            {
                label: 'Model',
                data: props.model
            },
            {
                label: 'Board',
                data: props.board
            },
        ]">
            <div class="wrapper" v-if="data && data.length && data[0]">
                <div class="title">{{ label }}</div>
                <div>{{ data.join(', ') }}</div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    display: grid;
    grid-template-columns: 8em calc(100% - 8em);
    padding: 5px;

    .title {
        font-weight: 700;
        text-transform: uppercase;
        color: var(--vp-c-text-2);
        font-size: .8em;
        padding-top: 2px;
    }
}

@media only screen and (max-width: 600px) {
    .wrapper {
        display: flex;
        flex-flow: column wrap;
        margin-bottom: .5em;

        .title {
            margin-bottom: .5em;
        }
    }
}
</style>