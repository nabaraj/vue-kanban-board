<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['open'])
const emit = defineEmits(['closeEvent', 'addTask']);
function closeModal() {
    emit('closeEvent')
}
const title = ref('');
const description = ref('');
const submitForm = () => {
    emit("addTask", { id: crypto.randomUUID().toString(), title: title.value, description: description.value, status: 'todo' })
    title.value = '';
    description.value = ''
}
</script>
<template>
    <div id="default-modal" tabindex="-1" aria-hidden="true" :class="open ? 'show' : 'hidden'"
        class="bg-[#00000038] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[100vh] max-h-full">
        <div class="relative p-4 w-full max-w-2xl max-h-full m-auto bg-white rounded">
            <!-- Modal content -->
            <div class="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                <!-- Modal header -->
                <div class="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                    <h3 class="text-lg font-medium text-heading">
                        Add Task
                    </h3>
                    <button type="button" @click="closeModal"
                        class="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                        data-modal-hide="default-modal">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="space-y-4 md:space-y-6 py-4 md:py-6">
                    <div class="mb-5">
                        <label for="title" class="block mb-2.5 text-sm font-medium text-heading">Task Name</label>
                        <input type="text" id="title" v-model="title"
                            class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-[12px] focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                            placeholder="name@flowbite.com">
                    </div>
                    <div class="mb-5">
                        <label for="description" class="block mb-2.5 text-sm font-medium text-heading">Task
                            Description</label>
                        <textarea v-model="description" id="description" rows="4"
                            class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-[12px] focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                            placeholder="Write your thoughts here..."></textarea>
                    </div>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center border-t border-default space-x-4 pt-4 md:pt-5">
                    <button @click="submitForm" data-modal-hide="default-modal" :disabled="!title && !description"
                        type="button"
                        class="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-[12px] text-sm px-4 py-2.5 focus:outline-none">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>