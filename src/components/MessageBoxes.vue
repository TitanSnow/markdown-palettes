<template>
    <div class="mp-messageboxes-wrapper">
        <div class="mp-messageboxes-container">
            <transition-group name="messageboxlist" tag="div">
                <message-box
                    v-for="message in messages"
                    :message="message"
                    :key="message.symbol"
                    class="mp-messagebox"/>
            </transition-group>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.mp-messageboxes-wrapper
    position absolute
    left 0
    bottom 0
    z-index 9998
    pointer-events none
    width 100%
.mp-messageboxes-container
    margin-left auto
    margin-right 0
    width 300px
    pointer-events initial
    overflow hidden

.mp-messagebox.messageboxlist-enter-active, .mp-messagebox.messageboxlist-leave-active
    transition all 100ms ease-out
.mp-messagebox.messageboxlist-enter, .mp-messagebox.messageboxlist-leave-to
    transform translateX(300px)
</style>

<script>
import MessageBox from './MessageBox.vue'

export default {
    props: {
        messages: {
            type: Array,
            default: []
        }
    },
    components: { MessageBox }
}
</script>
