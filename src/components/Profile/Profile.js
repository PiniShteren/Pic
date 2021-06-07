import React, {useState} from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

export default function Profile(props) {
      const [display, setDisplay] = useState(false)
      const [imageFlaf, setImageFlag] = useState(false);
      const [image, setImage] = useState();
      const [imageToShow, setImageToShow] = useState();
      const imageOnChange = (e) => {
            if(e.target.files[0]) {
            setImage(e.target.files[0]);
            setDisplay(true);
            }
      }

      const imageOnClick = () => {
            setDisplay(false);
            var dt = new FormData();
            dt.append('image', image, image.name);
            axios.post('http://localhost:3001/imageBack', dt ,{
                  onUploadProgress: progressEvent => {
                       console.log('Uploade Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%'); 
                  }
            })
            .then(res =>
                  console.log(res));

      }
      const logOutClick = () => {
            props.login(false);
            Cookie.set('flag', false);
            props.pushHistory('/');
            window.location.reload();
      }
      return (
            <div className="profile">
                  <h1>Profile</h1>
                  <div className="background-image-upload">
                        <label htmlFor="input-image-back" id="label-back">Add Image</label>
                        <input id="input-image-back" type="file" accept="image/*" onChange={imageOnChange}/>
                        <button id="button-image-back" style={{display:display ? '' : 'none'}} onClick={imageOnClick}>{imageFlaf ? "Change" : "Up"}</button>
                  </div>
                  <div className="options">
                        <button onClick={logOutClick}>log out</button>
                  </div>
            </div>
      )
}
