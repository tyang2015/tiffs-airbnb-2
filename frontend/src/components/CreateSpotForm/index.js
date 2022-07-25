import {useEffect, useState} from 'react'
import {useHistory, useSelector} from 'react-redux'
import { createSpot } from '../../store/spot'

const CreateSpotForm = () => {
    return (
        <form onSubmit={handleSubmit} >
        <h2>Create a Spot Form </h2>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label>
          Author
          <textarea
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </label>
        <input type="submit" value={formType} />
      </form>
    )
}
