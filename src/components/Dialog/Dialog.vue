<template>
    <div class="mp-dialog-wrapper">
        <form
            class="mp-dialog-container"
            @submit.prevent="finish"
            @focusout="formFocusout"
            @focusin="formFocusin">

            <div
                ref="dialogBody"
                class="mp-dialog-body"
                @keydown.27.prevent="close"
                @keydown.enter.prevent="finish">
                <dialog-tab
                    v-if="request.type === 'tab'"
                    :fields="request.body"
                    v-model="responseData"/>
                <dialog-form
                    v-else
                    :fields="request.body"
                    v-model="responseData"/>
            </div>

            <div class="mp-dialog-header">
                <button
                    type="button"
                    class="mp-dialog-button"
                    @click="close">{{ t('取消') }}</button>
                <span>{{ t(request.title) }}</span>
                <button
                    type="submit"
                    class="mp-dialog-button">{{ t('确定') }}</button>
            </div>

        </form>
    </div>
</template>

<style scoped>
    @keyframes dialog-enter {
        from {
            transform: translateY(-100px);
        }
        to {
            transform: initial;
        }
    }
    .mp-dialog-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    }
    .mp-dialog-container {
        pointer-events: initial;
        width: 500px;
        margin: 0 auto;
        background-color: #fff;
        box-shadow: 0 2px 3px rgba(0, 0, 0, .1);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        border: 1px solid #ddd;
        border-top: none;
        animation: dialog-enter 200ms;
        display: flex;
        flex-direction: column-reverse;
    }
    .mp-dialog-header {
        display: flex;
        justify-content: space-between;
        padding: 5px 8px;
        border-bottom: 1px solid #ddd;
        background-color: #f7f7f7;
    }

    .mp-dialog-body {
        padding: 8px;
    }

    .mp-dialog-header > .mp-dialog-button {
        background-color: transparent;
        display: inline-block;
        min-width: 75px;
        cursor: pointer;
        border: none;
        transition: background-color 100ms ease-out;
        color: #666;
        font: inherit;
        font-size: .7em;
    }
    .mp-dialog-button:hover {
        background-color: #eee;
    }
</style>

<script>
import tabbable from 'tabbable'

import DialogForm from './DialogForm.vue'
import DialogTab from './DialogTab.vue'

export default {
    name: 'editor-dialog',
    components: { DialogForm, DialogTab },
    props: {
        request: {
            type: Object,
            required: true
        }
    },
    data () {
        const initialData = {}
        this.request.body.forEach((field) => {
            if (this.request.type === 'form') {
                initialData[field.name] = field.default ? field.default : ''
            } else if (this.request.type === 'tab') {
                initialData[field.name] = {}
            }
        })
        return {
            responseData: initialData,
            pendingClose: null
        }
    },
    computed: {
        response () {
            return { ...this.request, data: this.responseData }
        }
    },
    watch: {
        request () {
            this.$nextTick(() => void this.focusInto())
        }
    },
    mounted () {
        this.focusInto()
    },
    methods: {
        close () {
            this.$emit('close')
        },
        finish () {
            this.$emit('finish', this.response)
        },
        focusInto () {
            const [firstTabstop] = tabbable(this.$refs.dialogBody)
            if (firstTabstop)
                firstTabstop.focus()
        },
        formFocusout () {
            this.pendingClose = window.setTimeout(() => void this.close(), 100)
        },
        formFocusin () {
            if (this.pendingClose != null){
                window.clearTimeout(this.pendingClose)
                this.pendingClose = null
            }
        }
    },
    inject: ['t']
}
</script>
