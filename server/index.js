require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.APP_PORT;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable parsing of JSON request bodies

// API routes
app.get("/api/todos", async (req, res) => {
    try {
        const todosId = req.query.id;
        const { data, error } = await supabase
            .from('todos')
            .select()
            .eq('id', todosId);
        console.log(data);
        if (data.length === 0) {
            console.log("not found!");
            res.status(200).send({
                id: "",
                todos: []
            });
        } else {
            res.status(200).send(data[0]);
        }
    } catch {
        res.status(404).send("Failed to fetch the todos");
    }
});

app.put("/api/todos", async (req, res) => {
    try {
        const todosId = req.query.id;
        const todos = req.body;
        console.log(todosId);
        console.log(todos);
        const { error } = await supabase
            .from('todos')
            .upsert({ id: todosId, todos: todos });
        res.status(200).send({
            id: todosId,
            todos: todos
        });
    } catch {
        res.status(404).send("Failed to save the todos");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});