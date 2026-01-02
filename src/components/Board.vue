<template>
    <h1
        class="p-3 mb-5 text-center font-bold text-3xl text-white bg-gradient-to-r to-[oklch(0.9 0.12 144.16)] via-orange-300 from-[oklch(0.97 0.02 218.41)] bg-gradient-to-r from-teal-200 to-lime-200 text-shadow-lg/30">
        Kanban Board</h1>

    <div class="container mx-auto px-5">
        <div class="text-right pb-5">
            <button type="button" @click="showTaskModal = true"
                class="text-black font-medium rounded-md text-sm px-4 py-2 shadow-md">
                Add Task
            </button>
        </div>

        <div class="grid md:grid-cols-3 gap-3">
            <div v-for="column in statusColumns" :key="column.type" class="boardColumn"
                :style="{ backgroundColor: column.color }">
                <!-- Column title -->
                <h3 class="text-center font-bold pt-2">
                    <span v-if="!column.isEditing" @dblclick="column.isEditing = true" class="cursor-pointer">
                        {{ column.title }}
                    </span>

                    <input v-else type="text" v-model="column.title" @blur="finishEdit(column)"
                        @keyup.enter="finishEdit(column)" class="text-center border rounded px-1 text-sm" />
                </h3>

                <!-- Drop zone -->
                <div class="taskContainer p-4" @dragover.prevent="onDragOver" @drop="onDrop($event, column.type)">
                    <div v-for="task in tasksByStatus(column.type)" :key="task.id" draggable="true"
                        @dragstart="onDragStart($event, task)"
                        class="p-2 border border-slate-300 rounded-sm shadow-md mb-4 bg-white">
                        <div class="flex justify-between border-b pb-2">
                            <h4 class="font-bold">{{ task.title }}</h4>
                            <span :class="`chips-${column.theme}`" class="text-xs px-2 py-0.5 rounded-full">
                                {{ column.title }}
                            </span>
                        </div>
                        <p class="py-2">{{ task.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AddTask :open="showTaskModal" @close-event="showTaskModal = false" @addTask="addTask" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { StatusType, Task } from "./types";
import { STATUS } from "./types";
import { LOCAL_TASK } from "./constant";
import AddTask from "./AddTask.vue";

/* ---------------- state ---------------- */

const statusColumns = ref([
    { title: "To-Do", type: STATUS.TODO, color: "#eafaff", theme: "blue", isEditing: false },
    { title: "In-Progress", type: STATUS.IN_PROGRESS, color: "#ffdfa4", theme: "orange", isEditing: false },
    { title: "Done", type: STATUS.DONE, color: "#abf2ab", theme: "green", isEditing: false },
]);

const tasks = ref<Task[]>([]);
const showTaskModal = ref(false);

/* ---------------- lifecycle ---------------- */

onMounted(() => {
    const savedTasks = localStorage.getItem(LOCAL_TASK);
    if (savedTasks) {
        tasks.value = JSON.parse(savedTasks);
    }

    const savedColumns = localStorage.getItem("KANBAN_COLUMNS");
    if (savedColumns) {
        statusColumns.value = JSON.parse(savedColumns);
    }
});

/* ---------------- helpers ---------------- */

const tasksByStatus = (status: StatusType) => {
    return tasks.value.filter(task => task.status === status);
};

const persistTasks = () => {
    localStorage.setItem(LOCAL_TASK, JSON.stringify(tasks.value));
};

const persistColumns = () => {
    localStorage.setItem("KANBAN_COLUMNS", JSON.stringify(statusColumns.value));
};

/* ---------------- column title edit ---------------- */

const finishEdit = (column: any) => {
    column.isEditing = false;
    persistColumns();
};

/* ---------------- task actions ---------------- */

const addTask = (task: Task) => {
    tasks.value.push(task);
    showTaskModal.value = false;
    persistTasks();
};

/* ---------------- drag & drop ---------------- */

const onDragStart = (event: DragEvent, task: Task) => {
    event.dataTransfer?.setData("text/plain", task.id);
    event.dataTransfer!.effectAllowed = "move";
};

const onDragOver = (event: DragEvent) => {
    const target = event.currentTarget as HTMLElement;
    target.classList.add("drop-active");
};

const onDrop = (event: DragEvent, status: StatusType) => {
    const target = event.currentTarget as HTMLElement;
    target.classList.remove("drop-active");

    const taskId = event.dataTransfer?.getData("text/plain");
    if (!taskId) return;

    tasks.value = tasks.value.map(task =>
        task.id === taskId ? { ...task, status } : task
    );

    persistTasks();
};
</script>

<style scoped>
@reference "tailwindcss";

.boardColumn {
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
    @apply border border-[#ddd] rounded-md shadow-md;
}

.taskContainer {
    flex: 1;
}

.boardColumn:hover {
    @apply shadow-xl -translate-y-1;
}

.drop-active {
    border: 2px dashed #333;
    background-color: rgba(0, 0, 0, 0.03);
}

.chips-blue {
    @apply bg-sky-100 text-sky-700;
}

.chips-orange {
    @apply bg-orange-100 text-orange-700;
}

.chips-green {
    @apply bg-green-100 text-green-700;
}
</style>
