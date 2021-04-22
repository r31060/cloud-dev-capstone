import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getUploadUrl, patchTodo, uploadFile } from '../api/todos-api'

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile,
}

interface EditTodoProps {
  match: {
    params: {
      todoId: string
    }
  }
  auth: Auth
}

interface EditTodoState {
  rating: string
  credit: string
  file: any
  uploadState: UploadState
}

export class EditTodo extends React.PureComponent<
  EditTodoProps,
  EditTodoState
> {
  state: EditTodoState = {
    rating: '',
    credit: '',
    file: undefined,
    uploadState: UploadState.NoUpload
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }

  handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _rating = event.target.value
    if (!_rating) return

    this.setState({
      rating: _rating
    })
  }

  handleCreditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _credit = event.target.value
    if (!_credit) return

    this.setState({
      rating: _credit
    })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      
      // const newTodo = await patchTodo(this.props.auth.getIdToken(), this.props.match.params.todoId, {
      //   rating: this.state.rating,
      //   credit: this.state.credit

      // })
      

      if(this.state.file)
      {
        this.setUploadState(UploadState.FetchingPresignedUrl)
        const uploadUrl = await getUploadUrl(this.props.auth.getIdToken(), this.props.match.params.todoId)
  
        this.setUploadState(UploadState.UploadingFile)
        await uploadFile(uploadUrl, this.state.file)

        console.log('upload item')
      }     

      alert('Chore was updated!')
    } catch (e) {
      alert('Could not upload a file: ' + e.message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
  }

  // handleSubmit = async (event: React.SyntheticEvent) => {
  //   event.preventDefault()

  //   try {


  //     const newItem = await patchTodo(this.props.auth.getIdToken(), this.props.match.params.todoId, {
  //       rating: this.state.rating
  //       credit: this.state.credit
  //     })

  //     if (!this.state.file) {
  //       alert('File should be selected')
  //       return
  //     }

  //     this.setUploadState(UploadState.FetchingPresignedUrl)
  //     const uploadUrl = await getUploadUrl(this.props.auth.getIdToken(), this.props.match.params.todoId)

  //     this.setUploadState(UploadState.UploadingFile)
  //     await uploadFile(uploadUrl, this.state.file)

  //     alert('File was uploaded!')
  //   } catch (e) {
  //     alert('Could not upload a file: ' + e.message)
  //   } finally {
  //     this.setUploadState(UploadState.NoUpload)
  //   }
  // }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }


  render() {
    return (
      <div>
        <h1>Update Chore</h1>

        <Form onSubmit={this.handleSubmit}>
        <Form.Field>
            <label>Rating</label>
            <input
              type="text"
              placeholder="Enter Rating..."
              onChange={this.handleRatingChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Credit</label>
            <input
              type="text"
              placeholder="Enter Credit..."
              onChange={this.handleCreditChange}
            />
          </Form.Field>
          <Form.Field>
            <label>File</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={this.handleFileChange}
            />
          </Form.Field>

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  // render() {
  //   return (
  //     <div>
  //       <h1>Upload new image</h1>

  //       <Form onSubmit={this.handleSubmit}>
  //         <Form.Field>
  //           <label>File</label>
  //           <input
  //             type="file"
  //             accept="image/*"
  //             placeholder="Image to upload"
  //             onChange={this.handleFileChange}
  //           />
  //         </Form.Field>

  //         {this.renderButton()}
  //       </Form>
  //     </div>
  //   )
  // }

  renderButton() {

    return (
      <div>
        {this.state.uploadState === UploadState.FetchingPresignedUrl && <p>Uploading image metadata</p>}
        {this.state.uploadState === UploadState.UploadingFile && <p>Uploading file</p>}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Update
        </Button>
      </div>
    )
  }
}
