import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from './Todo';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Todo />} />
                <Route path="/:id" element={<Todo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App