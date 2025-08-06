<script setup>

defineProps({
    modalActive: {
        type: Boolean,
        default: false
    },
})

defineEmits(['close-modal'])

</script>

<template>
    <Transition name="modal-outer" duration="800">
        <div v-show="modalActive" class="absolute w-full bg-gray-800/50 h-screen top-0 left-0 flex justify-center px-8">

            <div class="p-4 bg-white self-start mt-32 max-w-screen-md">
                <slot />
                <button @click="$emit('close-modal')" class="text-white mt-8 bg-cyan-800 hover:bg-cyan-700 transition py-2 px-6 cursor-pointer">
                    Close
                </button>
            </div>

        </div>
    </Transition>
</template>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.4s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}
</style>