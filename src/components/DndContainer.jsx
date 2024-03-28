
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import TaskItem from "./TaskItem.jsx";

function DndContainer({onDragEnd, tasks, onDelete, onChangeIsChecked, onSaveEdit}) {
    const currentTasks = tasks;

    return (
      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="toDoListItems">
                    {currentTasks.map((task, index) => (
                      <Draggable key={index} draggableId={index.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`toDoListItem ${snapshot.isDragging ? "dragging" : ""}`}
                          >
                            <TaskItem
                              key={index}
                              task={task}
                              index={index}
                              onDelete={onDelete}
                              onChangeIsChecked={onChangeIsChecked}
                              onSaveEdit={onSaveEdit}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
              )}
          </Droppable>
      </DragDropContext>
    );
}

export default DndContainer;
