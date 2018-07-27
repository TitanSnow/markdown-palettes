<template>
    <div class="mp-dialog-wrapper">
        <form
            class="mp-dialog-container"
            @submit.prevent="finish"
            @focusout="focused = false"
            @focusin="focused = true">

            <div
                ref="dialogBody"
                class="mp-dialog-body"
                @keydown.27.prevent="close"
                @keydown.enter.prevent="finish">
                <dialog-tab
                    v-if="request.type === 'tab'"
                    :fields="request.body"
                    v-model="responseData"
                    :key="key"
                    ref="dialogTab"
                    />
                <dialog-form
                    v-else
                    :fields="request.body"
                    v-model="responseData"
                    :key="key"/>
            </div>

            <div class="mp-dialog-header">
                <div>{{ t(request.title) }}</div>
                <div>
                    <button
                        type="button"
                        class="mp-dialog-button"
                        @click="togglePin">
                        <i class="fa fa-thumbtack pin-icon" :class="{ pinned }"/>
                    </button>
                    <button
                        type="button"
                        class="mp-dialog-button"
                        @click="close">
                        <i class="fa fa-times"/>
                    </button>
                    <button
                        type="submit"
                        class="mp-dialog-button">
                        <i class="fa fa-check"/>
                    </button>
                </div>
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
        line-height: 24px;
    }

    .mp-dialog-header .pin-icon {
        transform: rotate(-90deg);
    }
    .mp-dialog-header .pin-icon.pinned {
        transform: initial;
    }

    .mp-dialog-header .mp-dialog-button {
        background-color: transparent;
        display: inline-block;
        width: 24px;
        cursor: pointer;
        border: none;
        transition: background-color 100ms ease-out;
        color: #666;
        font: inherit;
        padding: 0;
    }
    .mp-dialog-header .mp-dialog-button:hover {
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
        return {
            responseData: this.getInitialData(),
            focused: false,
            pinned: false,
            key: 0
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
            this.responseData = this.getInitialData()
            ++this.key
        },
        focused () {
            this.checkLeave()
        },
        pinned () {
            this.checkLeave()
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
        getInitialData () {
            const initialData = {}
            this.request.body.forEach((field) => {
                if (this.request.type === 'form') {
                    initialData[field.name] = field.default ? field.default : ''
                } else if (this.request.type === 'tab') {
                    initialData[field.name] = {}
                }
            })
            return initialData
        },
        dialogTabSwitchTo (relative, idx) {
            const tab = this.$refs.dialogTab
            if (!tab) return false
            if (relative)
                tab.selectId += idx
            else
                tab.selectId = idx
            const len = this.request.body.length
            while (tab.selectId < 0) tab.selectId += len
            tab.selectId %= len
            this.$nextTick(() => {
                this.$el.getElementsByClassName('dialog-switch-focus')[0].focus()
            })
            return true
        },
        togglePin () {
            this.pinned = !this.pinned
        },
        checkLeave () {
            if (!this.focused && !this.pinned) {
                window.setTimeout(() => {
                    if (!this.focused && !this.pinned) this.close()
                }, 100)
            }
        }
    },
    inject: ['t']
}
</script>
