
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
    import{ getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCxMsaYKl9an3531LYzQq86o8cCWG9KP48",
      authDomain: "banco-c2519.firebaseapp.com",
      projectId: "banco-c2519",
      storageBucket: "banco-c2519.appspot.com",
      messagingSenderId: "1023790112717",
      appId: "1:1023790112717:web:712aa4dd8dc61ac6bf2e84"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore ()

  export const saveFor = (nombre,apellido,user,contra,email,dinero) => {
      addDoc (collection(db, 'users'),{nombre, apellido, user, contra, email, dinero})
  }

  export const getUsers = () => getDocs(collection(db,'users'))
  export const onGetUsers = (callback) => onSnapshot(collection(db, 'users'), callback)
  export const deleteUser = id => deleteDoc(doc(db,'users', id))
  export const getUser = id => getDoc(doc(db,'users', id))
  export const updateUser = (id, newUsers) => updateDoc(doc(db,'users', id), newUsers)
 

  export const getUserByName =   async (username) => {
    const q = query(collection(db, "users"), where("user", "==", username));
    const querySnapshot = await getDocs(q);
    var  ids = [];
  
    querySnapshot.forEach((doc) => {
       //doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
       ids.push(doc.id)

    });
    
    return ids

 }

 /*export const prueba = (username) =>{
  const docs = getUsers()
  docs

 }*/

 
