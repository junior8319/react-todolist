import React from 'react';
import TodoProvider from './context/TodoContext';
import Home from './pages/Home';
import Modal from 'react-modal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

Modal.setAppElement('#root');

function App() {
  return (
    <>
      <TodoProvider>
        <DndProvider backend={ HTML5Backend }>
          <Home />
        </DndProvider>
      </TodoProvider>
    </>
  );
}

export default App;
