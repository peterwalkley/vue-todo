const state = {
  tasks: [],
};

const mutations = {
  UPDATE_TASKS: (state, payload) => (state.tasks = payload),
  ADD_TASK: (state, newTask) => (state.tasks = [...state.tasks, newTask]),
  REMOVE_TASK_BY_ID: (state, id) =>
    (state.tasks = state.tasks.filter((task) => task.id !== id)),
  TOGGLE_TASK: (state, update) => {
    const i = state.tasks.findIndex((task) => task.id === update.id);
    if (i !== -1) state.tasks.splice(i, 1, update);
  },
};

const actions = {
  async getTasks({ commit }) {
    const res = await fetch("api/tasks");
    const data = await res.json();
    commit("UPDATE_TASKS", data);
  },
  async addTask({ commit }, task) {
    const res = await fetch("api/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    commit("ADD_TASK", data);
  },
  async deleteTask({ commit }, id) {
    const res = await fetch(`api/tasks/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      commit("REMOVE_TASK_BY_ID", id);
      return true;
    } else {
      return false;
    }
  },

  async toggleTask({ commit }, id) {
    const fetchRes = await fetch(`api/tasks/${id}`);
    const taskToToggle = await fetchRes.json();

    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });
    const data = await res.json();

    commit("TOGGLE_TASK", data);
  },
};
const getters = {
  allTasks: (state) => state.tasks,
};

const taskModule = {
  state,
  mutations,
  actions,
  getters,
};

export default taskModule;
