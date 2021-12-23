import './App.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
function App() {
  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  return (
    <div className="app">
      <div className="card col-lg-4 col-md-7 container mt-5">
        <div className="card-body text-center mt-2">
          <h1>Todo List</h1>
          <div className="container col-8">
            <div className="mt-3 mb-3 input-group input-group-lg shadow-sm">

              <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." className='form-control' />
              <i onClick={() => {
                if (toDo !== '') {
                  setToDos([...toDos, { id: Date.now(), text: toDo, status: false, delete: false }])
                } else {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  Toast.fire({
                    icon: 'error',
                    title: 'Input field is Empty'
                  })
                }
              }}
                className="fas fa-plus btn btn-outline-primary"></i>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="container col-lg-4 col-md-7 card shadow rounded">
        <div className="card-body container mb-4 mt-3">

          <div className="nav nav-tabs justify-content-center mb-4" id="nav-tab" role="tablist">
            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">List</button>
            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Completed</button>
            <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Deleted</button>
          </div>

          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <div className="col-11 container justify-content-between">
                {toDos.map((obj) => {
                  if (obj.delete !== true && obj.status === false) {

                    return (<div className="border p-2 d-flex justify-content-between mt-3 shadow-sm rounded">
                      <div className="mt-2">
                        <input onChange={(e) => {
                          console.log(e.target.checked)
                          console.log(obj)
                          setToDos(toDos.filter(obj2 => {
                            if (obj2.id === obj.id) {
                              obj2.status = e.target.checked
                            }
                            return obj2
                          }))
                        }} value={obj.status} type="checkbox" className='checkbox' name="" id="" />

                      </div>
                      <div className='mt-2'>
                        <p>{obj.text}</p>
                      </div>
                      <div className="m-2">
                        <i className="far fa-edit" onClick={async () => {
                          const { value: text } = await Swal.fire({
                            input: 'text',
                            inputLabel: 'Message',
                            inputValue: obj.text,
                            inputPlaceholder: 'Type your message here...',
                            inputAttributes: {
                              'aria-label': 'Type your message here'
                            },
                            showCancelButton: true,
                            inputValidator: (value) => {
                              if (value !== '') {
                                setToDos(toDos.filter((obj2) => {
                                  if (obj2.id === obj.id) {
                                    obj2.text = value
                                  }
                                  return obj2
                                }));
                              }else {
                                const Toast = Swal.mixin({
                                  toast: true,
                                  position: 'top-end',
                                  showConfirmButton: false,
                                  timer: 3000,
                                  timerProgressBar: true,
                                  didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                  }
                                })
                                Toast.fire({
                                  icon: 'error',
                                  title: 'Input field is Empty'
                                })
                              }
                            }
                          })

                          

                          
                        }}></i>
                      </div>
                      <div className="m-2">
                        <i className="far fa-trash" onClick={(e) => {
                          setToDos(toDos.filter(obj2 => {
                            if (obj2.id === obj.id) {
                              obj2.delete = true
                            }
                            console.log(obj2.delete)
                            return obj2
                          }))
                        }} ></i>
                      </div>
                    </div>)
                  }
                  return null
                })}
              </div>
            </div>
            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

              {toDos.map((obj) => {
                if (obj.status) {
                  return (
                    <div className="col-11 container justify-content-between">
                      <div className='border p-2 d-flex mt-3 shadow-sm rounded'>
                        <p className='m-2'>{obj.text}</p>
                      </div>
                    </div>
                  )
                }
                return null
              })}
            </div>

            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
              {toDos.map((obj) => {
                if (obj.delete) {
                  return (
                    <div className="col-11 container justify-content-between">
                      <div className='border p-2 d-flex mt-3 shadow-sm rounded'>
                        <p className='m-2'>{obj.text}</p>
                      </div>
                    </div>
                  )
                }
                return null
              })}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
