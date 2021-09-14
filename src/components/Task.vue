<template>
  <div
    @dblclick="this.toggleTask(task.id)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <h3>
      {{ task.text }}
      <i @click="checkAndDeleteTask(task.id)" class="fas fa-times"></i>
    </h3>
    <p>{{ task.day }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Task",
  props: {
    task: Object,
  },
  methods: {
    ...mapActions(["deleteTask", "toggleTask"]),
    async checkAndDeleteTask(id) {
      if (confirm("Are you sure?")) {
        const res = await this.deleteTask(id);
        if (!res) alert("Error deleting task");
      }
    },
  },
};
</script>

<style scoped>
.fas {
  color: red;
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.reminder {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
