import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowded] = useState("false");
  const [charAllowed, setCharAllowed] = useState("false");
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  let passwordGenerator = useCallback(()=>{
    let pass ="";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str+= "1234567890";
    if(charAllowed) str+=" !@#$%^&*()_{}?``";

    for (let i = 1;  i<=length; i++) {
      let char = Math.floor(Math.random()*str.length + 1);
      pass+= str.charAt(char);
      
    }
    setPassword(pass);
    
  },[length, numberAllowed,charAllowed, setPassword])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])
   
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed, charAllowed])

  return (
    <>
   <div className=' text-orange-600 bg-gray-700 px-8 py-6 rounded-lg'>
    <p className="text-white text-center text-2xl mb-2 rounded-md"> Password Generator </p>
    <div className='flex shadow rounded-lg'>
      <input
      type ='text'
      value = {password}
      className='outline-none w-full py-1 px-2'
      placeholder = 'password'
      readOnly
      />
      <button 
      onClick={copyPassword}
      className='outline-none bg-blue-500 text-white px-4 py-2 shrink'> copy </button>
    </div>

    <div className='flex items-center gap-x-3'> 

      <div>
      <input
      type = 'range'
      min = {8}
      max = {50}
      className='accent-blue-600 cursor-pointer'
      value = {length}
      onChange={(e)=>{setLength(e.target.value)}}
      ref = {passwordRef}
      />
      <label> length: {length} </label>  
      </div>
    
      <div>
      <input
      type='checkbox'
      defaultChecked={numberAllowed}
      className='accent-blue-600'
      id='numberInput'
      onChange={()=>{
        setNumberAllowded((prev) => !prev)
      }}
      />
      <label htmlFor='numberInput'> Numbers </label>
      </div>

      <div >
      <input
      type='checkbox'
      defaultChecked={charAllowed}
      className='accent-blue-600'
      id='CharacterInput'
      onChange={()=>{
        setCharAllowed((prev) => !prev)
      }}
      />
      <label htmlFor='CharacterInput'> Characters </label>
      </div>
    </div>
   </div>
    </>
  )
}

export default App
