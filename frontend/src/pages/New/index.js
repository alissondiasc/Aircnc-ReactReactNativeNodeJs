import React,{useState, useMemo} from 'react';
import camera from '../../assets/camera.svg'
import './styles.css'
import api from '../../services/api'
export default function New({history}) { 
  const [thumbnail, setThumbnail] = useState(null)
  const [company, setCompany] = useState('')
  const [techs, setTechs] = useState('')
  const [price, setPrice] = useState('')
  
  const preview = useMemo(() => {
    return thumbnail? URL.createObjectURL(thumbnail): null
  },[thumbnail])
  async function handleSubmit(event) {
    event.preventDefault();
    const user_id = localStorage.getItem('id_user');
    const data = new FormData();
    data.append('thumbnail', thumbnail)
    data.append('company', company)
    data.append('techs', techs)
    data.append('price', price)
    api.post('/spots', data, {
       headers: {user_id}
     })
    history.push('/dashboard')
  }
  return (
    <form onSubmit={handleSubmit}>

      <label id="tmb"  className={thumbnail?'has-thumbnail':''} style={{backgroundImage: `url(${preview})`}}>
        <input type="file" onChange={event =>setThumbnail(event.target.files[0])} />
        <img src={camera} alt="camera-svg"/>
      </label>
      <label htmlFor="company">Empresa*</label>
      <input
        id='campany'
        placeholder="Sua empresa incrivel"
        type="text"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="techs">Tecnologias* <span>separadas por virgulas</span></label>
      <input
        id='techs'
        placeholder="Quais tecnologias usam?"
        type="text"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />
      <label htmlFor="price">Valor da diária* <span>(em brnaco para GRATUITO)</span></label>
      <input
        id='price'
        placeholder="Valor cobrado por dia?"
        type="text"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button className="btn">Cadastrar</button>
    </form>
  )
}