<template>
    <div class="mp-messagebox" @click="message.callback">
        <div class="mp-messagebox-buttons">
            <button v-for="button in message.buttons" :key="button.name" @click="button.callback" class="mp-messagebox-button" :title="button.title">
                <i :class="'fa ' + button.icon"/>
            </button>
        </div>
        <div class="mp-messagebox-body">
            <i :class="'fa ' + message.icon" v-if="message.icon" class="mp-messagebox-icon"/>
            <strong v-if="message.title">{{ message.title }}</strong><br v-if="message.title">
            <span>{{ message.text }}</span>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.mp-messagebox
    background-color white
    padding 10px
    margin 10px
    box-shadow 0 0 5px rgba(0, 0, 0, .3)
    border 1px solid #ddd
    transition all 200ms ease-out
    color #666
    cursor pointer
.mp-messagebox:hover
    box-shadow 0 0 10px rgba(0, 0, 0, .3)
    transform scale(1.03)
.mp-messagebox:active
    box-shadow 0 0 3px rgba(0, 0, 0, .3)
    transform scale(0.97)
.mp-messagebox-icon
    margin-right 7px
    margin-left -2px
    width 20px
    text-align center
.mp-messagebox-body
    hyphens auto
.mp-messagebox-buttons
    float right
.mp-messagebox-button
    background transparent
    border none
    min-width 24px
    font-size 16px
    padding 0
    cursor pointer
    color inherit
    transition all 300ms ease-out
    border 1px solid transparent
    text-align center
.mp-messagebox-button:hover
    border 1px solid #ddd
    background-color #eee
</style>


<script>
import { default as classMessageBox } from '../utils/MessageBox'

export default {
    props: {
        message: {
            type: classMessageBox,
            required: true
        }
    }
}
</script>
