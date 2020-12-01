import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import WriteMessagessButton from './WriteMessagesButton'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { MessageContainerMenu } from './CentralMessagesList'

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
  const [addData, setVal] = useState('')
  const [data, setData] = useState({
    from: '',
    to: '',
    subject: '',
    body: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
    console.log(data)
  }

  const handleChange = (event, editor) => {
    const CKEdata = editor.getData()

    setVal(CKEdata)
    setData({
      ...data,
      body: addData,
    })
    console.log({ event, editor, addData })

    console.log(data)
  }

  const createTicket = (e) => {
    e.preventDefault()
    console.log(data)
    console.log(addData)
    axios
      .post('http://localhost:8000/ticket/', {})
      .then(({ ticketRead }) => {
        this.getTickets()
      })
      .catch((err) => {})
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
          data={addData}
          // checked={}
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
          data={addData}
          // checked={}
        />
      </p>
      <p>
        Asunto
        <Input
          id='subject'
          name='subject'
          type='text'
          onChange={handleInputChange}
          // checked={}
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
