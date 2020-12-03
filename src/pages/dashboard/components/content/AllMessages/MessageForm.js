import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import WriteMessagessButton from './WriteMessagesButton'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { MessageContainerMenu } from './CentralMessagesList'
import messageFormReducer, {
  CREATE_MESSAGE,
} from '../../../../../store/messageFormReducer'

const BigCentarlMessagesContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .ck-content {
    height: 300px;
  }
`

const Input = styled.input`
  background-color: none;
  border: none;
  border-bottom: 1px solud rgba(96, 125, 139, 1);
  width: 100%;
`

const MessageForm = (props) => {
  const state = useSelector((state) => state.messageFormReducer)
  console.log('ESTE ES EL ESTADO EN MESAGEFORM', state)
  const dispatch = useDispatch()
  const [addData, setVal] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    dispatch({ type: CREATE_MESSAGE, payload: { name, value } })
  }

  const handleChange = (event, editor) => {
    const CKEdata = editor.getData()
    const name = 'body'
    setVal(addData)
    const value = CKEdata
    dispatch({ type: CREATE_MESSAGE, payload: { name, value } })
  }

  const createTicket = (e) => {
    e.preventDefault()
  }
  return (
    <BigCentarlMessagesContainer onSubmit={createTicket}>
      <MessageContainerMenu>
        <WriteMessagessButton
          type='submit'
          className='toRight'
          value='enviar'
        />
      </MessageContainerMenu>
      <p>
        Para
        <Input
          id='from'
          name='from'
          type='email'
          required={true}
          onChange={handleInputChange}
        />
      </p>
      <p>
        De
        <Input
          id='to'
          name='to'
          type='email'
          required={true}
          onChange={handleInputChange}
        />
      </p>
      <p>
        Asunto
        <Input
          id='subject'
          name='subject'
          type='text'
          onChange={handleInputChange}
        />
      </p>
      <br></br>
      <CKEditor
        style={{ height: '300px', rows: '10' }}
        editor={ClassicEditor}
        data={addData}
        name='body'
        onChange={handleChange}
      />
    </BigCentarlMessagesContainer>
  )
}

export default MessageForm
