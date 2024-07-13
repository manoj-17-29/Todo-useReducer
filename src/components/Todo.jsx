import React, { useReducer, useState } from 'react'

const initialState = [];

    function reducer(state, action) {
      switch (action.type) {
        case "ADD_ITEM":
          return [...state, { id: state.length+1, name: action.payload },
];
        case "REMOVE_ITEM":
          return state.filter((item) => item.id !== action.payload);
        case "UPDATE_ITEM":
          return state.map((item) =>
            item.id === action.payload.id
              ? { ...item, name: action.payload.newName }
              : item
          );
        default:
          return state;
      }
    }

export default function Todo() {

const [todo, setTodo] = useState("");



    const[items, dispatch] = useReducer(reducer, initialState); // item is a state , dispatch is function , reducer is function, intialState is a state

  return (
    <>
      <div className="w-11/12 md:w-8/12 lg:w-1/2 mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 text-start my-5 ">
            Todo List :
          </h2>

          <div className="flex justify-around gap-4 w-11/12 my-10 mx-auto">
            <input
              type="text"
              className="border-2 w-full px-4 rounded-lg"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button
              onClick={() => {
                dispatch({ type: "ADD_ITEM", payload: todo });
                setTodo("");
              }}
              className="bg-blue-500 rounded-xl text-white font-bold px-3 py-2 hover:shadow-xl hover:scale-110 duration-300"
            >
              Add
            </button>
          </div>

          <div className=" bg-slate-200 py-10 px-4 flex flex-col w-11/12  mx-auto rounded-xl">
            <h1 className="font-bold text-lg ms-2">
              No of Todos : {items.length}
            </h1>
            {items.map((item) => (
              <div className="bg-white px-10 py-6 mx-auto my-5 w-11/12  justify-center rounded-lg">
                <div key={item.id} className="flex justify-between">
                  <div className="font-bold">{item.id}.</div>

                  <div className="px-4">
                    <span className="break-words word-break-all overflow-wrap-normal">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex">
                    <button
                      className="px-2 text-green-600"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_ITEM",
                          payload: {
                            id: item.id,
                            newName: prompt("Update todo :", item.name),
                          },
                        })
                      }
                    >
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="px-2 text-red-600"
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: item.id })
                      }
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
