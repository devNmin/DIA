import React, {useEffect, useContext} from 'react'
import h337 from 'heatmapjs'
import styles from './HeatMap.module.css'
import axios from '../../utils/axios'
import AuthContext from '../../context/AuthContext'


export default function HeatMapPage({data}) {
  const { BASE_URL } = useContext(AuthContext)

  useEffect(() => {
    // console.log("data", data)
    HeatMapHandler();
  });
    
  
  const HeatMapHandler = async (e) => {
    var heatmapInstance = h337.create({
        container: document.getElementById("heatmap-canvas"),
    });
    
    await axios.get(BASE_URL + `usergame/heatmapPoints/${data}`)
    // await axios.get(`http://localhost:8081/api/v1/usergame/heatmapPoints/11/2`)
    .then(res => {     
      if (res.status === 200) {
        let points = []
        let max = 70;
        let heatmapData = res.data['points']
        let dataLen = heatmapData.length;
        let idx = 0;
        
        while (idx++ < dataLen-1) {
            var val = 1;
            // max = Math.max(max, val);
            var point = {
                x: Math.floor(heatmapData[idx][0]  * 0.5),
                y: Math.floor(heatmapData[idx][1]  * 0.5),
                value: val
            };
            points.push(point);
        }
        
        var data = { 
            max: max, 
            data: points 
        };
        heatmapInstance.setData(data);
      }else{
        console.log('조졌다.')
      }           
    }).catch(err => {
      console.log("heatmap err", err)
    })
  }

  return (
    <>
      <div id="heatmap-canvas" className={styles.heatmap_canvas}>
      </div>
    </>
  )
}

