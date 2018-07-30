<template>
    <div class="mp-dialog-input">
        <label
            :class="focused ? 'focused' : ''"
            @focusin="focused = true"
            @focusout="focused = false">
            <span
                v-if="title">{{ title }}</span>
            <input
                v-model="value"
                :placeholder="placeholder"></label>
    </div>
</template>

<style scoped>
    .mp-dialog-input {
        overflow: auto;
    }

    .mp-dialog-input > label {
        box-sizing: border-box;
        width: 100%;
        color: #999;
        padding: 5px;
        border: none;
        border-bottom: 1px solid #ddd;
        display: flex;
        transition: border-bottom 100ms ease-out;
    }
    .mp-dialog-input > label.focused {
        border-bottom: 1px solid #666;
    }
    .mp-dialog-input > label.focused > span {
        color: #666;
    }
    .mp-dialog-input > label > span {
        width: 20%;
        transition: color 100ms ease-out;
    }
    .mp-dialog-input > label > input {
        width: 80%;
        padding: 0;
        border: none;
        color: #000;
        font: inherit;
        flex-grow: 99;
    }
    .mp-dialog-input > label > input:focus {
        outline: none;
    }
    .mp-dialog-input > label > input::placeholder {
        color: #999;
    }
    .mp-dialog-input > label > input:focus::placeholder {
        color: #666;
    }
</style>

<script>
import AbstractDialogComponent from './AbstractDialogFormComponent'

export default {
    name: 'dialog-input',
    extends: AbstractDialogComponent,
    data () {
        return {
            focused: false
        }
    },
    computed: {
        placeholder () {
            return this.param ? this.param.placeholder ? this.param.placeholder : '' : ''
        }
    }
}
</script>
