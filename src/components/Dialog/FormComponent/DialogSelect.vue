<template>
    <div 
        :class="focused ? 'focused' : ''" 
        class="mp-dialog-select" 
        @keydown.up.prevent="moveSelection(-1)" 
        @keydown.down.prevent="moveSelection(1)" 
        @focusin="focused = true" 
        @focusout="focused = false">
        <dialog-input 
            ref="dialogInput" 
            :request-field="{ title: requestField.title, param: { placeholder: t('检索…') } }" 
            v-model="inputValue"/>
        <ul>
            <li 
                v-for="(item, idx) in filteredOptions" 
                :key="item.title + '\uFFFE' + item.value" 
                :class="selectedId === idx ? 'focused' : ''" 
                @click="clickIdx(idx)">
                <i class="fa fa-angle-right"/>
                <span class="primary-title">
                    <span v-if="item.titleTokens"><span 
                        v-for="token in item.titleTokens" 
                        :class="token[1] ? 'match' : ''" 
                        :key="token.join()">{{ token[0] }}</span></span>
                    <span v-else>{{ item.title }}</span>
                </span><br>
                <span 
                    v-if="item.enTitle && item.enTitle != item.title" 
                    class="en-title">
                    <span v-if="item.enTitleTokens"><span 
                        v-for="token in item.enTitleTokens" 
                        :class="token[1] ? 'match' : ''" 
                        :key="token.join()">{{ token[0] }}</span></span>
                    <span v-else>{{ item.enTitle }}</span>
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="stylus">
    .mp-dialog-select > ul
        list-style none
        margin 0
        padding 0
    .mp-dialog-select > ul > li:first-child
        padding-top 6px
    .mp-dialog-select > ul > li
        cursor pointer
        padding 3px
        color #999
        transition background-color 100ms ease-out, color 100ms ease-out
        padding-left calc(20% + 3px)
        line-height 1
    .mp-dialog-select.focused > ul > li
        color #666
    .mp-dialog-select > ul > li > i.fa
        color #999
        margin-left -18px
        margin-right 18px
        width 0
        overflow visible
    .mp-dialog-select > ul > li.focused
        background-color #eee
        color #000
    .mp-dialog-select > ul > li > span.en-title
        font-size .7em
    .mp-dialog-select > ul > li > span  span.match
        text-decoration underline
</style>

<script>
import AbstractDialogComponent from './AbstractDialogFormComponent'
import DialogInput from './DialogInput.vue'
import { getCurrentLanguage } from '../../../utils/i18n'
import Fuse from 'fuse.js'

export default {
    name: 'dialog-select',
    components: {DialogInput},
    extends: AbstractDialogComponent,
    data () {
        return {
            inputValue: this.value,
            selectedId: null,
            focused: false,

        }
    },
    computed: {
        autoopen () {
            return this.param.autoopen ? true : false
        },
        twoLangsOptions () {
            return this.param.options.map(({ title, value }) => {
                const result = {
                    title: this.t(title),
                    value
                }
                if (!/^en/.test(getCurrentLanguage())) {
                    result.enTitle = this.t(title, ['en'])
                }
                return result
            })
        },
        filteredOptions () {
            if (this.inputValue) {
                const searchResult = this.fuseSearchObj.search(this.inputValue)
                return searchResult.map(({ item: { title, enTitle, value }, matches }) => {
                    const result = {
                        title, enTitle, value
                    }
                    for (const {indices, key, value} of matches) {
                        let lastIndex = 0
                        const tokens = []
                        for (const [from, to] of indices) {
                            tokens.push([value.substr(lastIndex, from - lastIndex), false])
                            tokens.push([value.substr(from, to + 1 - from), true])
                            lastIndex = to + 1
                        }
                        if (lastIndex < value.length) {
                            tokens.push([value.substr(lastIndex), false])
                        }
                        result[key + 'Tokens'] = tokens
                    }
                    return result
                })
            } else {
                return this.twoLangsOptions
            }
        },
        fuseSearchObj () {
            const includeEnTitle = !/^en/.test(getCurrentLanguage())
            const keys = ['title']
            if (includeEnTitle) keys.push('enTitle')
            return new Fuse(this.twoLangsOptions, {
                includeMatches: true,
                shouldSort: true,
                keys
            })
        }
    },
    watch: {
        inputValue () {
            if (this.selectedId == null) {
                this.selectedId = 0
            }
        }
    },
    methods: {
        moveSelection (steps) {
            if (this.selectedId == null) {
                this.selectedId = 0
            } else {
                this.selectedId += steps
                const len = this.filteredOptions.length
                while (this.selectedId < 0) {
                    this.selectedId += len
                }
                this.selectedId %= len
            }
        },
        clickIdx (idx) {
            this.selectedId = idx
            this.$refs.dialogInput.$el.querySelector('input').focus()
        },
        getCurrentLanguage
    },
}
</script>
