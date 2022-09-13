import {saveFor, getUsers, onGetUsers, deleteUser, getUser, updateUser, getUserByName } from '../js/config.js'
/*COnstantes primer fomulario */
const openModal = document.getElementById('openRegisterModal')
const modal = document.getElementById('modal')
const closeModal = document.getElementById('cerrarRegisterModal')
const registerForm = document.getElementById('register-form')

/*CONSTANTES SEGUNDO FORMULARIO */
const openModal2 = document.getElementsByClassName('btn-transfer')
const modal2 = document.getElementById('modal2')
const closeModal2 = document.getElementById('cerrarTranfersModal')
const TransferForm = document.getElementById('transfer-form')

var emisor;
var montoEmisor;
var task = '';

const showRegisterModal = ()=>{
    modal.classList.toggle('is-active')
}

const showTransferModal = ()=>{
    modal2.classList.toggle('is-active')
}

openModal.addEventListener('click', showRegisterModal)
closeModal.addEventListener('click', showRegisterModal)
closeModal2.addEventListener('click', showTransferModal)









const listaUsuarios= document.getElementById('listaUsuarios')


let editStatus = false
let id = ''
let nombres = [];

/*Acciones cuando empienza el programa */

window.addEventListener('DOMContentLoaded', async () => {
    
    /*Tomar los usuarios de la base de datos, mandar  y refrescar  la tabla */
    onGetUsers((querrySnapshot) => {
        let html = ""
        let html2= ""
        let i = 1

        querrySnapshot.forEach((doc) => {



            const task = doc.data()

            
            html += `
                
                <tr>
                    
                    <th>${i++}</th>

                    <td>${task.nombre}</td>
                    <td>${task.apellido}</td>
                    <td>${task.user}</td>
                    <td>${task.contra}</td>
                    <td>${task.email}</td>
                    <td>${task.dinero}</td>
                    <td>
                    <button class ='btn-editar' data-id = "${doc.id}">Editar</button>
                    <button class ='btn-delete' data-id = "${doc.id}">Delete</button>
                    
                    </td>
                    
                   
                </tr>
                          
                `
                nombres.push(task.nombre)


           
        })

        listaUsuarios.innerHTML = html

        /* Eliminar Usuario */
        const btnEliminar = listaUsuarios.querySelectorAll('.btn-delete')
        btnEliminar.forEach(btn =>{
            btn.addEventListener('click', ({target: { dataset }}) =>{
                deleteUser(dataset.id )
                
            } )
        })

        /* Editar Usuarios */

        const btnEditar =  listaUsuarios.querySelectorAll('.btn-editar')
        btnEditar.forEach ((btn) => {
            btn.addEventListener('click', async (e) =>{
                const doc = await getUser(e.target.dataset.id)
                console.log(doc)
                const task = doc.data()
                registerForm['nombre'].value = task.nombre
                registerForm['apellido'].value = task.apellido
                registerForm['user'].value = task.user
                registerForm['contra'].value = task.contra
                registerForm['email'].value = task.email
                registerForm['dinero'].value = task.dinero

               editStatus = true 
               id = doc.id

               registerForm['submit'].innerText = 'Update'
                showRegisterModal()

            })
        })


       const btnTranferir = listaUsuarios.querySelectorAll('.btn-transfer')
       btnTranferir.forEach(btn =>{
            btn.addEventListener('click', async (e) =>{
                const doc = await getUser(e.target.dataset.id)
                emisor = doc.id
                montoEmisor = doc.data().dinero
                showTransferModal()



                
            } )
        })

    })




})



 /*Aqui guardamos datos en variables y en Firebase*/
registerForm.addEventListener('submit',  (e)=>{
    e.preventDefault()
    const nombre= registerForm['nombre']
    const apellido = registerForm['apellido']
    const user = registerForm['user']
    const contra = registerForm['contra']
    const email = registerForm['email']
    const dinero=  registerForm['dinero']


    /*Aqui ponemos un if para ver si estamos editando o agregando nuevo usuario */
    if(!editStatus){

        
        saveFor(nombre.value, apellido.value, user.value, contra.value, email.value, dinero.value)
        
        
    }
    else{

        /*Actualizamos  la lista */

        updateUser(id,{
            nombre:nombre.value,
            apellido: apellido.value, 
            user: user.value, 
            contra: contra.value, 
            email: email.value, 
            dinero: dinero.value})  

        editStatus = false      

    }

    

    showRegisterModal()

    registerForm.reset()


})


TransferForm.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const userTransfer = TransferForm['userTransfer']
    const monto=  TransferForm['monto']

    updateUser(emisor,{dinero: montoEmisor - monto.value})  
    const doc = await getUserByName(userTransfer.value)
    console.log(doc.id)
   
    //getUserByName(userTransfer.value).then(ids => console.log(ids[0]))
     
    //updateUser(receptor,{dinero: montoReceptor + monto.value})
  
    



    showTransferModal()
    
    TransferForm.reset()


})


