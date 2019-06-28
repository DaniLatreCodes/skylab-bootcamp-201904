import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'


function Profile({ history }){

  const [ user, setUser ] = useState({})
  const [ messageError, setErrorMessage ] = useState('')

  useEffect( 
    () => {
      async function handleRetrieveUser(){
        const user_ = await logic.retrieveUser()
        setUser(user_)
      }
      handleRetrieveUser()
    }
    ,[])

    async function handleSubmit( event ){
      event.preventDefault()
      const {
        name: { value: name },
        surname: { value: surname },
        email: { value: email },
        password: { value: password },
        age: { value: age }
      } = event.target
      try {
        await logic.updateUser(name, surname, email, password, age)
        history.push('/login')
      } catch (error) {
        setErrorMessage(error.message)
      }
      console.log(messageError)
    }


  
    return(
      <body>
    <section className="container">
      <section className="columns is-one-is-offset-one-fifth-touch">
      
        <section className="column">
    <form onSubmit={handleSubmit}>

      <div className='field'>
        <label className='label is-size-5 is-radiusless'>Name</label>
        <div className='control'>
          <input className='input is-medium is-radiusless' name='name' type='text' placeholder={user.name} />
        </div>
      </div>

      <div className='field'>
        <label className='label is-size-5 is-radiusless'>Surname</label>
        <div className='control'>
          <input className='input is-medium is-radiusless' name='surname' type='text' placeholder={user.surname} />
        </div>
      </div>

      <div className='field'>
        <label className='label is-size-5 is-radiusless'>Email</label>
        <div className='control'>
          <input className='input is-medium is-radiusless' name='email' type='email' placeholder={user.email} />
        </div>
      </div>

      <div className='field'> 
        <label className='label is-size-5 is-radiusless'>Password</label>
        <div className='control'>
          <input className='input is-medium is-radiusless' name='password' type='password' placeholder='password' />
        </div>
      </div>
   
      <div className='field'> 
        <label className='label is-size-5 is-radiusless'>Age</label>
        <div className='control'>
          <input className='input is-medium is-radiusless' name='age' type='number' placeholder={user.age} />
        </div>
      </div>

      <p className='control'>
        <button className='button is-danger is-info is-outlined is-size-8 is-radiusless is-fullwidth'>
          Update
        </button>
      </p>
      
      {
        messageError && <div className='message-body'>
          <p>{messageError}</p>
        </div>
      }


    </form>
    </section>
      </section>
    </section>
    </body>
    )

}

export default  withRouter(Profile) 