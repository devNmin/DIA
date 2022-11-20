import React, {useEffect, useContext, useState, useRef} from 'react'
import h337 from 'heatmapjs'
import styles from './HeatMap.module.css'
import axios from '../../utils/axios'
import AuthContext from '../../context/AuthContext'
import HeatMapModal from './HeatMapModal'
import { Link } from 'react-router-dom'


export default function HeatMapPage({data}) {
  const { BASE_URL } = useContext(AuthContext)  
  const [modalOpen, setModalOpen] = useState(false);
  const coord = useRef();

  const widthRatio = (window.innerWidth * 0.95)/1180 ;
  const heightRatio = (window.innerWidth * 0.95 * 0.7)/820;

  const showModal = () => {
    setModalOpen(true);
  };
  
  useEffect(() => {
    // console.log("data", data)
    HeatMapHandler();
  },[]);
    
  const HeatMapHandler = async (e) => {
    var heatmapInstance = h337.create({
        container: document.getElementById("heatmap-canvas"),
    });
    
    await axios.get(BASE_URL + `usergame/heatmapPoints/${data}`)
    // await axios.get(`http://k7b307.p.ssafy.io:8081/api/v1/usergame/heatmapPoints/${data}`)
    .then(res => {     
      if (res.status === 200) {
        let points = []
        let max =230;
        let heatmapData = res.data['points']
        let dataLen = heatmapData.length;
        let idx = 0;
        console.log("heatmapData", heatmapData)
        while (idx++ < dataLen-1) {
            var val = 1;
            max = Math.max(max, val);
            var point = {
                x: Math.floor(heatmapData[idx][0] * widthRatio),
                y: Math.floor(heatmapData[idx][1] * heightRatio),
                value: val
            };
            points.push(point);
        }
        coord.current = heatmapData
        var data = { 
            max: max, 
            data: points 
        };
        heatmapInstance.setData(data);
        console.log("coord", coord)
      }else{
      }           
    }).catch(err => {
      console.log("heatmap err", err)
    })
  }

  return (
    <>
      <div id="heatmap-canvas" className={styles.heatmap_canvas} onClick={showModal}>
      </div>
      {modalOpen && <HeatMapModal setModalOpen={setModalOpen} coord={coord.current} offset={window.innerWidth * 0.95}/>}
    </>
  )
}

