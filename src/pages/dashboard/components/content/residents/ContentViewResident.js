import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { retrieveSingleResident } from "../../../../../store/residentReducer"

const ContentViewResident = () => {
  const { currentResidentId, currentResidentName } = useSelector(({ residentReducer: { currentResidentId, currentResidentName } }) => {
    return { currentResidentId, currentResidentName }
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(retrieveSingleResident(currentResidentId))
  }, [])

  console.log('el residente', currentResidentName)
  return <p>Ver residente</p>
}

export default ContentViewResident