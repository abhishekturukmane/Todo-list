import React, { useState } from "react";
import todo from "../images/todo.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus ,circlexmark , pentosquare} from '@fortawesome/free-solid-svg-icons'
const TodoList1=()=>{

    const [search,setSearch]=useState("");
    const [items,setItems]=useState([]);
    const [toggle,setToggle]=useState(true);
    const [editItem,setEditItem]=useState(null);
    const inputEvent=(e)=>{
       // console.log(e.target.value);
        setSearch(e.target.value);
    }
    const addItems=()=>{
        if(!search)
        {
            alert("please fill data");
        }
        else if(search && !toggle)//toogle is false(edit)
        {
            setItems(
                items.map((curr)=>{
                    if(curr.id===editItem)
                    {
                        return {...curr ,name:search}
                    }
                    return curr;
                })
            )
            setSearch("");
            setToggle(true);
            setEditItem(null);
        }
        else{
            const allInputData={id:new Date().getTime().toString(), name:search}
            setItems((prev)=>[...prev,allInputData]);
            setSearch("");
            console.log(items)
        }
        
    }
    const delItems=(index)=>{
        
        const updatedItems= 
                    items.filter((curr)=>{
                        return index!==curr.id;
                })
        console.log(updatedItems);
        setItems(updatedItems);
    }


    
    const EditItems=(index)=>{
        const edited=items.find((curr)=>{
            return index===curr.id;
        });
        console.log(edited.name)
        
        setToggle(false);
        setSearch(edited.name);
        setEditItem(index);
    }
    const remove=()=>{
        setItems([]);
    }
    return(
        <>
            <div className="main_div">
                <div className="sub_div">
                    <div className="title">
                        <figure>
                            <img src={todo} alt="img"/>
                            <figcaption className="h1">
                            Welcome to TodoList 
                            </figcaption>
                        </figure>
                        
                    </div>

                    <div className="input">
                        <input  type="text" placeholder="Enter items" 
                        onChange={inputEvent} value={search}/>
                        {
                            toggle?
                            ( 
                            <i className="fa fa-plus add-btn" title="Add items"
                            onClick={addItems} ></i>):
                            ( 
                                <i class="fa-regular fa-pen-to-square editInput-btn"
                                onClick={addItems}></i>
                            )
                        }

                    </div>
                    {
                       
                        items.map((curr)=>{
                            return(
                                <>
                                    <div className="showItems" key={curr.id} >
                                        <div className="mini_show">
                                            <h3 className="items">{curr.name}</h3>
                                            <div className="edit_del">
                                            <i class="fa-regular fa-pen-to-square edit-btn"
                                            onClick={()=>EditItems(curr.id)}></i>
                                            <i class="fa-sharp fa-regular fa-circle-xmark del-btn" 
                                            onClick={()=>delItems(curr.id)}></i>
                                            </div>
                                        </div>
                                    </div>
                                
                                </>
                            )
                        
                        })
                    }
                    

                    <div className="btn_remove">
                            <button onClick={remove}>Remove All</button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default TodoList1;