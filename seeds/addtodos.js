
const path = require("path");

exports.seed = async (knex) => {
  const fileName = path.basename(__filename);
  const existSeed = await knex("knex_seeds_lock").where({ file_name: fileName }).first();
 
  if (!existSeed) {
    const todos = [
      { title: "Test A 004" },
      { title: "Test A 005" },
      { title: "Test A 006" }
    ];

    await Promise.all(todos.map(todo => {
      return knex("todos").insert({ created_by: "Misha", ...todo })
    }));

    await knex("knex_seeds_lock").insert({ file_name: fileName })
  }
};