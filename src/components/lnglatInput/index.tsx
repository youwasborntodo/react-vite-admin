import { useState, useEffect } from "react"
import { Input } from "antd"

interface TypeModel {
    form: any
  }
function LnglatInput (props: TypeModel) {
    const lnglatForm = props.form.getFieldValue('lnglat')
    const initialForm = {
      lng: lnglatForm[0],
      lngStatus: false,
      lat: lnglatForm[1],
      latStatus: false,
    }
    const [lnglat, setLnglat] = useState(initialForm)
    const lnglatChange = ( e:any) => {
      const newLngLat = Object.assign({}, lnglat)
      if (e.target.name === 'lng') {
        newLngLat.lng = e.target.value
      }
      if (e.target.name === 'lat') {
        newLngLat.lat = e.target.value
      }
      const lngLatArr =  [newLngLat.lng, newLngLat.lat]
      props.form.setFieldValue('lnglat', lngLatArr)
      setLnglat(newLngLat)
    }

    const lnglatBlur = ( e:any) => {
      const newLngLat = Object.assign({}, lnglat)
      if (e.target.name === 'lng') {
        newLngLat.lng = e.target.value
        if (e.target.value.length <= 0) {
          newLngLat.lngStatus = true
        } else {
          newLngLat.lngStatus = false
        }
      }
      if (e.target.name === 'lat') {
        newLngLat.lat = e.target.value
        if (e.target.value.length <= 0) {
          newLngLat.latStatus = true
        } else {
          newLngLat.latStatus = false
        }
      }
      const lngLatArr =  [newLngLat.lng, newLngLat.lat]
      props.form.setFieldValue('lnglat', lngLatArr)
      setLnglat(newLngLat)
    }
    return (
        <div style={{display:'flex'}}>
            <span style={{display: 'inline-block', margin: '5px 10px'}}>LngLat:</span>
            <Input placeholder="lng" value={lnglat.lng} name='lng' status={lnglat.lngStatus ? 'error' : ''} onBlur={lnglatBlur} onChange={lnglatChange} type='number'/>

            <Input placeholder="lat" value={lnglat.lat} name='lat' status={lnglat.latStatus ? 'error' : ''}  onBlur={lnglatBlur} onChange={lnglatChange} type='number'/>
        </div>

    )
  }

export default LnglatInput