import React, {useEffect, useContext} from 'react'
import h337 from 'heatmapjs'
import styles from './HeatMap.module.css'
import axios from '../../utils/axios'
import AuthContext from '../../context/AuthContext'


export default function HeatMapPage() {
  const { BASE_URL } = useContext(AuthContext)

  useEffect(() => {
    HeatMapHandler();
  });
  
  const HeatMapHandler = async (e) => {
    var heatmapInstance = h337.create({
        container: document.getElementById("heatmap-canvas"),
    });
    
    // await axios.get(BASE_URL + `usergame/heatmapPoints/11`)
    await axios.get(`http://localhost:8081/api/v1/usergame/heatmapPoints/11/3`)
    .then(res => {     
      if (res.status === 200) {
        let points = []
        let max = 40;
        let heatmapData = res.data['points']
        let dataLen = heatmapData.length;
        let idx = 0;
        
        while (idx++ < dataLen-1) {
            var val = 1;
            // max = Math.max(max, val);
            var point = {
                x: Math.floor(heatmapData[idx][0]),
                y: Math.floor(heatmapData[idx][1]),
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
      alert(err.data);
    })
  }

  return (
    <div>
      <section>
      <div>

      </div>
      <div id="heatmap-canvas" className={styles.heatmap_canvas}>
      </div>
      </section>
    </div>
  )
}

