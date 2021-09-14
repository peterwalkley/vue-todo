<template>
  <div :key="task.id" v-for="task in allTasks">
    <Task :task="task" />
  </div>
</template>

<script>
import Task from "./Task";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Tasks",
  components: {
    Task,
  },
  computed: {
    ...mapGetters(["allTasks"]),
  },
  methods: {
    ...mapActions(["getTasks"]),
  },
  created() {
    this.getTasks();
  },
};
</script>
